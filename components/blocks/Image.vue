<script setup lang="ts">
    import type { Image_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Image_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, image_position, image_fit, image_size, image } = toRefs(props.data);
</script>

<template>
    <NuxtImg v-if="__typename === 'image_blocks'" :src="`https://cms.formula.nu/assets/${image?.id}`" :width="image?.width" :height="image?.height" aria-hidden="true" role="presentation" sizes="sm:512px md:1024px" :class="[ image_position, image_fit, image_size, 'rounded-xl w-full' ]" />
</template>