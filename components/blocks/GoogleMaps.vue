<script setup lang="ts">
    import type { Google_Maps_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Google_Maps_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { width, has_vertical_padding, has_horizontal_padding } = toRefs(props.data);
    const cookieState = useCookie("cookieState");
    const isGoogleMapsVisible = computed (() => cookieState.value ? cookieState.value.split(',').includes('googleMaps') : false);
</script>


<template>
    <div :class="[ has_vertical_padding ? 'py-8' : '', has_horizontal_padding ? 'xl:px-12' : '','flex justify-center items-center w-full' ]">
        <div :class="[ width?.class, has_horizontal_padding ? 'px-6 xl:px-0' : '', 'w-full' ]">
            <!-- Google Maps -->
            <div v-if="isGoogleMapsVisible" class="w-full h-96 rounded-lg">
                <div id="gmap-canvas" style="height:100%; width:100%;max-width:100%;">
                    <iframe style="height:100%;width:100%;border:0;border-radius: 8px;" frameborder="0" src="https://www.google.com/maps/embed/v1/search?q=Formula+Micro+Bornholm+A/S,+Rabækkevej,+Rønne,+Danmark&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                </div>
            </div>
            <!-- Placeholder -->
            <div v-else class="relative w-full h-96 rounded-lg">
                <NuxtImg src="/images/googleMapsPlaceholder.jpg" alt="Placeholder Map" class="w-full h-full object-cover absolute inset-0" />
                <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                    <p class="text-white text-lg font-semibold text-center px-4">
                        Du har ikke tilladt cookies, der gør det muligt at vise Google Maps. Opdater dine præferencer for at se kortet.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>