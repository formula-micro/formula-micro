<script setup lang="ts">
    import type { Card_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Card_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, background_color, background_color_active, image, show_large_image, title, description, text_alignment, type, link, page } = toRefs(props.data);
</script>

<template>
    <NuxtLink :to="type === 'link' ? link : page?.slug" v-if="__typename === 'card_blocks'" :class="[ background_color?.class, `hover:${background_color_active?.class} focus:${background_color_active?.class}`, 'group relative select-none outline-none flex gap-6 rounded-lg p-3 text-sm leading-6 sm:flex-col sm:p-6' ]">
        <div v-if="image && !show_large_image" class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-white group-hover:bg-white p-2">
            <NuxtImg :src="`https://cms.formula.nu/assets/${image.id}`" :width="image?.width ?? 48" :height="image?.height ?? 48" aria-hidden="true" role="presentation" sizes="sm:100px" class="rounded-xl w-full" />
        </div>
        <div v-if="image && show_large_image">
            <NuxtImg :src="`https://cms.formula.nu/assets/${image.id}`" :width="image?.width ?? 48" :height="image?.height ?? 48" aria-hidden="true" role="presentation" sizes="sm:360px" class="w-full max-h-64 object-contain rounded-xl w-full" />
        </div>
        <div :class="[ text_alignment, 'prose' ]">
            <p class="!no-underline font-semibold text-gray-900">
                {{ title }}
                <span class="absolute inset-0" />
            </p>
            <div class="mt-1 text-gray-600" v-html="description" v-if="description && description.length > 0" />
        </div>
    </NuxtLink>
</template>