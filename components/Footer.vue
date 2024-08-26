<script setup lang="ts">
    import { useFooterCategoriesQuery } from "@/graphql/generated/graphql";

    // Fields.
    const { data, error } = useFooterCategoriesQuery({ variables: {} });
    const errorMessage = ref<string|undefined>(undefined);
    watch(error, (value) => errorMessage.value = value?.message);
    const categories = computed(() => (data.value?.footer_categories));
    const gridColsXl = computed(() =>
    {
        const length = categories.value?.length;
        if (length === 3) return "2xl:grid-cols-3";
        if (length === 4) return "2xl:grid-cols-4";
        return "2xl:grid-cols-5"; 
    });
</script>

<template>
    <footer class="bg-white w-full py-8 xl:py-16 flex justify-center">
        <div :class="`grid grid-cols-2 lg:grid-cols-3 ${gridColsXl} gap-x-8 gap-y-12 w-full max-w-7xl px-7`">
            <div v-for="category in categories" :key="category.id" class="flex flex-col lg:mx-10">
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
    </footer>
</template>