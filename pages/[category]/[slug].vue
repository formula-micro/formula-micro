<script setup lang="ts">
    import { usePagesQuery } from "@/graphql/generated/graphql";

    // Fields.
    const { $preview } = useNuxtApp(); 
    const { category, slug } = useRoute().params;

    // Get page.
    if ($preview ) {
        const { data: pageData } = await usePagesQuery({ variables: { filter: { slug: { _eq: `${category}/${slug}` }, status: { _eq: "published" } }, limit: 1 } });
    }
    const { data: pageData } = await usePagesQuery({ variables: { filter: { slug: { _eq: `${category}/${slug}` }, status: { _eq: "published" } }, limit: 1 } });
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

    // Get blocks.
    const blocks = computed(() => page.value?.blocks?.map(block => block?.item));
</script>

<template>
    <div class="flex flex-col items-center w-full mt-5 xl:mt-12">
        <div class="flex flex-col justify-center items-center w-full">
            <template v-for="block in blocks">
                <BlocksBannerHero v-if="block.__typename === 'banner_hero_blocks'" :data="block" />

                <BlocksTextHero v-if="block.__typename === 'text_hero_blocks'" :data="block" />

                <BlocksGallery v-if="block.__typename === 'gallery_blocks'" :data="block" />

                <BlocksPartners v-if="block.__typename === 'partners_blocks'" :data="block" />

                <BlocksServicesList v-if="block.__typename === 'services_list_blocks'" :data="block" />

                <BlocksTextAndImage v-if="block.__typename === 'text_and_image_blocks'" :data="block" />

                <BlocksRichText v-if="block.__typename === 'richtext_blocks'" :data="block" />

                <BlocksSpacer v-if="block.__typename === 'spacer_blocks'" :data="block" />

                <BlocksDisclosureGroup v-if="block.__typename === 'disclosure_group_blocks'" :data="block" />

                <BlocksDisclosure v-if="block.__typename === 'disclosure_blocks'" :is-child="false" :data="block" />

                <BlocksTabs v-if="block.__typename === 'tabs_blocks'" :data="block" />

                <BlocksGoogleMaps v-if="block.__typename === 'google_maps_blocks'" :data="block" />

                <BlocksCookieSelection v-if="block.__typename === 'cookie_selection_blocks'" :data="block" />

                <BlocksContactForm v-if="block.__typename === 'contact_form_blocks'" :data="block" />

                <BlocksColumns v-if="block.__typename === 'columns_blocks'" :data="block" />
            </template>
        </div>
    </div>
</template>