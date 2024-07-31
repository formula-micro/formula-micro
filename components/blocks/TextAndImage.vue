<script setup lang="ts">
    import type { Text_And_Image_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Text_And_Image_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, has_padding, title, editor_js_content, image_placement, image_position, image_fit, image_size, image } = toRefs(props.data);
</script>

<template>
    <div v-if="__typename === 'text_and_image_blocks'" class="w-full px-6 xl:px-12">
        <div :class="[ has_padding ? 'py-4' : '', 'flex justify-center items-center w-full' ]">
            <div :class="[ width?.class, image_placement === 'right' ? 'xl:grid-cols-[3fr,0.5fr,3fr]' : 'xl:grid-cols-[3fr,0.5fr,3fr]', has_padding ? 'py-8 xl:py-16' : '', 'grid w-full grid-cols-1 gap-x-8 gap-y-6 lg:gap-y-0 items-center' ]">
                <div :class="[ image_placement === 'right' ? '' : 'xl:order-3', 'prose prose-blue' ]">
                    <h2 class="leading-relaxed">{{ title }}</h2>
                    <EditorjsEditorJS :blocks="editor_js_content?.blocks" />
                    <!-- <button type="button" class="mt-8 border-2 border-blue-900 hover:bg-blue-900 rounded-full text-sm text-gray-900 hover:text-white font-medium px-8 py-3 transition transform duration-150">Tag en snak med os</button> -->
                </div>

                <div/>

                <div :class="[ image_placement === 'right' ? '' : 'xl:-order-3' ]">
                    <NuxtImg :src="`https://cms.formula.nu/assets/${image.id}`" :width="image?.width" :height="image?.height" aria-hidden="true" role="presentation" sizes="sm:512px md:1024px" :class="[ image_position, image_fit, image_size, 'rounded-xl w-full' ]" />
                </div>
            </div>
        </div>
    </div>
</template>