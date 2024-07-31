<script setup lang="ts">
    import type { Partners, Partners_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Partners_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, showTitle, title } = toRefs(props.data);
    const partners = computed(() => props.data.partners?.map(partner => partner?.partners_id as Partners) ?? []);
</script>

<template>
    <div v-if="__typename === 'partners_blocks'" class="max-w-7xl px-6 xl:px-12">
        <h2 v-if="showTitle" class="text-2xl xl:text-3xl font-bold">{{ title }}</h2>
        <div :class="[ showTitle ? 'mt-5' : '', partners.length > 4 ? 'flex flex-wrap' : 'grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-5', 'max-w-lg justify-center items-center gap-x-8 gap-y-12 sm:max-w-xl sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none py-16' ]">
            <NuxtImg v-for="partner in partners" :key="partner.id" :src="`https://cms.formula.nu/assets/${partner.logo!.id}`" :alt="`${partner.name} logo`" sizes="sm:158px" :width="partner.logo?.width ?? 200" :height="partner.logo?.height ?? 48" :class="[ partners.length > 4 ? 'w-1/4 xl:w-1/6' : 'col-span-2 lg:col-span-1 w-full', 'max-h-12 object-contain' ]" />
        </div>
    </div>
</template>