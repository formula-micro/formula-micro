<script setup lang="ts">
    import type { Richtext_Blocks } from "@/graphql/generated/graphql";
    import { useHeadingClass } from "@/helpers/useHeadingClass";

    // Properties.
    interface Properties
    {
        data: Richtext_Blocks;
    }
    defineProps<Properties>();

    // Fields.
    const { headingClass } = useHeadingClass();
</script>

<template>
    <div :class="[ data.has_vertical_padding ? 'py-4' : '', data.has_horizontal_padding ? 'px-6 xl:px-12' : '', 'flex justify-center items-center w-full' ]">
        <div :class="[ data.width?.class, data.show_title && (data.title_placement === 'left' || data.title_placement === 'right') ? 'grid grid-cols-1 xl:grid-cols-[3fr,0.5fr,5fr] gap-x-8' : '', data.title_placement === 'right' ? 'order-3' : '', data.has_vertical_padding ? 'py-8 xl:py-16' : '', 'w-full prose' ]">
            <h2 v-if="data.show_title" :class="[ headingClass, data.title_placement === 'left' || data.title_placement === 'right' ? 'xl:!mb-0' : '' ]">{{ data.title }}</h2>

            <div v-if="data.show_title && (data.title_placement === 'left' || data.title_placement === 'right')" />

            <div :class="[ data.title_placement === 'top' ? 'mt-5' : '', data.title_placement === 'right' ? '-order-3' : '', 'prose  prose-blue min-w-full' ]">
                <EditorjsEditorJS :blocks="data.editorjs_content?.blocks" />
            </div>
        </div>
    </div>
</template>