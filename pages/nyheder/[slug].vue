<script setup lang="ts">
    import type { News_Blocks } from "@/graphql/generated/graphql";
    import { useNewsPostsQuery } from "@/graphql/generated/graphql";
    import { getDate, getTime, useBreadcrumbs } from "@/helpers";

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
    const { pages } = useBreadcrumbs();

    // Get blocks and tags.
    const blocks = computed(() => post.value?.content.blocks);
    const tags = computed(() => post.value?.tags?.map(tag => tag?.tags_id));

    // Get similar posts, excluding the current post.
    const similarPostsBlockData =
    {
        "id": "1f47db8a-3465-4fb8-a248-e71e67cfcb3x",
        "width": {
            "id": "70704ba2-26ea-47ec-9941-0370ee08e725",
            "class": "max-w-7xl xl:max-w-8xl 4xl:max-w-10xl",
            "name": "wide",
            "__typename": "widths"
        },
        "has_vertical_padding": false,
        "has_horizontal_padding": false,
        "title": "Nyheder",
        "tags": tags.value?.map(tag => ({
            "tags_id": {
                ...tag
            },
            "__typename": "news_blocks_tags"
        })),
        "__typename": "news_blocks"
    } as News_Blocks;
</script>

<template>
    <article>
        <!-- Breadcrumbs -->
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

        <!-- Title -->
        <div class="mt-32 flex flex-col justify-center items-center h-56">
            <ClientOnly>
                <div class="w-full max-w-4xl text-center prose-lg prose-blue" v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0 }" :delay="100" :duration="700">
                    <h1 class="font-semibold">{{ post?.title }}</h1>
                    <div class="text-lg font-medium" v-html="post?.summary" />
                </div>
            </ClientOnly>
        </div>

        <!-- Image cover -->
        <div>
            <!-- v-motion is used on the image to keep the title and summary visible behind the image when animating in -->
            <!-- It seems v-motion doesn't respect css z-index -->
            <NuxtImg class="mt-6 object-cover rounded-xl w-full max-h-2xl" v-motion :initial="{ opacity: 100 }" :src="post?.cover_image?.id ? `https://cms.formula.nu/assets/${post.cover_image.id}` : '/images/nyheder.jpg'"  aria-hidden="true" role="presentation" sizes="sm:512px md:860px lg:1200px" />
            <div class="mt-1 space-y-1">
                <p class="text-sm font-medium" v-if="post?.cover_image?.description">{{ post.cover_image.description }}</p>
                <div class="text-sm font-medium prose" v-html="post?.cover_image?.attribution" v-if="post?.cover_image?.attribution" />
                <p class="text-sm text-gray-500 mb-2">Udgivet d. {{ getDate(post?.date_published) }} &middot; {{ getTime(post?.date_published) }}</p>
            </div>
        </div>

        <!-- Content -->
        <div class="flex flex-col space-y-4 py-12 prose-lg prose-blue">
            <EditorjsEditorJS :blocks="blocks" />
        </div>

        <!-- Divider -->
        <div class="mt-12 border-b border-gray-300 w-full" />

        <!-- Tags -->
        <div class="mt-16" v-if="tags">
            <p class="text-lg font-medium">Tags</p>

            <div class="mt-3 flex flex-wrap gap-3">
                <NuxtLink v-for="tag in tags" :key="tag?.id" :to="`/nyheder?tags=${tag?.name}`" :alt="`Gå til siden nyheder og vis nyheder hvor tag er ${tag?.name}`" class="inline-block rounded-full border border-gray-400 hover:border-transparent hover:text-white hover:bg-black focus:bg-black font-semibold px-3 py-1" >
                    {{ tag?.name }}
                </NuxtLink>
            </div>
        </div>

        <!-- Similar news posts -->
        <div class="mt-16 ">
            <p class="text-lg font-medium">Lignende nyheder</p>

            <BlocksNews :data="similarPostsBlockData" :exclude-post-id="post?.id"/>
        </div>
    </article>
</template>