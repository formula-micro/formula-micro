<script setup lang="ts">
    import type { Banner_Hero_Blocks } from "@/graphql/generated/graphql";
    import { Splide, SplideTrack, SplideSlide } from "@splidejs/vue-splide";
    import { Video } from "@splidejs/splide-extension-video";
    import "@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css";
    import "@splidejs/vue-splide/css";

    // Properties.
    interface Properties
    {
        data: Banner_Hero_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, banners, autoplay, interval } = toRefs(props.data);
</script>

<template>
    <div v-if="__typename === 'banner_hero_blocks'" class="w-full px-6 xl:px-12">
        <div class="flex justify-center items-center w-full">
            <div :class="[ width?.class ]">
                <Splide :options="{ rewind: true, drag: banners ? banners.length > 1 : false, autoplay: autoplay, interval: interval, gap: '2rem', video: { playerOptions: { htmlVideo: { preload: 'auto' } } } }" :extensions="{ Video }" :has-track="false">
                    <!-- Play-Pause Toggle Button -->
                    <button v-if="autoplay" class="splide__toggle absolute bottom-1 left-1/2 -ml-20 lg:-ml-16 p-1 bg-white rounded-full z-10" type="button">
                        <span class="splide__toggle__play w-5 h-5"><Icon name="tabler:player-play-filled" class="block w-5 h-5" /></span>
                        <span class="splide__toggle__pause w-5 h-5"><Icon name="tabler:player-pause-filled" class="block w-5 h-5" /></span>
                    </button>
                    <SplideTrack>
                        <SplideSlide v-for="banner in banners" :key="banner?.id" :data-splide-html-video="banner?.image?.video_thumbnail ? 'https://cms.formula.nu/assets/' + banner?.image?.id : null">
                            <template v-if="banner?.image?.video_thumbnail">
                                <!-- Video Thumbnail -->
                                <NuxtImg :src="`https://cms.formula.nu/assets/${banner?.image?.video_thumbnail?.id}`" :width="banner?.image?.width > 1920 ? banner?.image?.width : 1920" :height="banner?.image?.height" alt="" format="webp" sizes="sm:100vw md:50vw lg:2560px" :class="[ 'object-cover object-center rounded-xl w-full min-h-md max-h-md sm:min-h-xl sm:max-h-xl xl:min-h-2xl xl:max-h-2xl', width.name === 'full' ? '3xl:min-h-5xl 3xl:max-h-5xl' : '' ]" />
                            </template>
                            <template v-else>
                                <!-- Image -->
                                <NuxtImg :src="`https://cms.formula.nu/assets/${banner?.image?.id}`" :width="banner?.image?.width > 1920 ? banner?.image?.width : 1920" :height="banner?.image?.height" alt="" format="webp" sizes="sm:100vw md:50vw lg:2560px" :class="[ 'object-cover object-center rounded-xl w-full min-h-md max-h-md sm:min-h-xl sm:max-h-xl xl:min-h-2xl xl:max-h-2xl', width.name === 'full' ? '3xl:min-h-5xl 3xl:max-h-5xl' : '' ]" />
                            </template>
                            
                            <div :class="[ banner?.overlay_color?.class, 'absolute inset-0 bg-opacity-35 rounded-xl' ]">
                                <div v-if="banner?.title && banner?.description" class="flex flex-col justify-center items-center w-full h-full">
                                    <div :class="['flex flex-col text-center xl:text-left w-full max-w-72 sm:max-w-lg', width.name === 'full' ? 'xl:max-w-7xl' : 'xl:max-w-5xl']">
                                        <h1 class="text-white font-bold text-2xl sm:text-4xl xl:text-6xl tracking-wide uppercase">{{ banner?.title }}</h1>
                                        <p class="mt-4 text-white font-medium sm:text-lg xl:text-2xl uppercase">{{ banner?.description }}</p>
                                        <div class="mt-8">
                                            <NuxtLink v-if="banner?.page?.slug" :to="`/${banner.page.slug}`" class="p-5 border-2 border-white text-sm sm:text-base hover:bg-white text-white hover:text-gray-900 transition transform duration-150 rounded-full font-semibold uppercase px-4.5 py-2.5">
                                                {{ banner?.text }}
                                            </NuxtLink>
                                            <!--<NuxtLink to="/" class="border-2 border-white text-sm sm:text-base hover:bg-white text-white hover:text-gray-900 transition transform duration-150 rounded-full font-semibold uppercase px-4.5 py-2.5">{{ banner?.button_text }}</NuxtLink>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SplideSlide>
                    </SplideTrack>

                    <div v-if="banners?.length > 1" class="xl:hidden absolute inset-x-0 bottom-0 mb-8 flex justify-center items-center">
                        <p class="text-white font-medium">Swipe for at skifte slide</p>
                    </div>

                    <div :class="[ banners?.length > 1 ? 'hidden xl:block' : 'hidden', 'splide__arrows' ]">
                        <button type="button" class="splide__arrow--prev absolute flex justify-center items-center rounded-full bg-white opacity-70 top-1/2 transform -translate-y-1/2 p-1.5">
                            <Icon name="tabler:arrow-left" class="h-5 w-5 text-gray-900" />
                        </button>

                        <button type="button" class="splide__arrow--next absolute flex justify-center items-center rounded-full bg-white opacity-70 top-1/2 transform -translate-y-1/2 p-1.5">
                            <Icon name="tabler:arrow-right" class="h-5 w-5 text-gray-900" />
                        </button>
                    </div>
                </Splide>
            </div>
        </div>
    </div>
</template>