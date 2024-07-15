<script setup lang="ts">
    import type { Columns_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Columns_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, vertical_alignment, extended_control, custom_css, blocks: blocksData } = toRefs(props.data);
    const blocks = computed(() => blocksData?.value?.map(block => block?.item));
</script>

<template>
    <div v-if="__typename === 'columns_blocks'" class="w-full px-6 xl:px-12">
        <div class="flex justify-center items-center w-full">
            <div :class="[ width?.class, vertical_alignment, extended_control ? 'grid-cols-1 ' + custom_css : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', 'grid gap-4 lg:gap-6 xl:gap-8 w-full' ]">
                <template v-for="block in blocks">
                    <BlocksGallery :data="block" />

                    <BlocksServicesList :data="block" />

                    <BlocksRichText :data="block" />

                    <BlocksDisclosure :data="block" />

                    <BlocksCard :data="block" />

                    <BlocksImage :data="block" />
                </template>
            </div>
        </div>
    </div>
</template>