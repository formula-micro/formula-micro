<script setup lang="ts">
    import type { Columns_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Columns_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, has_vertical_padding, has_horizontal_padding, vertical_alignment, extended_control, custom_css, blocks: blocksData } = toRefs(props.data);
    const blocks = computed(() => blocksData?.value?.map(block => block?.item));
</script>

<template>
    <div :class="[ has_vertical_padding ? 'py-4' : '', has_horizontal_padding ? 'px-6 xl:px-12' : '', 'flex justify-center items-center w-full' ]">
        <div :class="[ width?.class, vertical_alignment, extended_control ? 'grid-cols-1 ' + custom_css : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', has_vertical_padding ? 'py-8 xl:py-16' : '', 'grid gap-4 lg:gap-6 xl:gap-8 w-full' ]">
            <template v-for="block in blocks">
                <BlocksGallery v-if="block.__typename === 'gallery_blocks'" :data="block" />

                <BlocksServicesList v-if="block.__typename === 'services_list_blocks'" :data="block" />

                <BlocksRichText v-if="block.__typename === 'richtext_blocks'" :data="block" />

                <BlocksDisclosure v-if="block.__typename === 'disclosure_blocks'" :is-child="false" :data="block" />

                <BlocksGoogleMaps v-if="block.__typename === 'google_maps_blocks'" :data="block" />

                <BlocksCard v-if="block.__typename === 'card_blocks'" :data="block" />

                <BlocksImage v-if="block.__typename === 'image_blocks'" :data="block" />
            </template>
        </div>
    </div>
</template>