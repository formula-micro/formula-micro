<script setup lang="ts">
    import type { Richtext_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Richtext_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, has_vertical_padding, has_horizontal_padding, title, show_title, title_placement, editor_js_content } = toRefs(props.data);
</script>

<template>
    <div :class="[ has_vertical_padding ? 'py-4' : '', has_horizontal_padding ? 'xl:px-12' : '', 'flex justify-center items-center w-full' ]">
        <div :class="[ width?.class, show_title && (title_placement === 'left' || title_placement === 'right') ? 'grid grid-cols-1 xl:grid-cols-[3fr,0.5fr,5fr] gap-x-8' : '', title_placement === 'right' ? 'order-3' : '', has_vertical_padding ? 'py-8 xl:py-16' : '', has_horizontal_padding ? 'px-6 xl:px-0' : '', 'w-full prose' ]">
            <h2 v-if="show_title" :class="[ title_placement === 'left' || title_placement === 'right' ? 'xl:!mb-0' : '' ]">{{ title }}</h2>

            <div v-if="show_title && (title_placement === 'left' || title_placement === 'right')" />

            <div :class="[ title_placement === 'top' ? 'mt-5' : '', title_placement === 'right' ? '-order-3' : '', 'prose  prose-blue min-w-full' ]">
                <EditorjsEditorJS :blocks="editor_js_content?.blocks" />
            </div>
        </div>
    </div>
</template>