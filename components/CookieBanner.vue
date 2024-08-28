<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Cookies from 'js-cookie';
  import ToggleSwitch from 'primevue/toggleswitch';

  // Define the toggle states
  const necessary = ref(true);
  const googleMap = ref(true);
  const showBanner = ref(false);

  onMounted(() => {
    const cookieValue = Cookies.get('cookiesAccepted');
    if (!cookieValue) {
      showBanner.value = true;
    } else {
      // Initialize toggle states based on cookie value
      const acceptedCookies = cookieValue.split(',');
      necessary.value = acceptedCookies.includes('necessary');
      googleMap.value = acceptedCookies.includes('googleMap');
    }
  });

  const acceptAll = () => {
    Cookies.set('cookiesAccepted', 'necessary,googleMap', { expires: 365 });
    refreshCookie("cookiesAccepted");
    showBanner.value = false;
  };

  const acceptSelected = () => {
    const selectedOptions = [];
    if (googleMap.value) selectedOptions.push('googleMap');
    
    Cookies.set('cookiesAccepted', `necessary,${selectedOptions.join(',')}`, { expires: 365 });
    showBanner.value = false;
  };

  const acceptNecessary = () => {
    Cookies.set('cookiesAccepted', 'necessary', { expires: 365 });
    showBanner.value = false;
  };
</script>

<template>
  <div v-if="showBanner" class="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-md py-4 lg:py-6">
    <div class="container max-w-8xl mx-auto px-4 py-4 flex flex-col lg:flex-row items-start lg:items-center">
      
      <div class="flex-1 lg:w-2/3 lg:pr-6 mb-4 lg:mb-0">
        <p class="text-base lg:text-lg font-semibold mb-2 lg:mb-4">Denne hjemmeside bruger cookies</p>
        <p class="text-sm lg:text-base mb-2">Vi bruger cookies til at integrere med Google Maps og for at give dig en mere personlig oplevelse på vores hjemmeside. Ved at klikke på 'Tillad alle' giver du dit samtykke til brugen af cookies til dette formål.</p>
        <p class="text-sm lg:text-base mb-4 lg:mb-6">Læs mere om vores <a href="/cookiepolitik" class="text-sky-900 underline">Cookiepolitik</a></p>
        
        <div class="flex flex-wrap gap-4 lg:gap-6"> 
          <!-- Google Map Switch -->
          <div class="flex items-center">
            <NuxtImg src="/images/googleMapsLogo.png" alt="Google Maps Logo" class="w-5 h-5 lg:w-6 lg:h-6 mr-2" />
            <label for="googleMap" class="text-sm lg:text-base text-gray-700 mr-2">Google Map</label>
            <ToggleSwitch
              id="googleMap" 
              v-model="googleMap"  
            />
          </div>

          <!-- Necessary Switch (Inactive) -->
          <div class="flex items-center">
            <label for="necessary" class="text-sm lg:text-base text-gray-700 mr-2">Nødvendig</label>
            <ToggleSwitch 
              id="necessary" 
              v-model="necessary" 
              disabled 
            />
          </div>
        </div>
      </div>

      <div class="flex-none lg:w-1/3 w-full">
        <div class="flex flex-col gap-2 w-full">
          <button @click="acceptAll" class="w-full bg-pinkoi-navy-900 text-white py-3 lg:py-4 transition-transform transform hover:scale-105 focus:scale-105 duration-300 rounded-md lg:rounded-md">
            Tillad alle
          </button>
          <button @click="acceptSelected" class="w-full bg-white border-2 border-pinkoi-navy-700 text-gray-600 py-3 lg:py-4 transition-transform transform hover:scale-105 focus:scale-105 duration-300 rounded-md lg:rounded-md">
            Tillad valgte
          </button>
          <button @click="acceptNecessary" class="w-full bg-white border-2 border-gray-400 text-gray-600 py-3 lg:py-4 transition-transform transform hover:scale-105 focus:scale-105 duration-300 rounded-md lg:rounded-md">
            Kun nødvendige
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <button @click="showBanner = true" class="fixed bottom-4 left-4 bg-gradient-to-r from-pinkoi-navy-900 via-sky-700 to-cyan-600 text-white py-2 px-2 rounded-full shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 13v.01M12 17v.01M12 12v.01M16 14v.01M11 8v.01m2.148-4.534l2.667 1.104a4 4 0 0 0 4.656 6.14l.053.132a3 3 0 0 1 0 2.296Q19.779 14.328 19.5 15q-.283.684-.66 2.216a3 3 0 0 1-1.624 1.623q-1.572.394-2.216.661q-.712.295-1.852 1.024a3 3 0 0 1-2.296 0Q9.649 19.77 9 19.5q-.707-.292-2.216-.66a3 3 0 0 1-1.623-1.624Q4.764 15.639 4.5 15q-.298-.718-1.024-1.852a3 3 0 0 1 0-2.296Q4.195 9.736 4.5 9q.257-.62.66-2.216a3 3 0 0 1 1.624-1.623Q8.331 4.777 9 4.5q.687-.285 1.852-1.024a3 3 0 0 1 2.296 0"/></svg>
  </button>
</template>





