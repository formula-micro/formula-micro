<script setup lang="ts">
    import { useNewsPostsQuery, useTagCountersQuery, useNewsPostsCountQuery } from "@/graphql/generated/graphql";
    import { getDate, getTime } from "@/helpers";

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
            filter: {
                status: { _eq: "published" },
                tags: tags.value.length > 0 ? { tags_id: { name: { _in: tags.value } } } : undefined
            },
            sort: [ "-date_published" ],
            limit: pageSize,
            offset: (currentPage.value - 1) * pageSize
        };
    });
    const { data: newsPostsData, fetching: isFetchingNews } = useNewsPostsQuery({ variables: newsPostsQueryVariables });
    const posts = computed(() => newsPostsData.value?.news_posts ?? []);

    // Get breadcrumbs.
    const pages = computed(() =>
    {
        const pages = route.path.split("/").filter(page => page !== "").map(page => `/${page}`);
        let previousPage;
        const result = [];
        
        for(const page of pages) {
            const name = (page.charAt(1).toUpperCase() + page.slice(2)).replace(/-/g, " ");
            const href: string = !previousPage ? page : previousPage + page;

            result.push({ name: name, href: href, current: page === `/${route.params.slug}` });
            previousPage = href;
        }
        
        return result;
    });

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

        <HeadlessTransitionRoot
            appear
            :show="true"
            as="template"
            enter="transform transition duration-700"
            enter-from="opacity-20 translate-y-1/3"
            enter-to="opacity-100 translate-y-0"
        >

            <div class="w-full mt-6 xl:mt-24">               
                <div class="mt-2 prose-lg prose-blue">
                    <h1>Nyheder</h1>
                </div>

                <div class="mt-12 flex flex-wrap gap-3">
                    <button type="button" @click="resetTags" :class="[ tags.length === 0 ? 'bg-black text-white' : '', 'rounded-full border border-gray-400 hover:border-transparent hover:text-white hover:bg-black text-base font-semibold px-3 py-1' ]">Alle</button>
                    <button type="button" v-for="tag in topPostsTags" :key="tag.id" @click="toggleTag(tag.name)" :class="[ tag.active ? 'bg-black text-white' : '', 'rounded-full border border-gray-400 hover:border-transparent hover:text-white hover:bg-black text-base font-semibold px-3 py-1' ]" >{{ tag.name }}</button>
                </div>
            </div>
        </HeadlessTransitionRoot>

        <div class="mt-16 flex flex-col">
            <div v-for="post in posts" :key="post.id" class="flex flex-col md:flex-row mb-8">
                <NuxtLink :to="`/nyheder/${post.slug}`" class="flex flex-col md:flex-row w-full block transition-transform transform hover:scale-105 focus:scale-105 duration-300">
                    <NuxtImg :src="post.cover_image?.id ? `https://cms.formula.nu/assets/${post.cover_image.id}` : '/images/nyheder.jpg'" sizes="sm:640px md:768px lg:1920px" width="1920" height="1080" class="w-full h-48 md:h-full md:w-1/3 object-cover rounded-xl"/>
                    <div class="mt-4 md:mt-0 md:ml-6 flex flex-col justify-between flex-grow">
                        <div>
                            <p class="text-sm text-gray-500 mb-2">{{ getDate(post.date_published) }} &middot; {{ getTime(post.date_published) }}</p>
                            <p class="text-xl font-semibold mb-2">{{ post.title }}</p>
                            <p v-html="post.summary" class="text-gray-700"></p>
                        </div>
                        <div class="flex flex-wrap gap-2 mt-2">
                            <span v-for="tag in post.tags" :key="tag?.tags_id?.id" class="inline-block rounded-full border border-gray-400 font-semibold px-3 py-1">
                                {{ tag?.tags_id?.name }}
                            </span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
            
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