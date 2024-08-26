<script setup lang="ts">
    import { useNewsPostsQuery } from "@/graphql/generated/graphql";

    // Page meta.
    definePageMeta({
        layout: "news"
    });

    // Fields.
    const { slug } = useRoute().params;

    // Get news post.
    const { data: newsPostsData } = await useNewsPostsQuery({ variables: { filter: { slug: { _eq: slug }, status: { _eq: "published" } }, limit: 1 } });
    const post = computed(() => newsPostsData.value?.news_posts[0] ?? undefined);
    
    // When unable to find the news post, throw a 404 error.
    if (!post.value) throw createError({ statusCode: 404, statusMessage: "Siden blev ikke fundet" });

    // Get breadcrumbs.
    const route = useRoute();
    const pages = computed(() =>
    {
        const pages = route.path.split("/").filter(page => page !== "").map(page => `/${page}`);
        let previousPage;
        const result = [];
        
        for(const page of pages)
        {
            const name = (page.charAt(1).toUpperCase() + page.slice(2)).replace(/-/g, " ");
            const href: string = !previousPage ? page : previousPage + page;

            result.push({ name: name, href: href, current: page === `/${route.params.slug}` });
            previousPage = href;
        }
        
        return result;
    });

    // Get blocks and tags.
    const blocks = computed(() => post.value?.content.blocks);
    const tags = computed(() => post.value?.tags?.map(tag => tag?.tags_id));
    console.log(tags.value);

    // Get similar posts, excluding the current post.
    const { data: similarPostsData } = await useNewsPostsQuery({
        variables: { 
            filter: { 
                status: { _eq: "published" }, 
                tags: { tags_id: { name: { _in: tags.value?.map(tag => tag?.name) } } }, 
                slug: { _neq: post.value?.slug }  // Exclude the current post
            }, 
            limit: 3 
        }
    });
    const similarPosts = computed(() => similarPostsData.value?.news_posts ?? []);
    
    

</script>

<template>
    <article>
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

        <div class="mt-32 flex flex-col justify-center items-center">
            <HeadlessTransitionRoot
                appear
                :show="true"
                as="template"
                enter="transform transition duration-700"
                enter-from="opacity-20 translate-y-1/3"
                enter-to="opacity-100 translate-y-0"
            >
                <div class="w-full max-w-4xl text-center prose-lg prose-blue">
                    <h1 class="font-semibold">{{ post?.title }}</h1>
                    <div class="text-lg font-medium" v-html="post?.summary" />
                </div>
            </HeadlessTransitionRoot>
        </div>

        <div class="z-20">
            <NuxtImg class="mt-6 object-cover rounded-lg w-full max-h-[600px]" :src="post?.cover_image?.id ? `https://cms.formula.nu/assets/${post.cover_image.id}` : '/images/nyheder.jpg'"  aria-hidden="true" role="presentation" sizes="sm:512px md:860px lg:1200px" />
            <p class="text-sm font-medium" v-if="post?.cover_image?.description">{{ post.cover_image.description }}</p>
            <div class="text-sm font-medium prose" v-html="post?.cover_image?.attribution" v-if="post?.cover_image?.attribution" />
            <p class="text-sm text-gray-500 mb-2">Udgivet d. {{ new Date(post?.date_published).toLocaleDateString() }}</p>
        </div>

        <div class="flex flex-col space-y-4 py-12 prose-lg prose-blue">
            <EditorjsEditorJS :blocks="blocks" />
        </div>

        <div class="mt-16 border-b border-gray-300 w-full" />

        <div class="mt-16" v-if="tags">
            <p class="text-lg font-medium">Tags</p>

            <div class="mt-3 flex flex-wrap gap-3">
                    <NuxtLink v-for="tag in tags" :key="tag?.id" :to="`/nyheder?tags=${tag?.name}`" :alt="`Gå til siden nyheder og vis nyheder hvor tag er ${tag?.name}`" class="inline-block rounded-full border border-gray-400 hover:border-transparent hover:text-white hover:bg-black focus:bg-black font-semibold px-3 py-1" >
                        {{ tag?.name }}
                    </NuxtLink>
                </div>
        </div>

        <div class="mt-16 ">
            <p class="text-lg font-medium">Lignende nyheder</p>

            <div class="flex flex-wrap justify-start w-full mt-3">
                <div v-for="post in similarPosts" :key="post.id" class="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">     
                    <NuxtLink :to="`/nyheder/${post.slug}`" class="block">
                        <div class="aspect-w-16 aspect-h-9 overflow-hidden">
                            <NuxtImg :src="post.cover_image?.id ? `https://cms.formula.nu/assets/${post.cover_image.id}` : '/images/nyheder.jpg'" class="w-full h-full object-cover rounded" />
                        </div>
                        <h3 class="text-xl font-semibold mt-4 mb-2">{{ post.title }}</h3>
                        <p class="text-sm text-gray-500 mb-2">{{ new Date(post.date_published).toLocaleDateString() }}</p>
                        <p v-html="post.summary"></p>
                    </NuxtLink>

                    
                    <div class="flex flex-wrap gap-2 mt-2">
                        <NuxtLink v-for="tag in post.tags" :key="tag?.tags_id?.id" :to="`/nyheder?tags=${tag?.tags_id?.name}`" class="inline-block rounded-full border border-gray-400 hover:border-transparent hover:text-white hover:bg-black focus:bg-black font-semibold px-3 py-1">
                            {{ tag?.tags_id?.name }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>