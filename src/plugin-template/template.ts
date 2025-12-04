import { type TemplateOptions, Template } from 'your-leaflet-component'
import {
    SuperClassProps,
    superClassPropsDefaults,
    setupSuperClass,
    SuperClassEmits
} from 'your-super-class'

import type { Ref } from 'vue'
import { propsToLeafletOptions } from '@maxel01/vue-leaflet'

export interface TemplateProps extends SuperClassProps {
    /**
     * New Prop
     * @reactive
     */
    newProp?: number
}

export const templatePropsDefaults = {
    ...superClassPropsDefaults
}

export interface TemplateEmits extends SuperClassEmits {
    /**
     * Triggers when the component is ready
     */
    (event: 'ready', layer: Template): void
}

export const setupTemplate = (
    props: TemplateProps,
    leafletRef: Ref<Template | undefined>,
    emit: TemplateEmits
) => {
    const { options: superClassOptions, methods: superClassMethods } = setupSuperClass(
        props,
        leafletRef,
        emit
    )

    const options = propsToLeafletOptions<TemplateOptions>(props, superClassOptions)

    const methods = {
        ...superClassMethods,
        setNewProp(_min: number) {
            // ...
        }
    }

    return { options, methods }
}
