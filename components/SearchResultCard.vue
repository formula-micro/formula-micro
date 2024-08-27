<script setup lang="ts">
    // Properties.
    interface Properties
    {
        breadcrumbs: string[];
        title: string;
    }
    const props = defineProps<Properties>();
</script>

<template>
    <NuxtLink class="bg-gray-50">
        <Breadcrumb :model="breadcrumbs.map(breadcrumb => ({ label: breadcrumb }))" />
        <p class="text-lg">{{ title }}</p>
    </NuxtLink>
</template>