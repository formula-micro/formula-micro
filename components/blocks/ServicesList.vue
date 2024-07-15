<script setup lang="ts">
    import type { Services_List_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Services_List_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, background_color, width, has_padding, title, content, links_placement, links } = toRefs(props.data);
</script>

<template>
    <div v-if="__typename === 'services_list_blocks'" :class="[ background_color?.class !== 'bg-transparent' ? 'xl:px-12' : 'px-6 xl:px-12', 'w-full' ]">
        <div :class="[ background_color?.class, background_color?.class !== 'bg-transparent' ? 'text-white xl:rounded-xl px-6 xl:px-12 py-10' : 'py-8', 'flex justify-center items-center w-full' ]">
            <div :class="[ width?.class, has_padding ? 'py-8 xl:py-32' : '', 'grid w-full grid-cols-1 xl:grid-cols-[2fr,1fr,2fr] gap-x-8 gap-y-6 items-center' ]">
                <div :class="[ links_placement === 'right' ? '' : 'xl:order-3' ]">
                    <h2 class="text-3xl xl:text-5xl">{{ title }}</h2>
                    <div class="mt-5">
                        <div v-html="content" :class="[ background_color?.class !== 'bg-transparent' ? 'text-white' : '', 'prose' ]" />
                    </div>
                </div>

                <div/>

                <div :class="[ links_placement === 'right' ? '' : 'xl:-order-3', 'grid gap-y-5 sm:gap-y-8' ]">
                    <template v-for="(link, index) in links">
                        <NuxtLink :to="link?.item?.slug" class="inline-flex justify-between items-center hover:underline focus:underline outline-none group">
                            <span class="text-lg sm:text-2xl font-medium">{{ link?.item?.title }}</span>
                            <Icon name="tabler:arrow-right" class="h-5 w-5 sm:h-6 sm:w-6 transition transform duration-300 group-hover:scale-125 group-focus:scale-125" />
                        </NuxtLink>

                        <div v-if="index < links.length - 1" class="border-b border-gray-200" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>