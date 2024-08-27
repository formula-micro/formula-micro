<script setup lang="ts">
    import { useFooterCategoriesQuery } from "@/graphql/generated/graphql";

    // Fields.
    const { data, error } = await useFooterCategoriesQuery({ variables: {} });
    const categories = computed(() => (data.value?.footer_categories));

    const errorMessage = ref<string|undefined>(undefined);
    watch(error, (value) => errorMessage.value = value?.message);

    const gridCols = computed(() =>
    {
        const length = categories.value?.length ?? 1;
        if (length === 1) return "grid-cols-1";
        if (length === 2) return "grid-cols-1 sm:grid-cols-2";
        if (length === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
        if (length === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"; 
    });
</script>

<template>
    <footer class="flex justify-center w-full py-8 xl:py-16 bg-white">
        <div :class="[ gridCols, 'grid gap-x-12 lg:gap-x-8 gap-y-12 lg:w-full max-w-2xl lg:max-w-7xl px-7 ml-12 md:ml-16 lg:ml-0' ]">
            <div v-for="category in categories" :key="category.id" class="flex flex-col mx-10 xl:items-center">
                <div>
                    <p class="text-lg font-semibold tracking-wide">{{ category.name }}</p>
                    <div class="mt-2 flex flex-col gap-3">
                        <div v-for="link in category.links" :key="link?.id">
                            <NuxtLink :to="link?.type === 'link' ? link.link : link?.page?.slug" class="text-gray-600 no-underline hover:text-gray-950 ">
                                {{ link?.name }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>