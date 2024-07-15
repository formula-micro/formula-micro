<script setup lang="ts">
    import { AisInstantSearch, AisHits, AisSearchBox, AisIndex } from "vue-instantsearch/vue3/es";

    // Properties.
    interface Props
    {
        open: boolean;
    }
    const props = defineProps<Props>();
    const { open } = toRefs(props);

    // Emits.
    const emit = defineEmits(["close"]);

    // Fields.
    const client = useInstantSearch();
    
    // onMounted(async () =>
    // {
    //     await search("server");
    //     console.log(result);
    // });
</script>

<template>
    <HeadlessTransitionRoot :show="open" as="template" appear>
        <HeadlessDialog as="div" class="relative z-60" :open="true" @close="onClose">
            <div class="fixed inset-0 overflow-y-auto">
                <HeadlessTransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                    <HeadlessDialogPanel class="flex justify-center items-start w-full h-full bg-white">
                        <div class="mt-16 flex flex-col w-full h-full max-w-7xl">
                            <div class="flex justify-between items-center w-full">
                                <h1 class="font-bold text-4xl">Hvad søger du efter?</h1>

                                <button @click="$emit('close')">Luk søgning</button>
                            </div>

                            <ais-instant-search :search-client="client" index-name="pages" class="mt-12">
                                <ais-search-box>
                                    <template v-slot="{ currentRefinement, isSearchStalled, refine }">
                                        <input type="search" :value="currentRefinement" @input="refine($event.currentTarget.value)" class="w-full" placeholder="Søg på formula-micro.dk">
                                        <span :hidden="!isSearchStalled">Loading...</span>
                                    </template>
                                </ais-search-box>

                                <div class="mt-8 mb-16 flex items-center w-full space-x-3">
                                    <button class="bg-gray-100 w-14 rounded-full p-1">Alle</button> <!-- Insert count -->
                                    <button class="bg-gray-100 w-16 rounded-full p-1">Sider</button> <!-- Insert count -->
                                    <button class="bg-gray-100 w-22 rounded-full p-1">Nyheder</button> <!-- Insert count -->
                                    <button class="bg-gray-100 w-16 rounded-full p-1">Blog</button> <!-- Insert count -->
                                    <button class="bg-gray-100 w-16 rounded-full p-1">Cases</button> <!-- Insert count -->
                                </div>

                                <ais-index index-name="pages">
                                    <ais-hits>
                                        <template v-slot="{ items }">
                                            <ul>
                                                <li v-for="{ id,title } in items" :key="id">
                                                    <!-- Insert breadcrumbs Sider > Kategori -->
                                                    <h1>{{ title }}</h1>
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
                    </HeadlessDialogPanel>
                </HeadlessTransitionChild>
            </div>
        </HeadlessDialog>
    </HeadlessTransitionRoot>
</template>