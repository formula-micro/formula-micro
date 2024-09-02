<script setup lang="ts">
    import type { Navigation_Menu_Items } from "@/graphql/generated/graphql";
    import { useNavigationMenuQuery } from "@/graphql/generated/graphql";

    // Fields.
    const isMobileMenuVisible = ref(false);
    const activeLink = ref<any>(undefined);
    const { data: navigationMenuData } = await useNavigationMenuQuery({ variables: { } });
    const links = computed(() => navigationMenuData.value?.navigation_menu?.links?.filter(link => link?.status === "published") as Navigation_Menu_Items[] ?? [] as Navigation_Menu_Items[]);

    // Methods.
    const onMobileMenuClose = () =>
    {
        activeLink.value = undefined;
        isMobileMenuVisible.value = false;   
    };

    const getIconName = (filename_download : string|undefined) => filename_download?.replace("_", ":").replace(".svg", "") ?? ""; 
</script>

<template>
    <!-- Skip to content button -->
    <a href="#main-content" class="bg-white border border-black text-black px-4 py-2 focus:underline sr-only focus:not-sr-only">Spring til hovedindhold</a>

    <div class="mt-2 hidden 3xl:flex justify-center items-center w-full z-50">
        <div class="grid grid-cols-[1fr,2fr,1fr] justify-center items-center w-full">
            <NuxtLink to="/" class="-mb-0.5 ml-12 z-50 w-min focus-visible:outline-none">
                <NuxtImg src="https://formula-micro.dk/wp-content/uploads/2019/04/FM-logo-flad-300x43.png" class="object-scale-down max-w-50" sizes="sm:300px" width="300" height="43" alt="Formula Micro logo" />
            </NuxtLink>

            <div class="relative flex justify-between items-center w-full min-w-7xl max-w-7xl px-7">
                <template v-for="link in links" :key="link.id">
                    <template v-if="link?.type === 'link' || link?.type === 'page'">
                        <NuxtLink :to="link.type === 'link' ? link.link : link.page?.slug" class="text-sm font-medium text-gray-900 py-8 px-3 lg:px-4 z-50 focus-visible:outline-none">{{ link.text }}</NuxtLink>
                    </template>

                    <template v-if="link?.type === 'menu'">
                        <HeadlessPopoverGroup>
                            <HeadlessPopover v-slot="{ open, close }">
                                <HeadlessPopoverButton class="inline-flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-900 px-3 lg:px-4 py-8 focus-visible:outline-none">
                                    <span class="sr-only">Udvid</span>
                                    <span class="z-50">{{ link.text }}</span>
                                    <Icon name="tabler:chevron-down" class="h-5 w-5" aria-hidden="true" role="presentation" :class="{ 'z-50 transition transform duration-150': true, '-rotate-180 ': open }" />
                                </HeadlessPopoverButton>

                                <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 -translate-y-1/3" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-1">
                                    <HeadlessPopoverPanel class="absolute inset-x-0 top-0 z-40 bg-white pt-16 rounded-lg shadow-lg ring-1 ring-gray-900/5">
                                        <div class="grid grid-cols-1">
                                            <div class="grid max-w-7xl grid-cols-1 gap-2 px-6 py-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0 sm:py-10 lg:grid-cols-4 lg:gap-4 lg:px-8 xl:gap-8">
                                                <div v-for="subLink in link.subitems" :key="subLink?.id" class="group relative -mx-3 flex gap-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 sm:flex-col sm:p-6">
                                                    <div class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                        <Icon :name="getIconName(subLink?.icon?.filename_download)" class="h-6 w-6 text-gray-600 group-hover:text-black" aria-hidden="true" role="presentation" />
                                                    </div>
                                                    <div>
                                                        <NuxtLink :to="subLink?.type === 'link' ? subLink.link : `/${subLink?.page?.slug}`" @click="close" class="font-semibold text-gray-900">
                                                            {{ subLink?.title }}
                                                            <span class="absolute inset-0" />
                                                        </NuxtLink>
                                                        <p class="mt-1 text-gray-600" v-if="subLink?.description !== undefined">{{ subLink.description }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="bg-gray-50 rounded-b-lg">
                                            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                                <div class="grid grid-cols-1 divide-y divide-gray-900/5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-x sm:border-gray-900/5">
                                                    <NuxtLink v-for="item in link.calls_to_action" :key="item?.id" :to="item?.type === 'link' ? item?.link : `/${item?.page?.slug}`" class="flex items-center gap-x-2.5 p-3 px-6 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 sm:justify-center sm:px-0">
                                                        <Icon :name="getIconName(item?.icon?.filename_download)" class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" role="presentation" />
                                                        {{ item?.text }}
                                                    </NuxtLink>
                                                </div>
                                            </div>
                                        </div>
                                    </HeadlessPopoverPanel>
                                </transition>
                            </HeadlessPopover>
                        </HeadlessPopoverGroup>
                    </template>
                </template>
            </div>

            <div class="flex justify-end">
                <Search />
            </div>
        </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="flex 3xl:hidden justify-center items-center w-full z-50">
        <div class="flex justify-between items-center w-full px-6 xl:px-12">
            <NuxtLink to="/" class="-mb-0.5 z-50 w-min focus-visible:outline-none">
                <NuxtImg src="https://formula-micro.dk/wp-content/uploads/2019/04/FM-logo-flad-300x43.png" class="object-scale-down max-w-46" sizes="sm:300px" width="300" height="43" alt="Formula Micro logo" />
            </NuxtLink>

            <div class="flex space-x-5 py-6 md:py-8">
                <Search />
                
                <button type="button" class="inline-flex justify-center items-center" @click="isMobileMenuVisible = true">
                    <Icon name="ci:hamburger" class="h-7 w-7 text-gray-800" />
                    <span class="sr-only">Menu</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu -->
    <HeadlessTransitionRoot :show="isMobileMenuVisible" as="template" appear>
        <HeadlessDialog as="div" class="relative z-60" :open="true" @close="onMobileMenuClose">
            <HeadlessTransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity" />
            </HeadlessTransitionChild>

            <div class="fixed inset-0 md:right-0 md:top-0 md:bottom-0 md:left-1/3 lg:left-1/2 z-60 overflow-y-auto">
                <HeadlessTransitionChild as="template" enter="ease-out duration-300" enter-from="translate-x-full" enter-to="translate-x-0" leave="ease-in duration-200" leave-from="translate-x-0" leave-to="translate-x-full">
                    <HeadlessDialogPanel class="mx-auto h-full transform overflow-hidden rounded-tl-3xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all px-5">
                        <div class="flex justify-between items-center w-full pt-5">
                            <NuxtLink to="/" class="-mb-0.5 z-50 w-min focus-visible:outline-none">
                                <NuxtImg src="https://formula-micro.dk/wp-content/uploads/2019/04/FM-logo-flad-300x43.png" class="object-scale-down max-w-46" sizes="sm:300px" width="300" height="43" alt="Formula Micro logo" />
                            </NuxtLink>

                            <button type="button" @click="isMobileMenuVisible = false" class="inline-flex justify-center items-center bg-gray-100 rounded-full p-1">
                                <Icon name="mdi:close" class="h-5 w-5 text-gray-800 p-0.5" />
                            </button>
                        </div>

                        <div class="mt-20 flex flex-col w-full h-full justify-start items-start">
                            <button type="button" v-if="activeLink !== undefined" @click="activeLink = undefined" class="inline-flex items-center space-x-4 mb-4" v-motion-slide-right>
                                <span class="inline-flex justify-center items-center bg-gray-100 rounded-full w-9 h-9">
                                    <Icon name="tabler:arrow-left" class="h-5 w-5" aria-hidden="true" role="presentation" />
                                </span>
                                <span class="text-lg font-medium text-gray-900 py-2">{{ activeLink.text }}</span>
                            </button>

                            <template v-if="!activeLink" v-for="link in links" :key="link.id">
                                <template v-if="link?.type === 'link' || link?.type === 'page'">
                                    <NuxtLink :to="link?.type === 'link' ? link?.link : link?.page?.slug" class="text-2xl font-medium text-gray-900 py-2 z-50 focus-visible:outline-none" >{{ link.text }}</NuxtLink>
                                </template>

                                <template v-if="link?.type === 'menu'">
                                    <button type="button" @click="activeLink = link" class="text-2xl font-medium text-gray-900 py-2 z-50 focus-visible:outline-none" >{{ link.text }}</button>
                                </template>
                            </template>

                            <template v-if="activeLink" v-for="link in activeLink?.subitems" :key="link.id">
                                <template v-if="link?.type === 'link' || link?.type === 'page'">
                                    <NuxtLink :to="link?.type === 'link' ? link?.link : link?.page?.slug" class="text-2xl font-medium text-gray-900 py-2 z-50 focus-visible:outline-none" >{{ link.title }}</NuxtLink>
                                </template>

                                <template v-if="link?.type === 'menu'">
                                    <button type="button" @click="activeLink = link" class="text-2xl font-medium text-gray-900 py-2 z-50 focus-visible:outline-none" >{{ link.text }}</button>
                                </template>
                            </template>
                        </div>
                    </HeadlessDialogPanel>
                </HeadlessTransitionChild>
            </div>
        </HeadlessDialog>
    </HeadlessTransitionRoot>
</template>