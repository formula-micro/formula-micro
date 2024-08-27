<script setup lang="ts">
    import type { News_Posts } from "@/graphql/generated/graphql";
    import { useNewsPostsQuery, useTagCountersQuery, useNewsPostsCountQuery } from "@/graphql/generated/graphql";
    import { getDate, getTime, useBreadcrumbs } from "@/helpers";

    // Page meta.
    definePageMeta({
        layout: "news"
    });

    // Fields.
    const route = useRoute();
    const router = useRouter();
    
    // Ensure "tags" is always an array.
    const tags = computed(() =>
    {
        // Handle array query value.
        if (Array.isArray(route.query.tags)) return route.query.tags.map(tag => tag as string);

        // Handle single query value.
        const convertedTags = route.query.tags as string;
        return convertedTags === undefined ? [] : convertedTags.trim().length == 0 ? [] : convertedTags.split(","); 
    });

    // Get the 15 most popular tags.
    const { data: postsTagData } = useTagCountersQuery({ variables: { filter: { collection: { _eq: "news_posts" } }, sort: [ "-count" ], limit: 15 } });
    const topPostsTags = computed(() => 
        postsTagData.value?.tags_counters
            .filter(tagCounter => tagCounter.tag?.name) 
            .map(tagCounter =>
            ({
                id: tagCounter.tag?.id, 
                name: tagCounter.tag?.name as string, 
                active: tags.value.includes(tagCounter.tag?.name as string)
            })) ?? []
    );

    // Pagination
    const { data: totalPostsData } = useNewsPostsCountQuery({variables: { filter: { status: { _eq: "published" } } }});
    const totalPosts = computed(() => totalPostsData.value?.news_posts_aggregated[0].count?.count ?? 0);
    const pageSize = 5;
    const currentPage = ref(Number(route.query.page) || 1);
    const onPageChange = (event: any) =>
    {
        currentPage.value = event.page + 1;
        router.push({ query: { ...route.query, page: currentPage.value } });
    };

    // Get news posts.
    const newsPostsQueryVariables = computed(() =>
    {
        return {
            filter:
            {
                status: { _eq: "published" },
                tags: tags.value.length > 0 ? { tags_id: { name: { _in: tags.value } } } : undefined
            },
            sort: [ "-date_published" ],
            limit: pageSize,
            offset: (currentPage.value - 1) * pageSize
        };
    });
    const { data: newsPostsData, fetching: isFetchingNews } = useNewsPostsQuery({ variables: newsPostsQueryVariables });
    const posts = computed(() => newsPostsData.value?.news_posts as News_Posts[] ?? [] as News_Posts[]);

    // Get breadcrumbs.
    const { pages } = useBreadcrumbs();

    // Methods.
    const resetTags = () => router.push({ query: { ...route.query, tags: undefined } });

    const toggleTag = (tagName: string) =>
    {
        let newTags = [ ...tags.value ];

        if (newTags.includes(tagName))
            // When the tag already has been toggled, remove it from the new tags query parameter.
            newTags = newTags.filter(tag => tag !== tagName);
        else
            // When the tag hasn't been toggled, add it to the new tags query parameter.
            newTags.push(tagName);
        
        // Update the URL with the new tags.
        router.push({ query: { ...route.query, tags: newTags.length > 0 ? newTags.join(",") : undefined } });
    }
</script>


<template>
    <div class="flex flex-col justify-center w-full h-full">
        <!-- Breadcrumbs -->
        <nav class="mt-4 flex" aria-label="Breadcrumb">
            <ol role="list" class="flex items-center space-x-1">
                <li>
                    <div>
                        <NuxtLink to="/" class="text-sm text-gray-500 hover:text-gray-600">
                            Hjem
                        </NuxtLink>
                    </div>
                </li>
                <li v-for="page in pages" :key="page.name">
                    <div class="flex justify-center xl:justify-start items-center">
                        <svg class="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" role="presentation">
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                        <NuxtLink :to="page.href" class="ml-1 text-sm text-gray-500 hover:text-gray-600" :aria-current="page.current ? 'page' : undefined">{{ page.name }}</NuxtLink>
                    </div>
                </li>
            </ol>
        </nav>

        <!-- Title and tags -->
        <ClientOnly>
            <div class="w-full mt-6 xl:mt-24" v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0 }" :delay="100" :duration="700">
                <div class="mt-2 prose-lg prose-blue">
                    <h1>Nyheder</h1>
                </div>

                <div class="mt-12 flex flex-wrap gap-3">
                    <button type="button" @click="resetTags" :class="[ tags.length === 0 ? 'bg-black text-white' : '', 'rounded-full border border-gray-400 hover:border-transparent hover:text-white hover:bg-black text-base font-semibold px-3 py-1' ]">Alle</button>
                    <button type="button" v-for="tag in topPostsTags" :key="tag.id" @click="toggleTag(tag.name)" :alt="`Vis nyheder med tagget ${tag?.name}`" :class="[ tag.active ? 'bg-black text-white' : '', 'rounded-full border border-gray-400 hover:border-transparent hover:text-white hover:bg-black text-base font-semibold px-3 py-1' ]" >{{ tag.name }}</button>
                </div>
            </div>
        </ClientOnly>

        <!-- News posts -->
        <div class="mt-16 flex flex-col space-y-6" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :duration="500">
            <NewsCard v-for="post in posts" :key="post.id" :data="post" orientation="horizontal" />
            
            <!-- Pagination -->
            <div class="flex justify-center mt-8 mb-12">
                <Paginator
                    v-if="!isFetchingNews"
                    :rows="pageSize"
                    :totalRecords="totalPosts"
                    :first="1"
                    :pageLinkSize="3"
                    @page="onPageChange"
                />
            </div>
        </div>
    </div>
</template>