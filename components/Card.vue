<script setup lang="ts">
    // Props.
    interface Props
    {
        Published?: string;
        Title: string;
        Summary: string;
        BackgroundImage: string;
        // BackgroundImageIsLight?: boolean;
        Link: string;
        Tags: string[];
        Size: "sm" | "md" | "lg";
    }
    const { Published } = defineProps<Props>();

    // Fields.
    const publishedDate = computed(() =>
    {
        const dateFormat = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(Published);
        
        return `${useStartCase(useToLower((date.toLocaleDateString(undefined, dateFormat))))}`;
    });

    const publishedTime = computed(() =>
    {
        const timeFormat = { hour: "numeric", minute: "numeric" };
        const date = new Date(Published);
        
        return `${date.toLocaleTimeString(undefined, timeFormat).replace(".", ":")}`;
    });
</script>

<template>
    <NuxtLink :to="Link" :class="[ Size === 'lg' ? 'max-w-lg xl:max-w-xl' : 'max-w-sm', 'group flex flex-col flex-none transition transform hover:scale-95 duration-300' ]">
        <NuxtImg :class="[ Size === 'lg' ? 'min-h-xs max-h-xs' : 'min-h-52 max-h-52', 'object-cover rounded-lg w-full' ]" :src="`${BackgroundImage}`" alt="" format="webp" sizes="sm:512px md:1024px" loading="lazy" />

        <div class="h-full flex flex-col justify-between py-6">
            <div>
                <p class="text-sm font-semibold" v-if="Published">{{ publishedDate }} • {{ publishedTime }}</p>
                <p class="text-2xl font-bold max-w-sm">{{ Title }}</p>
                <div class="mt-2 line-clamp-3 prose" v-html="Summary" />
            </div>

            <div class="mt-3.5 flex flex-row flex-wrap gap-2">
                <p v-for="tag in Tags" :key="tag" class="rounded-full border border-gray-400 text-sm font-semibold px-3 py-0.5">{{ tag }}</p>
            </div>
        </div>
    </NuxtLink>
</template>