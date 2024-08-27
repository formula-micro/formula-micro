<script setup lang="ts">
    import { ref, computed, toRefs } from 'vue';
    import type { News_Blocks, News_Posts } from "@/graphql/generated/graphql";
    import { useNewsPostsQuery } from "@/graphql/generated/graphql";
    import { getDate, getTime, useHeadingClass } from "@/helpers";

    // Properties.
    interface Properties
    {
        data: News_Blocks;
        excludePostId?: string;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, tags, width, has_horizontal_padding, has_vertical_padding } = toRefs(props.data);
    const tagIds = computed(() =>
    {
        if (!tags || !tags.value) return [] as string[];
        return tags.value.filter(tag => tag !== undefined && tag !== null && tag.tags_id !== undefined && tag.tags_id !== null).map(tag => tag!.tags_id!.id);
    });
    
    const { data, error } = useNewsPostsQuery(
    {
        variables:
        {
            filter:
            {
                status: { _eq: "published" },
                tags: { tags_id: { id: { _in: tagIds.value  } } },
                id: props.excludePostId !== undefined ? { _neq: props.excludePostId } : undefined,
            },
            sort: ["-date_published"],
            limit: 3
        }
    });
    const newsPosts = computed(() => data.value?.news_posts as News_Posts[] ?? [] as News_Posts[]);

    const errorMessage = ref<string|null>(null);
    watch(error, (value) => errorMessage.value = 'Der opstod en fejl under indlæsningen af nyhederne.');

    const { headingClass } = useHeadingClass();
</script>

<template>
    <div :class="[ has_vertical_padding ? 'py-4' : '', has_horizontal_padding ? 'px-6 xl:px-12' : '', 'flex justify-center items-center w-full' ]">
        <div :class="[ width?.class, has_vertical_padding ? 'py-8 xl:py-16' : '', 'flex flex-col w-full max-w-7xl xl:max-w-8xl 4xl:max-w-10xl' ]">
            <div v-if="!excludePostId">
                <h2 :class="headingClass">Nyheder</h2>

                <NuxtLink to="/nyheder" class="ml-2 text-xl focus:underline hover:underline focus:outline-none">
                    Se alle nyheder
                </NuxtLink>
            </div>
            
            <div :class="[ !excludePostId ? 'mt-12' : 'mt-4' ]">
                <!-- Error message -->
                <div v-if="errorMessage" class="w-full h-full bg-gray-50 rounded-xl text-center text-gray-600 py-8">
                    <p>{{ errorMessage }}</p>
                </div>

                <!-- News posts -->
                <div v-if="!errorMessage" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 xl:gap-y-0 md:gap-x-8 pb-16">
                    <div v-for="post in newsPosts" :key="post.id" class="w-full">
                        <NewsCard :data="post" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>