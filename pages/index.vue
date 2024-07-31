<script setup lang="ts">
    import { usePagesQuery } from "@/graphql/generated/graphql";

    // Fields.
    const { $preview } = useNuxtApp(); 
    const { slug } = useRoute().params;
    console.log(slug);

    // Get page.
    if ($preview) {
        const { data: pageData } = await usePagesQuery({ variables: { filter: { id: { _eq: "45b950e4-3005-4379-ab41-ad936e4de448" }, status: { _eq: "published" } }, limit: 1 } });
    }
    const { data: pageData } = await usePagesQuery({ variables: { filter: { id: { _eq: "45b950e4-3005-4379-ab41-ad936e4de448" }, status: { _eq: "published" } }, limit: 1 } });
    const page = computed(() => pageData.value?.pages[0] ?? undefined);

    // When unable to find the page, throw a 404 error.
    if (!page.value) throw createError({ statusCode: 404, statusMessage: "Siden blev ikke fundet" });

    // Page meta.
    definePageMeta({
        layout: "default"
    });

    useHead({
        title: page.value.title,
        titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} | Formula Micro` : "Formula Micro"
    });

    useServerHead({
        title: page.value.title,
        titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} | Formula Micro` : "Formula Micro"
    });

    useSeoMeta({
        title: () => page.value?.seo_title ?? "Formula Micro",
        description: () => page.value?.seo_description ?? ""
    });

    useServerSeoMeta({
        title: () => page.value?.seo_title ?? "Formula Micro",
        description: () => page.value?.seo_description ?? ""
    });

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
            const href = !previousPage ? page : previousPage + page;

            result.push({ name: name, href: href, current: page === `/${route.params.slug}` });
            previousPage = href;
        }
        
        return result;
    });

    // Get blocks.
    const blocks = computed(() => page.value?.blocks?.map(block => block?.item));
</script>

<template>
    <div class="flex flex-col items-center w-full mt-5 xl:mt-12">
        <div class="flex flex-col justify-center items-center w-full">
            <template v-for="block in blocks">
                <BlocksBannerHero :data="block" />

                <BlocksTextHero :data="block" />

                <BlocksGallery :data="block" />

                <BlocksPartners :data="block" class="max-w-7xl px-6 xl:px-12" />

                <BlocksServicesList :data="block" />

                <BlocksTextAndImage :data="block" />

                <BlocksRichText :data="block" />

                <BlocksSpacer :data="block" />

                <BlocksDisclosure :data="block" />

                <BlocksGoogleMaps :data="block" />

                <BlocksCookieSelection :data="block" />

                <BlocksContactForm :data="block" />

                <BlocksColumns :data="block" />
            </template>
        </div>
    </div>
</template>