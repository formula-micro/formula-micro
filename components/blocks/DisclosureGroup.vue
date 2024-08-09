<script setup lang="ts">
    import type { Disclosure_Group_Blocks } from "@/graphql/generated/graphql";
    import Divider from "primevue/divider";

    // Properties.
    interface Properties
    {
        data: Disclosure_Group_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, has_vertical_padding, has_horizontal_padding, title, title_placement, disclosure_group_categories } = toRefs(props.data);
    const disclosure_categories = computed(() => disclosure_group_categories?.value);
    const selectedCategory = ref<string>(disclosure_categories.value[0]?.id);
    const disclosure_blocks = computed(() => disclosure_group_categories?.value?.filter(category => category?.id === selectedCategory.value).flatMap(category => category?.disclosures));
</script>

<template>
    <div :class="[ has_vertical_padding ? 'py-4' : '', 'flex justify-center items-center w-full xl:px-12' ]">
        <div :class="[ width!.class, (title_placement === 'left' || title_placement === 'right') ? 'grid grid-cols-1 xl:grid-cols-[3fr,0.5fr,5fr] gap-x-8' : '', title_placement === 'right' ? 'order-3' : '', has_vertical_padding ? 'py-8 xl:py-16' : '', has_horizontal_padding ? 'px-6' : 'px-6 xl:px-0', 'w-full prose' ]">
            <h2 :class="[ title_placement === 'left' || title_placement === 'right' ? 'xl:!mb-0' : '' ]">{{ title }}</h2>

            <div v-if="(title_placement === 'left' || title_placement === 'right')" />

            <div :class="[ title_placement === 'top' ? 'mt-5' : '', title_placement === 'right' ? '-order-3' : '', 'prose  prose-blue min-w-full' ]">
                <div class="flex items-center space-x-5 mb-5">
                    <p class="font-medium">Kategorier</p>

                    <button v-for="category in disclosure_categories" type="button" @click="selectedCategory = category!.id" :class="[ selectedCategory == category!.id ? 'font-bold underline' : 'font-medium', 'text-sm hover:underline focus:underline focus:outline-none bg-gray-100 px-3 py-1.5 rounded-full' ]">
                        {{ category!.name }}
                    </button>
                </div>

                <template v-for="disclosure in disclosure_blocks" :key="disclosure?.disclosure_blocks_id?.id">
                    <BlocksDisclosure :is-child="true" :data="disclosure!.disclosure_blocks_id!" />
                    <Divider />
                </template>
            </div>
        </div>
    </div>
</template>