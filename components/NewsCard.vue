<script setup lang="ts">
    import type { News_Posts } from "@/graphql/generated/graphql";
    import { getDate, getTime } from "@/helpers";

    // Properties.
    interface Properties
    {
        data: News_Posts;
        orientation?: "vertical" | "horizontal";
    }
    const props = defineProps<Properties>();

    // Fields.
    const { slug, title, summary, date_published, cover_image, tags } = toRefs(props.data);
</script>

<template>
    <NuxtLink :to="`/nyheder/${slug}`" :class="[ orientation === 'horizontal' ? 'flex space-x-5' : 'block', 'transition transform duration-150 hover:scale-102 focus:scale-102 focus:outline-none group' ]">
        <!-- Image -->
        <div :class="[ orientation === 'horizontal' ? 'w-full min-w-xs max-w-xs lg:max-w-sm 2xl:max-w-md h-auto' : '' ]">
            <div class="relative aspect-w-16 aspect-h-9 overflow-hidden">
                <NuxtImg :src="cover_image?.id ? `https://cms.formula.nu/assets/${cover_image.id}` : '/images/nyheder.jpg'" alt="" role="presentation" format="webp" sizes="sm:640px md:1024px" :width="cover_image?.width ?? 1280" :height="cover_image?.height ?? 826" loading="lazy" class="w-full h-full object-cover rounded-xl" />
                <div class="absolute inset-0 bg-black rounded-xl bg-opacity-0 group-hover:bg-opacity-20 group-focus:bg-opacity-20 transition duration-500"></div>
            </div>
        </div>

        <!-- Information -->
        <div>
            <!-- Title, Date, & Summary -->
            <div>
                <p class="mt-4 text-xl font-semibold">{{ title }}</p>
                <p class="mt-2 font-medium text-gray-600 capitalize">{{ getDate(date_published) }} &middot; {{ getTime(date_published) }}</p>
                <p class="mt-2 line-clamp-3 prose" v-html="summary"></p>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-6 self-end">
                <span v-for="tag in tags" :key="tag?.tags_id?.id" class="inline-block rounded-full border border-gray-400 font-semibold px-3 py-1">
                    {{ tag?.tags_id?.name }}
                </span>
            </div>
        </div>
    </NuxtLink>
</template>