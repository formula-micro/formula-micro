<script setup lang="ts">
    import { useNewsPostsQuery, useTagCountersQuery } from "@/graphql/generated/graphql";
    import { useRoute, useRouter } from 'vue-router';

    // Page meta.
    definePageMeta({
        layout: "news"
    });

    // Fields.
    const route = useRoute();
    const router = useRouter();

    // Ensure 'tags' is always a string or undefined
    const tags = computed(() => {
        const tagQuery = route.query.tags;
        if (Array.isArray(tagQuery)) {
            return tagQuery.join(",");
        }
        return tagQuery || "";
    });

    // Get tags.
    const { data: postsTagData } = await useTagCountersQuery({ variables: { filter: { collection: { _eq: "news_posts" } }, sort: [ "-count" ], limit: 15 } });
    //const topPostsTags = computed(() => postsTagData.value?.tags_counters.map(tagCounter => ({id: tagCounter.tag?.id, name: tagCounter.tag?.name, active: tags.value?.split(",").includes(tagCounter.tag?.name),})) ?? []);
    
    const topPostsTags = computed(() => 
        postsTagData.value?.tags_counters
            .filter(tagCounter => tagCounter.tag?.name) 
            .map(tagCounter => ({
                id: tagCounter.tag?.id, 
                name: tagCounter.tag?.name as string, 
                active: tags.value?.split(",").includes(tagCounter.tag?.name as string)
        })) ?? []
    );

    const toggleTag = (tagName: string) =>
    {
        let newTags = [...(tags.value ? tags.value.split(",") : [])];
        if (newTags.includes(tagName)) {
            newTags = newTags.filter(tag => tag !== tagName);
        } else {
            newTags.push(tagName);
        }
        router.push({ query: { ...route.query, tags: newTags.length > 0 ? newTags.join(",") : undefined } });
    }

    const resetTags = () => {
        router.push({ query: { ...route.query, tags: undefined } });
    };

    // Get news posts.
    const variables = computed(() => {        
        const filter: { status: { _eq: string }, tags?: { tags_id: { name: { _in: string[] } } } } = { 
            status: { _eq: "published" } 
        };

        if (tags.value) {
            filter.tags = { tags_id: { name: { _in: tags.value.split(",") } } };
        }

        return {
            filter: filter,
            sort: [ "-date_published" ],
            limit: 15
        };
    });

    const { data: newsPostsData } = await useNewsPostsQuery({ variables });
    const posts = computed(() => newsPostsData.value?.news_posts ?? []);

    // Get breadcrumbs.
    const pages = computed(() => {
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
</script>


<template>
    <div class="flex flex-col justify-center">
        <nav class="mt-4 flex" aria-label="Breadcrumb">
            <ol role="list" class="flex items-center space-x-2">
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
                        <NuxtLink :to="page.href" class="ml-4 text-sm text-gray-500 hover:text-gray-600" :aria-current="page.current ? 'page' : undefined">{{ page.current ? post?.title : page.name }}</NuxtLink>
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
            <div class="mt-6 xl:mt-32 w-full z-0 prose-lg prose-blue">
                <h1 class="font-semibold">Nyheder</h1>

                <div class="flex flex-wrap gap-3 mb-6">
                    <button type="button" @click="resetTags" :class="!tags? 'bg-black text-white' : ''" class="rounded-full border-1 border-gray-400 hover:border-transparent hover:text-white hover:bg-black text-base font-semibold px-3 py-1" >Alle</button>
                    <button type="button" v-for="tag in topPostsTags" :key="tag.id" @click="toggleTag(tag.name)" :class="tag.active ? 'bg-black text-white' : ''" class="rounded-full border-1 border-gray-400 hover:border-transparent hover:text-white hover:bg-black text-base font-semibold px-3 py-1" >{{ tag.name }}</button>                  
                </div>
            </div>
        </HeadlessTransitionRoot>


        <div v-for="post in posts" :key="post.id" class="flex flex-col md:flex-row mb-8">
            <NuxtLink :to="`/nyheder/${post.slug}`" class="flex flex-col md:flex-row w-full">
                <NuxtImg :src="`https://cms.formula.nu/assets/${post.cover_image.id}`" sizes="sm:640px md:768px lg:1920px" width="1920" height="1080" class="w-full h-48 md:h-full md:w-1/3 object-cover rounded"/>
                <div class="mt-4 md:mt-0 md:ml-6 flex flex-col justify-between flex-grow">
                    <div>
                        <p class="text-sm text-gray-500 mb-2">{{ new Date(post.date_published).toLocaleDateString() }}</p>
                        <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
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


    </div>
</template>