<script setup lang="ts">
import { ref, computed, toRefs } from 'vue';
import type { News_Blocks, News_Posts } from "@/graphql/generated/graphql";
import { useNewsPostsByTagsQuery } from "@/graphql/generated/graphql";

// Properties.
interface Properties {
    data: News_Blocks;
}
const props = defineProps<Properties>();

// Reactive fields.
const { __typename, tags } = toRefs(props.data);
const tagIds = computed(() => props.data.tags?.map(tag => tag.tags_id.id) ?? []);



// GraphQL query
const { data, error } = useNewsPostsByTagsQuery({ variables: { tags: tagIds.value, sort: [ "-date_published" ], limit: 3} });

if (error.value) {
    console.error(error.value);
}


//const newsPosts = computed(() => data.value?.news_posts);

// const newsPosts = computed(() => {
//     return data.value?.news_posts.slice().sort((a, b) => {
//         return new Date(b.date_published).getTime() - new Date(a.date_published).getTime();
//     });
// });

const newsPosts = computed(() => {
    return data.value?.news_posts;
});

console.log(newsPosts.value);
</script>

<template>
    <div v-if="__typename === 'news_blocks'" class="max-w-9xl mx-auto px-6 xl:px-12">
        <h2 class="text-3xl xl:text-5xl xl:font-normal pb-6">Nyheder</h2>
        <div class="flex flex-wrap justify-center w-full">
            <div v-for="post in newsPosts" :key="post.id" class="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
                <NuxtLink :to="`/nyheder/${post.slug}`" class="block">
                    <div class="aspect-w-16 aspect-h-9 overflow-hidden">
                        <NuxtImg :src="`https://cms.formula.nu/assets/${post.cover_image.id}`" class="w-full h-full object-cover rounded" />
                    </div>
                    <h3 class="text-xl font-semibold mt-4 mb-2">{{ post.title }}</h3>
                    <p class="text-sm text-gray-500 mb-2">{{ new Date(post.date_published).toLocaleDateString() }}</p>
                    <p v-html="post.summary"></p>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
