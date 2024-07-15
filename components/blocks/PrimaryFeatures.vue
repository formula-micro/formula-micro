<script setup lang="ts">
    import { useScreenOrientation } from "@vueuse/core";

    // Properties.
    interface Properties
    {
        BackgroundImage: string;
    }
    defineProps<Properties>();

    const features = [
        {
            title: 'Payroll',
            description:
            "Keep track of everyone's salaries and whether or not they've been paid. Direct deposit not supported."
        },
        {
            title: 'Claim expenses',
            description:
            "All of your receipts organized into one place, as long as you don't mind typing in the data by hand."
        },
        {
            title: 'VAT handling',
            description:
            "We only sell our software to companies who don't deal with VAT at all, so technically we do all the VAT stuff they need."
        },
        {
            title: 'Reporting',
            description:
            'Easily export your data into an Excel spreadsheet where you can do whatever the hell you want with it.'
        },
    ];
    
    const selectedIndex = ref(0);

    const { orientation } = useScreenOrientation();
    console.log(orientation);
</script>

<template>
    <section id="features" class="relative overflow-hidden pb-28 pt-20 sm:py-32">
        <NuxtImg :src="BackgroundImage" class="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]" />

        <div class="relative">
            <div class="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
                <h2 class="font-display text-3xl tracking-tight sm:text-4xl md:text-5xl">Everything you need to run your books.</h2>
                <p class="mt-6 text-lg tracking-tight">
                    Well everything you need if you aren’t that picky about minor
                    details like tax compliance.
                </p>
            </div>

            <HeadlessTabGroup :selected-index="selectedIndex" vertical="true" as="div" class="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
                <div class="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                    <HeadlessTabList class="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                        <div v-for="(feature, featureIndex) in features" :class="[ selectedIndex === featureIndex ? 'bg-black lg:bg-black/10 lg:ring-1 lg:ring-inset lg:ring-white/10' : 'hover:bg-black/10 lg:hover:bg-black/5', 'group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6' ]">
                            <h3>
                                <HeadlessTab @click="selectedIndex = featureIndex" :class="[ selectedIndex === featureIndex ? '' : 'text-gray-600 hover:text-gray-600 lg:text-gray-600', 'font-display text-lg [&:not(:focus-visible)]:focus:outline-none' ]">
                                    <span class="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none">{{ feature.title }}</span>
                                </HeadlessTab>
                            </h3>
                            <p :class="[ selectedIndex === featureIndex ? '' : 'text-gray-400 group-hover:text-gray-900', 'mt-2 hidden text-sm lg:block' ]">
                                {{ feature.description }}
                            </p>
                        </div>
                    </HeadlessTabList>
                </div>

                <HeadlessTabPanels class="lg:col-span-7">
                    <HeadlessTabPanel v-for="feature in features" :key="feature.title">
                        <div class="relative sm:px-6 lg:hidden">
                            <div class="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-black/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                            <p class="relative mx-auto max-w-2xl text-base sm:text-center">
                                {{ feature.description }}
                            </p>
                        </div>

                        <div class="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                            <NuxtImg :src="BackgroundImage" class="w-full" />
                        </div>
                    </HeadlessTabPanel>
                </HeadlessTabPanels>
            </HeadlessTabGroup>
        </div>
    </section>
</template>