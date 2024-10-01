<script setup lang="ts">
    import type { Text_And_Image_Blocks } from "@/graphql/generated/graphql";
    import { useHeadingClass } from "@/helpers/useHeadingClass";

    // Properties.
    interface Properties
    {
        data: Text_And_Image_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, has_vertical_padding, has_horizontal_padding, title, editor_js_content, image_placement, image_position, image_fit, image_size, image } = toRefs(props.data);

    // Error handling for missing image ID.
    const isImageAvailable = computed(() => image?.value?.id !== null && image?.value?.id !== undefined);
    const { headingClass } = useHeadingClass();
</script>

<template>
    <div :class="[ has_vertical_padding ? 'py-4' : '', has_horizontal_padding ? 'px-6 xl:px-12' : '', 'flex justify-center items-center w-full' ]">
        <div :class="[ width?.class, image_placement === 'right' ? 'xl:grid-cols-[3fr,0.5fr,3fr]' : 'xl:grid-cols-[3fr,0.5fr,3fr]', has_vertical_padding ? 'py-8 xl:py-16' : '', 'grid w-full grid-cols-1 gap-x-8 gap-y-6 lg:gap-y-0 items-center' ]">
            <div :class="[ image_placement === 'right' ? '' : 'xl:order-3', 'prose' ]">
                <h2 :class="headingClass">{{ title }}</h2>
                <EditorjsEditorJS :blocks="editor_js_content?.blocks" />
            </div>

            <div/>

            <div :class="[ image_placement === 'right' ? '' : 'xl:-order-3' ]">
                <NuxtImg v-if="isImageAvailable" :src="`https://cms.formula.nu/assets/${image.id}`" :width="738" :height="492" aria-hidden="true" role="presentation" sizes="sm:512px md:1024px" quality="80" format="webp" :class="[ image_position, image_fit, image_size, 'rounded-xl w-full' ]" />
                <p v-else class="text-gray-500">Billedet er ikke tilgængeligt.</p>
            </div>
        </div>
    </div>
</template>

//TODO: fejlhåndtering ved null id på img data