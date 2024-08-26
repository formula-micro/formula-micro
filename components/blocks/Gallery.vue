<script setup lang="ts">
    import type { Gallery_Blocks } from "@/graphql/generated/graphql";
    import Lightgallery from "lightgallery/vue/LightGalleryVue.umd";
    import lgThumbnail from "lightgallery/plugins/thumbnail/lg-thumbnail.umd";
    import lgZoom from "lightgallery/plugins/zoom/lg-zoom.umd";
    import lgVideo from "lightgallery/plugins/video/lg-video.umd";
    import "lightgallery/css/lightgallery.css";
    import "lightgallery/css/lg-thumbnail.css";
    import "lightgallery/css/lg-zoom.css";
    import "lightgallery/css/lg-video.css";
    import { useHeadingClass } from "@/helpers/useHeadingClass";

    // Properties.
    interface Properties
    {
        data: Gallery_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const plugins = [ lgThumbnail, lgZoom, lgVideo ];
    const { __typename, width, has_vertical_padding, has_horizontal_padding, title, show_title, images } = toRefs(props.data);
    const pictures = computed(() => images?.value?.map(image => image?.directus_files_id) ?? []);
    const paragraphClass = "class=\"!text-base\"";

    // Methods.
    const getVideoData = (pic : any) => '{ "source": [ { "src": "https://cms.formula.nu/assets/' + pic?.id + '", "type": "video/mp4" } ], "attributes": { "preload": false, "controls": true } }';

    const { headingClass } = useHeadingClass();
</script>

<template>
    <div class="w-full">
        <div :class="[ has_vertical_padding ? 'py-8' : '', 'flex justify-center items-center w-full xl:px-12' ]">
            <div :class="[ width?.class, has_horizontal_padding ? 'px-6' : 'px-6 xl:px-0', 'w-full' ]">
                <h2 v-if="show_title" :class="headingClass, 'text-2xl font-semibold mb-5'">{{ title }}</h2>

                <Lightgallery :settings="{ mode: 'lg-slide', download: false, plugins }" :class="[ 'w-full grid grid-cols-5 items-center gap-6' ]">
                    <template v-for="pic in pictures" :key="pic!.id" class="w-1/5">
                        <a v-if="!pic?.video_thumbnail" :alt="`Link til at vise billede '${pic?.title}'`" :href="`https://cms.formula.nu/assets/${pic!.id}`" :data-sub-html="pic?.description ? `<p ${paragraphClass}>${pic?.description}</p>` : ''">
                            <NuxtImg :src="`https://cms.formula.nu/assets/${pic?.id}`" sizes="sm:500px" width="240" height="140" class="object-contain" :alt="pic?.title" />
                        </a>

                        <button type="button" v-if="pic?.video_thumbnail" :data-video="getVideoData(pic)" :data-sub-html="pic?.description ? `<p ${paragraphClass}>${pic?.description}</p>` : ''" class="relative">
                            <NuxtImg :src="`https://cms.formula.nu/assets/${pic?.video_thumbnail?.id}`" sizes="sm:500px" width="240" height="140" class="object-contain" :alt="pic?.title" />
                            
                            <div class="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
                                <Icon name="tabler:player-play-filled" class="w-8 h-8 text-white" />
                            </div>

                            <span class="sr-only">{{ `Link til at vise video '${pic?.title}'` }}</span>
                        </button>
                    </template>
                </Lightgallery>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .lg-sub-html p {
        font-size: unset;
    }
</style>