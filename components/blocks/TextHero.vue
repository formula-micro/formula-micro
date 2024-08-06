<script setup lang="ts">
    import { breakpointsTailwind } from "@vueuse/core";
    import type { Text_Hero_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Text_Hero_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, background_color, width, has_vertical_padding, illustration_type, image, icon, title, content } = toRefs(props.data);
    const iconName = computed(() => icon?.value?.filename_download.replace("_", ":").replace(".svg", "") ?? "");
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const mdAndSmaller = breakpoints.smallerOrEqual("md");
    const isLg = breakpoints.between("md", "lg");
    const getImageWidth = (image : any) => image?.value?.width ?? (mdAndSmaller.value ? 48 : (isLg.value ? 64 : 80));
    const getImageHeight = (image : any) => image?.value?.height ?? (mdAndSmaller.value ? 48 : (isLg.value ? 64 : 80));
</script>

<template>
    <div v-if="__typename === 'text_hero_blocks'" :class="[ background_color?.class, width?.class, has_vertical_padding ? 'mb-8 xl:mb-16' : '', 'xl:rounded-xl w-full flex flex-col justify-center items-center text-center py-32 xl:py-42 px-3 lg:px-0' ]">
        <Icon v-if="illustration_type === 'icon' && icon" :name="iconName" class="w-20 h-20 text-white" />

        <div v-if="illustration_type === 'image' && image" class="bg-white rounded-xl shadow-md p-3">
            <NuxtImg :src="`https://cms.formula.nu/assets/${image.id}`" :width="getImageWidth(image)" :height="getImageHeight(image)" alt="" sizes="sm:512px" :class="[ 'object-contain lg:min-h-20 max-h-20' ]" />
        </div>
        
        <h1 class="mt-6 text-2xl xl:text-5xl font-bold tracking-wide !leading-tight max-w-6xl text-white">{{ title }}</h1>
        <div class="mt-10 xl:text-2xl text-blue-50 max-w-5xl" v-html="content" />
    </div>
</template>