<script setup lang="ts">
    import { AisInstantSearch, AisHits, AisSearchBox, AisIndex } from "vue-instantsearch/vue3/es";
    import Dialog from "primevue/dialog";
    import Chip from "primevue/chip";
    import { useSearchStore } from "@/stores";

    // Fields.
    const visible = ref(false);
    const client = useInstantSearch();
    const searchStore = useSearchStore();

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
</script>

<template>
    <button type="button" @click="visible = true" class="inline-flex justify-end text-gray-900 z-50 py-8 px-7 mr-5 focus-visible:outline-none">
        <span class="sr-only">Søg</span>
        <Icon name="tabler:search" class="h-5 w-5 flex-none" aria-hidden="true" role="presentation" />
    </button>
    
    <Dialog v-model:visible="visible" @after-hide="$emit('close')" pt:root:class="!min-w-full !min-h-full !bg-white !border-0 !rounded-none">
        <template #container="{ closeCallback }">
            <div class="flex justify-center items-start w-full h-full">
                <div class="mt-16 flex flex-col w-full h-full max-w-7xl">
                    <div class="flex justify-between items-center w-full">
                        <h1 class="font-bold text-4xl">Hvad søger du efter?</h1>

                        <button class="font-bold tracking-wide" @click="closeSearchDialog(closeCallback)">Luk søgning</button>
                    </div>

                    <ais-instant-search :search-client="client" index-name="pages" class="mt-12">
                        <ais-search-box>
                            <template v-slot="{ currentRefinement, isSearchStalled, refine }">
                                <input type="search" :value="currentRefinement" @input="refine($event.currentTarget.value)" class="w-full text-lg bg-gray-50 rounded-xl border-gray-200 p-3" placeholder="Søg på formula-micro.dk">
                                <span :hidden="!isSearchStalled">Loading...</span>
                            </template>
                        </ais-search-box>

                        <div class="mt-8 mb-16 flex items-center w-full space-x-3">
                            <Chip label="Alle" />
                            <Chip label="Sider" />
                            <Chip label="Nyheder" />
                            <Chip label="Blog" />
                            <Chip label="Cases" />
                        </div>

                        <ais-index index-name="pages">
                            <ais-hits>
                                <template v-slot="{ items }">
                                    <ul class="space-y-5">
                                        <li v-for="{ id,title } in items" :key="id">
                                            <!-- Insert breadcrumbs Sider > Kategori -->
                                            <SearchResultCard :breadcrumbs="[ 'Kategori', 'Side' ]" :title="title" summary="awdawdawdawdwadawdadadadwad" />
                                            <!-- Indsæt beskrivelse og marker funden tekst, hvis den er i beskrivelsen -->
                                        </li>
                                    </ul>
                                </template>
                            </ais-hits>
                        </ais-index>

                        <ais-index index-name="news_posts">
                            <ais-hits>
                                <template v-slot="{ items }">
                                    <ul>
                                        <li v-for="{ id,title } in items" :key="id">
                                            <h1>{{ title }}</h1>
                                        </li>
                                    </ul>
                                </template>
                            </ais-hits>
                        </ais-index>

                    </ais-instant-search>
                </div>
            </div>
        </template>
    </Dialog>
</template>