<script setup lang="ts">
    import Tabs from "primevue/tabs";
    import TabList from "primevue/tablist";
    import Tab from "primevue/tab";
    import TabPanels from "primevue/tabpanels";
    import TabPanel from "primevue/tabpanel";
    import type { Tabs_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Tabs_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, background_color, has_vertical_padding, has_horizontal_padding, title, tabs } = toRefs(props.data);
</script>

<template>
    <div :class="[ background_color!.class, has_vertical_padding ? 'py-4' : '', 'flex justify-center items-center w-full xl:px-12' ]">
        <div :class="[ width!.class, has_vertical_padding ? 'py-8 xl:py-16' : '', has_horizontal_padding ? 'px-6 xl:px-0' : '', 'w-full prose prose-blue' ]">
            <Tabs value="0">
                <TabList class="overflow-auto">
                    <Tab v-for="(tab, index) in tabs" :key="tab!.id" :value="index.toString()">{{ tab!.name }}</Tab>
                </TabList>
                <div v-if="tabs?.length > 2" class="xl:hidden flex justify-center items-center">
                    <p class="text-gray-600 font-small text-xs">Swipe for at se flere</p>
                </div>

                <TabPanels>
                    <TabPanel v-for="(tab, index) in tabs" :key="tab!.id" :value="index.toString()">
                        <template v-for="block in tab?.blocks">
                            <BlocksTextAndImage v-if="block!.item!.__typename === 'text_and_image_blocks'" :data="block!.item!" />

                            <BlocksRichText v-if="block!.item!.__typename === 'richtext_blocks'" :data="block!.item!" />

                            <BlocksSpacer v-if="block!.item!.__typename === 'spacer_blocks'" :data="block!.item!" />

                            <BlocksColumns v-if="block!.item!.__typename === 'columns_blocks'" :data="block!.item!" />
                        </template>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </div>
</template>

<!-- This CSS is nessecary as the TabList "tabList pt option" isn't available, even though it is listed in the primevue documentation. -->
<style scoped>
    .p-tab {
        flex: 1;
        padding: 1.25rem 1.25rem !important;
    }

    .p-tabpanels {
        padding: 0 !important;
    }
</style>

<style>
    .p-tablist-tab-list {
        background: unset !important;
    }

    .p-tab {
        background: unset !important;
    }

    .p-tabpanels {
        background: unset !important;
    }
</style>