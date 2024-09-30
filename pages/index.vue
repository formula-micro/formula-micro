<script setup lang="ts">
    import { usePagesQuery } from "@/graphql/generated/graphql";

    // Fields.
    const { $preview } = useNuxtApp(); 

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

    useHead({ titleTemplate: () => "Forside | Formula Micro" });

    useServerSeoMeta({
        title: () => page.value?.seo_title ?? "Formula Micro",
        description: () => page.value?.seo_description ?? "",
        ogDescription: page.value?.seo_description ?? "",
        // ogImage: '[og:image]',
        twitterTitle: page.value?.seo_title ?? "Formula Micro",
        twitterDescription: page.value?.seo_description ?? "",
        // twitterImage: '[twitter:image]',
        // twitterCard: 'summary'
    });

    // Get blocks.
    const blocks = computed(() => page.value?.blocks?.map(block => block?.item));
</script>

<template>
    <div class="flex flex-col items-center w-full 3xl:mt-2">
        <div class="flex flex-col justify-center items-center w-full">
            <template v-for="block in blocks">
                <LazyBlocksBannerHero v-if="block.__typename === 'banner_hero_blocks'" :data="block" />

                <LazyBlocksPartners v-if="block.__typename === 'partners_blocks'" :data="block" class="max-w-7xl px-6 xl:px-12" />

                <LazyBlocksTextHero v-if="block.__typename === 'text_hero_blocks'" :data="block" />

                <LazyBlocksGallery v-if="block.__typename === 'gallery_blocks'" :data="block" />

                <LazyBlocksServicesList v-if="block.__typename === 'services_list_blocks'" :data="block" />

                <LazyBlocksTextAndImage v-if="block.__typename === 'text_and_image_blocks'" :data="block" />

                <LazyBlocksRichText v-if="block.__typename === 'richtext_blocks'" :data="block" />

                <LazyBlocksSpacer v-if="block.__typename === 'spacer_blocks'" :data="block" />

                <LazyBlocksDisclosureGroup v-if="block.__typename === 'disclosure_group_blocks'" :data="block" />

                <LazyBlocksDisclosure v-if="block.__typename === 'disclosure_blocks'" :is-child="false" :data="block" />

                <LazyBlocksGoogleMaps v-if="block.__typename === 'google_maps_blocks'" :data="block" />

                <LazyBlocksCookieSelection v-if="block.__typename === 'cookie_selection_blocks'" :data="block" />

                <LazyBlocksContactForm v-if="block.__typename === 'contact_form_blocks'" :data="block" />

                <LazyBlocksColumns v-if="block.__typename === 'columns_blocks'" :data="block" />

                <LazyBlocksNews v-if="block.__typename === 'news_blocks'" :data="block" />
            </template>
        </div>
    </div>
</template>