<script setup lang="ts">
    import { useSearchStore } from "@/stores/searchStore";
    import SearchHightlighter from "@/components/SearchHighlighter.vue";
    
    // Fields.
    const route = useRoute();
    const { query } = route.query;
    const searchStore = useSearchStore();
    searchStore.setQuery(query as string ?? "");

    // links.push({ rel: "preconnect", href: "https://plausible.formula.nu/js/script.js" });

    useServerHead({
        htmlAttrs: {
            lang: "da",
        },
    });
</script>

<template>
    <main :class="[ searchStore.isDialogVisible ? 'overflow-hidden' : '', 'relative min-w-full min-h-full h-full bg-white font-plusjakartasans' ]">
        <Navigation />
        
        <NuxtLayout>
            <SearchHightlighter :query="searchStore.query">
                <NuxtPage />
            </SearchHightlighter>
        </NuxtLayout>

        <Footer />
        <CookieBanner />
    </main>
</template>

<style>
    html, body, #__nuxt, #__layout {
        height: 100% !important;
        width: 100% !important;
    }

    body {
        margin: 0px;
    }
</style>