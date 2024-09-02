<script setup lang="ts">
    import { AisInstantSearch, AisHits, AisSearchBox, AisIndex, AisStateResults, AisHighlight } from "vue-instantsearch/vue3/es";
    import { useSearchStore } from "@/stores";
    import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
    import { useFocus } from "@vueuse/core";

    // Fields.
    const visible = ref(false);
    const client = useInstantSearch();
    const searchStore = useSearchStore();
    const shouldMarkWordOnPage = ref(false);
    const popover = ref();
    const searchInput = ref();
    const activeCollectionType = ref("all");
    useFocus(searchInput, { initialValue: true });

    // Methods.
    const showSearchDialog = () =>
    {
        visible.value = true;
        searchStore.showDialog();
    };

    const closeSearchDialog = (callback : any) =>
    {
        callback();
        searchStore.hideDialog();
    };

    const onInput = (refine : any, event : any) =>
    {
        refine(event.currentTarget.value);
        if (shouldMarkWordOnPage.value) searchStore.setQuery(event.currentTarget.value);
    };

    const getBreadcrumbs = (collection : string, item : any) =>
    {
        return (item["category.name"] === "None" || item["category.name"] === undefined) ? [ collection ] : [ collection, item["category.name"] ];
    };

    const toggleMarkWordOnPageGif = (event : any) => popover.value.toggle(event);
    const showMarkWordOnPageGif = (event : any) => popover.value.show(event);
    const hideMarkWordOnPageGif = (event : any) => popover.value.hide(event);

    // Events.
    onBeforeRouteLeave((to, from, next) =>
    {
        next();
        visible.value = false;
        searchStore.hideDialog();
    });
</script>

<template>
    <button type="button" @click="showSearchDialog()" class="flex justify-center items-center 3xl:justify-end text-gray-900 3xl:py-8 3xl:px-7 3xl:mr-5 focus:outline-none group">
        <span class="sr-only">Søg</span>
        <Icon name="tabler:search" class="h-5 w-5 flex-none" aria-hidden="true" role="presentation" />
    </button>
    
    <Dialog v-model:visible="visible" @after-hide="$emit('close')" pt:root:class="font-plusjakartasans !min-w-full !min-h-full !bg-white !border-0 !rounded-none overflow-y-scroll px-6 lg:px-6 pb-8 lg:pb-12">
        <template #container="{ closeCallback }">
            <UseFocusTrap v-if="visible" :options="{ immediate: true }">
                <ais-instant-search :search-client="client" index-name="pages" class="flex justify-center items-start w-full h-full">
                    <div class="flex flex-col w-full h-full max-w-7xl">
                        <!-- Header -->
                        <div class="sticky top-0 pt-6 lg:pt-8 xl:pt-16 w-full z-50 bg-gradient-to-b from-white via-white">
                            <div class="flex flex-col md:flex-row items-start md:justify-between md:items-center w-full text-gray-900">
                                <h1 class="font-bold text-2xl lg:text-4xl order-2 md:order-1">Hvad søger du efter?</h1>

                                <button class="mb-5 md:mb-0 w-auto self-end font-bold text-sm lg:text-base tracking-wide rounded focus:outline-none focus:ring-2 focus:ring-black transition duration-150 order-1 md:order-2" @click="closeSearchDialog(closeCallback)">Luk søgning</button>
                            </div>

                            <div class="mt-6 lg:mt-12 pb-8">
                                <ais-search-box>
                                    <template v-slot="{ currentRefinement, isSearchStalled, refine }" as="div" class="inline-flex w-full">
                                        <input ref="searchInput" type="search" :value="currentRefinement" @input="onInput(refine, $event)" class="w-full text-base lg:text-lg bg-gray-100 rounded-lg border-none p-3 lg:p-4 focus:outline-none focus:ring-2 focus:ring-black transition duration-150" placeholder="Søg på formula-micro.dk" aria-placeholder="Søg på formula-micro.dk" aria-label="Søg på formula-micro.dk">

                                        <div class="-ml-20 relative inline-flex items-center">
                                            <button type="button" class="p-1 font-medium text-gray-500 hover:text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-black transition duration-150"
                                                    @click="$refs.searchInput.value = ''"
                                            >
                                                Nulstil
                                            </button>
                                        </div>

                                        <span :hidden="!isSearchStalled">Loading...</span>
                                    </template>
                                </ais-search-box>
                            </div>
                        </div>

                        <!-- Search results -->
                        <div class="flex flex-col lg:flex-row items-start lg:items-center w-full gap-x-3 gap-y-5 lg:gap-y-3">
                            <ais-state-results>
                                <template v-slot="{ results: { hits } }">
                                    <div class="flex flex-wrap gap-3">
                                        <Button type="button" @click="activeCollectionType = 'all'" label="Alle" :badge="hits.length.toString()" :outlined="activeCollectionType !== 'all'" pt:root="text-sm lg:text-base" />
                                        <Button type="button" @click="activeCollectionType = 'pages'" label="Sider" :badge="hits?.filter(hit => hit.collection === 'pages')?.length.toString()" :outlined="activeCollectionType !== 'pages'" pt:root="text-sm lg:text-base" />
                                        <Button type="button" @click="activeCollectionType = 'news_posts'" label="Nyheder" :badge="hits?.filter(hit => hit.collection === 'news_posts')?.length.toString()" :outlined="activeCollectionType !== 'news_posts'" pt:root="text-sm lg:text-base" />
                                        <!-- <Button type="button" @click="activeCollectionType = 'blog_posts'" label="Blog" badge="28" :outlined="activeCollectionType !== 'blog_posts'" pt:root="text-sm lg:text-base" /> -->
                                        <!-- <Button type="button" @click="activeCollectionType = 'cases'" label="Cases" badge="28" :outlined="activeCollectionType !== 'cases'" pt:root="text-sm lg:text-base" /> -->
                                    </div>
                                </template>
                            </ais-state-results>
                            <div class="flex flex-col sm:flex-row items-start" @mouseover="showMarkWordOnPageGif" @mouseleave="hideMarkWordOnPageGif">
                                <div class="inline-flex items-center">
                                    <Checkbox v-model="shouldMarkWordOnPage" inputId="shouldMarkWordOnPage" name="shouldMarkWordOnPage" value="Markér søgeord på resultatside">
                                        <template #icon>
                                            <Icon name="tabler:check" class="text-white" />
                                        </template>
                                    </Checkbox>
                                    <label for="shouldMarkWordOnPage" class="ml-2 text-sm lg:text-base select-none"> Markér søgeord på resultatside </label>
                                </div>
                                <button type="button" @click="toggleMarkWordOnPageGif" class="block xl:hidden ml-7 sm:ml-1 text-sm lg:text-base font-semibold text-blue-700">(se eksempel)</button>
                            </div>
                            <Popover ref="popover" pt:root="rounded-lg" pt:transition="scale-100 duration-300">
                                <img src="/images/query.webp" width="560" height="560" />
                            </Popover>
                        </div>

                        <ul class="mt-12 grid gap-5">
                            <ais-index index-name="pages" v-if="activeCollectionType === 'all' || activeCollectionType === 'pages'">
                                <ais-hits>
                                    <template v-slot="{ items }">
                                        <ul class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <li v-for="item in items" :key="item.id">
                                                <SearchResultCard :item="item" :breadcrumbs="getBreadcrumbs('Sider', item)" :to="item.slug">
                                                    <template #title>
                                                        <ais-highlight :hit="item" attribute="title" />
                                                    </template>
                                                    <template #summary>
                                                        <ais-highlight :hit="item" attribute="seo_description" />
                                                    </template>
                                                </SearchResultCard>
                                            </li>
                                        </ul>
                                    </template>
                                </ais-hits>
                            </ais-index>

                            <ais-index index-name="news_posts" v-if="activeCollectionType === 'all' || activeCollectionType === 'news_posts'">
                                <ais-hits>
                                    <template v-slot="{ items }">
                                        <ul class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <li v-for="item in items" :key="item.id">
                                                <SearchResultCard :item="item" :breadcrumbs="getBreadcrumbs('Nyheder', item)" :to="item.slug">
                                                    <template #title>
                                                        <ais-highlight :hit="item" attribute="title" />
                                                    </template>
                                                    <template #summary>
                                                        <ais-highlight :hit="item" attribute="summary" />
                                                    </template>
                                                </SearchResultCard>
                                            </li>
                                        </ul>
                                    </template>
                                </ais-hits>
                            </ais-index>
                        </ul>
                    </div>
                </ais-instant-search>
            </UseFocusTrap>
        </template>
    </Dialog>
</template>

<style scoped>
    /* Hide the default "clear search" webkit button. */
    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance:none;
    }
</style>