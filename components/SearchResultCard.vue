<script setup lang="ts">
    // Properties.
    interface Properties
    {
        breadcrumbs: string[];
        image?: string;
        to: string;
    }
    defineProps<Properties>();
</script>

<template>
    <NuxtLink :to="`/${to}`" class="focus:outline-none group">
        <div class="flex flex-col transition duration-150 bg-gray-50 border border-gray-100 group-hover:bg-gray-100 group-focus:bg-gray-100 group-focus:ring-2 ring-offset-2 ring-black rounded-xl p-3">
            <Breadcrumb :model="breadcrumbs.map(breadcrumb => ({ label: breadcrumb }))" pt:root="!bg-transparent text-xs !px-0 !py-2 select-none">
                <template #item="{ item }">
                    <p class="font-medium tracking-wide">{{ item.label }}</p>
                </template>
                <template #separator>
                    <Icon name="tabler:chevron-right" class="w-3 h-3" style="margin-top: 1px;" />
                </template>
            </Breadcrumb>

            <div class="flex">
                <NuxtImg v-if="image" :src="image" format="webp" sizes="sm:640px" loading="lazy" :width="120" :height="120" class="object-container rounded-xl" alt="" role="presentation" />

                <div class="prose space-y-0">
                    <p class="text-base lg:text-lg font-semibold mb-0">
                        <slot name="title"></slot>
                    </p>
                    <p class="!mt-3 text-sm lg:text-base line-clamp-2 text-gray-500">
                        <slot name="summary"></slot>
                    </p>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>