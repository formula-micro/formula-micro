<script setup lang="ts">
    import type { Google_Maps_Blocks } from "@/graphql/generated/graphql";
    import Cookies from 'js-cookie';
    import { ref, onMounted, watch } from 'vue';

    // Properties.
    interface Properties
    {
        data: Google_Maps_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, has_padding } = toRefs(props.data);
    const cookiesAccepted = useCookie("cookiesAccepted");

    //const cookiesAccepted = Cookies.get('cookiesAccepted');
    const showGoogleMaps = computed (() => cookiesAccepted.value? cookiesAccepted.value.split(',').includes('googleMap') : false);
    
</script>


<template>
    <div class="w-full px-6 xl:px-12">
      <div :class="[ has_padding ? 'py-4' : '', 'flex justify-center items-center w-full' ]">
        <div :class="[ width?.class, has_padding ? 'py-8 xl:py-16' : '', 'w-full' ]">
          <!-- Google Maps iframe -->
          <div v-if="showGoogleMaps" class="w-full h-96">
            <div id="gmap-canvas" style="height:100%; width:100%;max-width:100%;">
              <iframe style="height:100%;width:100%;border:0;" frameborder="0" src="https://www.google.com/maps/embed/v1/search?q=Formula+Micro+Bornholm+A/S,+Rabækkevej,+Rønne,+Danmark&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
            </div>
          </div>
          <!-- Placeholder content if Google Maps is not shown -->
          <div v-else class="relative w-full h-96">
            <img src="/images/googleMapsPlaceholder.jpg" alt="Placeholder Map" class="w-full h-full object-cover absolute inset-0"
            />
            <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <p class="text-white text-lg font-semibold text-center px-4">
                Du har ikke tilladt cookies, der gør det muligt at vise Google Maps. Opdater dine præferencer for at se kortet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>