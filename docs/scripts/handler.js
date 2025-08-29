import { Project, SyntaxKind } from 'ts-morph'
import path from 'path'

const project = new Project({
    tsConfigFilePath: 'tsconfig.json'
})
project.addSourceFilesAtPaths('src/**/*')
project.addSourceFilesAtPaths('../vue-leaflet/src/**/*')

export default function propOriginHandler(documentation, _componentDefinition, _astPath, options) {
    const filePath = options.filePath || ''
    const fileName = path.basename(filePath, '.vue')

    const componentBase = fileName.replace(/^L/, '')
    const interfaceName = `${componentBase}Props`.replace('Json', 'JSON')

    const interfaceDeclaration = project
        .getSourceFiles()
        .flatMap((sf) => sf.getInterfaces())
        .find((i) => i.getName() === interfaceName)
    if (!interfaceDeclaration) {
        console.warn(`[propOriginHandler] Interface "${interfaceName}" not found in ${filePath}`)
        return
    }

    const result = new Map()
    collectProps(interfaceDeclaration, result)

    const doc = documentation.toObject()
    if (!doc.props) {
        console.warn(`[propOriginHandler] props is ${doc.props}`)
        return
    }
    for (const prop of doc.props) {
        prop['interface'] = result.get(prop.name).interface
        const typeInfo = prop.type

        if (typeInfo?.name === 'union' && Array.isArray(typeInfo.elements)) {
            prop.type.name = typeInfo.elements.map((el) => el.name).join(' \\| ')
        }
    }
    result.forEach((value, key) => {
        if (doc.props.some((prop) => prop.name === key)) return
        documentation.propsMap.set(key, { ...value })
    })
}

function collectProps(interfaceDecl, resultMap, level = 0) {
    const name = interfaceDecl.getName()

    // Own properties
    for (const prop of interfaceDecl.getProperties()) {
        const propName = prop.getName()
        if (!resultMap.has(propName)) {
            const jsDocs = prop.getJsDocs()
            const description = jsDocs.map((doc) => doc.getDescription().trim()).join('\n')
            const isOptional = prop.hasQuestionToken()
            let typeText = prop.getType()
            const tags = jsDocs
                .flatMap((doc) => doc.getTags())
                .reduce((acc, tag) => {
                    const title = tag.getTagName()
                    const description = tag.getComment() || true
                    if (!acc[title]) {
                        acc[title] = []
                    }
                    acc[title].push({ description, title })
                    return acc
                }, {})

            resultMap.set(propName, {
                name: propName,
                required: !isOptional,
                type: typeText.getText().split('.').slice(-1)[0],
                description,
                tags,
                interface: { name, level }
            })
        }
    }

    // Inherited interfaces
    for (const clause of interfaceDecl.getHeritageClauses()) {
        for (const typeNode of clause.getTypeNodes()) {
            const symbol = typeNode.getType().getSymbol()
            if (!symbol) continue

            const decl = symbol
                .getDeclarations()
                .find((d) => d.getKind() === SyntaxKind.InterfaceDeclaration)
            if (decl) {
                collectProps(decl, resultMap, level + 1)
            }
        }
    }
}
