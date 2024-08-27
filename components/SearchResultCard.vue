<script setup lang="ts">
    // Properties.
    interface Properties
    {
        breadcrumbs: string[];
        title: string;
        summary: string;
    }
    const props = defineProps<Properties>();
</script>

<template>
    <NuxtLink>
        <div class="flex flex-col transition duration-150 hover:bg-gray-50 focus:bg-gray-50 rounded-xl p-3">
            <Breadcrumb :model="breadcrumbs.map(breadcrumb => ({ label: breadcrumb }))" pt:root="bg-transparent text-xs px-0 py-2">
                <template #separator>
                    <Icon name="tabler:chevron-right" class="w-3 h-3" style="margin-top: 1px;" />
                </template>
            </Breadcrumb>
            <div class="prose">
                <p class="text-lg !mb-0">{{ title }}</p>
                <p clas="mt-0.5">{{ summary }}</p>
            </div>
        </div>
    </NuxtLink>
</template>