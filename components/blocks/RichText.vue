<script setup lang="ts">
    import type { Richtext_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Richtext_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, has_padding, title, show_title, title_placement, editor_js_content } = toRefs(props.data);
</script>

<template>
    <div v-if="__typename === 'richtext_blocks'" class="w-full">
        <div :class="[ has_padding ? 'py-4' : '', 'flex justify-center items-center w-full xl:px-12' ]">
            <div :class="[ width?.class, show_title && (title_placement === 'left' || title_placement === 'right') ? 'grid grid-cols-1 xl:grid-cols-[3fr,0.5fr,5fr] gap-x-8' : '', title_placement === 'right' ? 'order-3' : '', has_padding ? 'py-8 xl:py-16' : '', 'w-full prose px-6' ]">
                <h2 v-if="show_title" :class="[ title_placement === 'left' || title_placement === 'right' ? 'xl:!mb-0' : '', 'leading-relaxed' ]">{{ title }}</h2>

                <div v-if="show_title && (title_placement === 'left' || title_placement === 'right')" />

                <div :class="[ title_placement === 'top' ? 'mt-5' : '', title_placement === 'right' ? '-order-3' : '', 'prose  prose-blue min-w-full' ]">
                    <EditorjsEditorJS :blocks="editor_js_content?.blocks" />
                </div>
            </div>
        </div>
    </div>
</template>