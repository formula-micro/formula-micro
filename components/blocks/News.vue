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

// Error state.
const errorMessage = ref<string | null>(null);

// GraphQL query
const { data, error } = useNewsPostsByTagsQuery({ variables: { tags: tagIds.value, sort: ["-date_published"], limit: 3 }} );


if (error.value) {
    errorMessage.value = 'Der opstod en fejl under indlæsningen af nyhederne.';
    console.error(error.value);
}

//const newsPosts = computed(() => data.value?.news_posts);

// const newsPosts = computed(() => {
//     return data.value?.news_posts;
// });

const newsPosts = computed(() => {
  return data.value?.news_posts?.filter(post => post.status === "published");
});


console.log(newsPosts.value);
</script>

<template>
    <div v-if="__typename === 'news_blocks'" class="max-w-9xl mx-auto px-6 xl:px-12">
        <h2 class="text-3xl xl:text-5xl xl:font-normal pb-6">Nyheder</h2>
        <NuxtLink to="/nyheder">
            <p class="text-xl mb-6">Se alle nyheder</p>
        </NuxtLink>

        <!-- Error message -->
        <div v-if="errorMessage" class="text-center text-gray-500 py-8">
            <p>{{ errorMessage }}</p>
        </div>

        <!-- News posts -->
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
                <div class="flex flex-wrap gap-2 mt-6">
                    <NuxtLink v-for="tag in post.tags" :key="tag?.tags_id?.id" :to="`/nyheder?tags=${tag?.tags_id?.name}`" class="inline-block rounded-full border border-gray-400 hover:border-transparent hover:text-white hover:bg-black focus:bg-black font-semibold px-3 py-1">
                        {{ tag?.tags_id?.name }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
    
</template>
