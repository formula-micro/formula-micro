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
    // Error handling for missing image ID.
    const isImageAvailable = computed(() => props.data.image?.id !== null && props.data.image?.id !== undefined);
    const { headingClass } = useHeadingClass();
</script>

<template>
    <div :class="[ data.has_vertical_padding ? 'py-4' : '', data.has_horizontal_padding ? 'px-6 xl:px-12' : '', 'flex justify-center items-center w-full' ]">
        <div :class="[ data.width?.class, data.image_placement === 'right' ? 'xl:grid-cols-[3fr,0.5fr,3fr]' : 'xl:grid-cols-[3fr,0.5fr,3fr]', data.has_vertical_padding ? 'py-8 xl:py-16' : '', 'grid w-full grid-cols-1 gap-x-8 gap-y-6 lg:gap-y-0 items-center' ]">
            <div :class="[ data.image_placement === 'right' ? '' : 'xl:order-3', 'prose' ]">
                <h2 :class="headingClass">{{ data.title }}</h2>
                <EditorjsEditorJS :blocks="data.editorjs_content?.blocks" />
            </div>

            <div/>

            <div :class="[ data.image_placement === 'right' ? '' : 'xl:-order-3' ]">
                <NuxtImg v-if="isImageAvailable" :src="`https://cms.formula.nu/assets/${data.image.id}`" :width="738" :height="492" aria-hidden="true" role="presentation" sizes="sm:512px md:1024px" quality="80" format="webp" :class="[ data.image_position, data.image_fit, data.image_size, 'rounded-xl w-full' ]" />
                <p v-else class="text-gray-500">Billedet er ikke tilgængeligt.</p>
            </div>
        </div>
    </div>
</template>

//TODO: fejlhåndtering ved null id på img data