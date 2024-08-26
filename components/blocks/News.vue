<script setup lang="ts">
    import { ref, computed, toRefs } from 'vue';
    import type { News_Blocks, News_Posts } from "@/graphql/generated/graphql";
    import { useNewsPostsQuery } from "@/graphql/generated/graphql";
    import { startCase, toLower } from 'lodash';
    import { useHeadingClass } from "@/components/helpers/useHeadingClass";

    // Properties.
    interface Properties {
        data: News_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, tags, width, has_horizontal_padding, has_vertical_padding } = toRefs(props.data);
    const tagIds = computed(() =>
    {
        if (!tags || !tags.value) return [] as string[];
        return tags.value.filter(tag => tag !== undefined && tag !== null && tag.tags_id !== undefined && tag.tags_id !== null).map(tag => tag!.tags_id!.id);
    });
    
    const { data, error } = useNewsPostsQuery({ variables: { filter: { status: { _eq: "published" }, tags: { tags_id: { id: { _in: tagIds.value  } } } }, sort: ["-date_published"], limit: 3 }} );
    const newsPosts = computed(() => data.value?.news_posts ?? [] as News_Posts[]);

    const errorMessage = ref<string|null>(null);
    watch(error, (value) => errorMessage.value = 'Der opstod en fejl under indlæsningen af nyhederne.');

    // Methods.
    const publishedDate = (published: any) =>
    {
        const dateFormat: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(published);
        
        // TODO: Requires lodash.
        //`${useStartCase(useToLower((date.toLocaleDateString(undefined, dateFormat))))}`;
        //return date.toLocaleDateString(undefined, dateFormat);
        return startCase(toLower(date.toLocaleDateString(undefined, dateFormat)));
    };

    const publishedTime = (published: any) =>
    {
        const timeFormat: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "numeric" };
        const date = new Date(published);
        
        return `${date.toLocaleTimeString(undefined, timeFormat).replace(".", ":")}`;
    };

    const { headingClass } = useHeadingClass();
</script>

<template>
    <div :class="[has_vertical_padding ? 'py-4' : '', has_horizontal_padding ? 'px-6 xl:px-12' : '', 'flex justify-center items-center w-full']"> <!-- TODO: Mangler has_vertical_padding & has_horizontal_padding i CMS og efterfølgende styring her (se f. eks RichText.vue) --> 
        <div :class="[width?.class, has_vertical_padding ? 'py-8 xl:py-16' : '', 'flex flex-col w-full max-w-7xl xl:max-w-8xl 4xl:max-w-10xl']"> <!-- TODO: Mangler width & has_vertical_padding i CMS og efterfølgende styring her (se f. eks RichText.vue ) -->
            <h2 :class="headingClass">Nyheder</h2> <!-- TODO: Mangler styring af header størrelse (se f. eks ServicesList.vue) -->

            <NuxtLink to="/nyheder" class="ml-2 text-xl focus:underline hover:underline focus:outline-none">
                Se alle nyheder
            </NuxtLink>
            
            <div class="mt-12">
                <!-- Error message -->
                <div v-if="errorMessage" class="w-full h-full bg-gray-50 rounded-xl text-center text-gray-600 py-8">
                    <p>{{ errorMessage }}</p>
                </div>

                <!-- News posts -->
                <div v-if="!errorMessage" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 xl:gap-y-0 md:gap-x-8 pb-16">
                    <div v-for="post in newsPosts" :key="post.id" class="w-full">
                        <!-- TODO: Indsæt hover og focus styling -->
                        <NuxtLink :to="`/nyheder/${post.slug}`" class="block transition-transform transform hover:scale-105 focus:scale-105 duration-300">
                            <!-- Image -->
                            <div class="aspect-w-16 aspect-h-9 overflow-hidden">
                                <!-- TODO: Indsæt statisk placeholder billede, når cover billede mangler -->
                                <NuxtImg :src="post.cover_image?.id ? `https://cms.formula.nu/assets/${post.cover_image.id}` : '/images/nyheder.jpg'" class="w-full h-full object-cover rounded-xl" />
                            </div>

                            <!-- Information -->
                            <p class="mt-4 text-xl font-semibold">{{ post.title }}</p>
                            <p class="mt-2 font-medium text-gray-600">{{ publishedDate(post.date_published) }} &middot; {{ publishedTime(post.date_published) }}</p>
                            <p class="mt-2 line-clamp-3 prose" v-html="post.summary"></p>
                        </NuxtLink>

                        <!-- Tags -->
                        <div class="flex flex-wrap gap-2 mt-6">
                            <NuxtLink v-for="tag in post.tags" :key="tag?.tags_id?.id" :to="`/nyheder?tags=${tag?.tags_id?.name}`" class="inline-block rounded-full border border-gray-400 hover:border-transparent hover:text-white hover:bg-black focus:text-white focus:bg-black font-semibold transition duration-150 px-3 py-1">
                                {{ tag?.tags_id?.name }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>