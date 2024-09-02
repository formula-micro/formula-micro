<script setup lang="ts">
    // import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
    import { useFocus } from "@vueuse/core";

    // Fields.
    const cookieState = useCookie("cookieState", { maxAge: 31536000, watch: true });
    const necessary = ref(true);
    const googleMaps = ref(true);
    const isBannerVisible = ref(!cookieState.value);
    const acceptButton = ref();
    useFocus(acceptButton, { initialValue: true });

    watch(isBannerVisible, () =>
    {
        if (!cookieState.value) return;

        necessary.value = cookieState.value.includes('necessary');
        googleMaps.value = cookieState.value.includes('googleMaps');
    });

    // Methods.
    const acceptAll = () =>
    {
        cookieState.value = "necessary,googleMaps";
        refreshCookie("cookiesAccepted");
        isBannerVisible.value = false;
    };

    const acceptSelected = () =>
    {
        const selectedOptions = [];
        if (googleMaps.value) selectedOptions.push('googleMaps');
        
        cookieState.value = `necessary,${selectedOptions.join(',')}`;
        isBannerVisible.value = false;
    };

    const acceptNecessary = () =>
    {
        cookieState.value = "necessary";
        isBannerVisible.value = false;
    };
</script>

<template>
    <!-- Button to open cookiebanner -->
    <button @click="isBannerVisible = !isBannerVisible" class="fixed bottom-4 left-4 flex justify-center items-center bg-black text-white p-3 rounded-full shadow-lg hover:scale-110 focus:scale-110 transform duration-150">
        <Icon name="tabler:cookie" class="w-5 h-5 lg:w-6 lg:h-6" />
    </button>

    <!-- Cookiebanner -->
    <div v-if="isBannerVisible" v-motion-slide-bottom
        class="fixed bottom-0 left-0 right-0 mx-auto my-0 sm:my-[3.75rem] md:mx-[3.75rem] w-full sm:max-w-lg bg-white shadow-xl border border-gray-200 sm:rounded-lg p-7">

        <!-- Information -->
        <div class="prose !text-sm 2xl:!text-base">
            <h2 class="text-base 2xl:text-lg">Denne hjemmeside bruger cookies</h2>
            <p>Vi bruger cookies til at integrere med Google Maps og for at give dig en mere personlig oplevelse på vores hjemmeside. Ved at klikke på 'Tillad alle' giver du dit samtykke til brugen af cookies til dette formål.</p>
            <NuxtLink to="/cookiepolitik">Læs mere i vores Cookiepolitik</NuxtLink>
        </div>

        <!-- Options -->
        <div class="mt-12 grid text-sm 2xl:text-base text-gray-700">
            <!-- Google Maps -->
            <div class="inline-flex justify-between items-center max-w-md">
                <div class="inline-flex items-center w-full space-x-2">
                    <NuxtImg src="/images/googleMapsLogo.png" alt="Google Maps Logo" class="w-5 h-5 lg:w-6 lg:h-6" />
                    <label for="googleMaps">Google Maps</label>
                </div>

                <button id="googleMaps" type="button" @click="googleMaps = !googleMaps" :class="[ googleMaps ? 'bg-black' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2' ]" role="switch" aria-checked="false">
                    <span class="sr-only">Tillad Google Maps</span>
                    <span aria-hidden="true" :class="[ googleMaps ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-150 ease-in-out' ]"></span>
                </button>
            </div>

            <Divider />

            <!-- Nessecary -->
            <div class="inline-flex justify-between items-center max-w-md">
                <div class="inline-flex items-center w-full space-x-2">
                    <Icon name="tabler:alert-square-rounded-filled" class="w-6 h-6 lg:w-[1.6rem] lg:h-[1.6rem] text-gray-900" />
                    <label for="necessary">Nødvendig</label>
                </div>
                
                <button id="necessary" type="button" disabled class="opacity-50 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-black transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" role="switch" aria-checked="false">
                    <span class="sr-only">Tillad nødvændige cookies</span>
                    <span aria-hidden="true" class="'pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-150 ease-in-out"></span>
                </button>
            </div>
        </div>

        <!-- Buttons -->
        <div class="mt-8 grid gap-3">
            <Button label="Tillad alle" type="button" @click="acceptAll" ref="acceptButton" pt:root="text-sm 2xl:text-base" />
            <Button label="Tillad valgte" type="button" @click="acceptSelected" outlined pt:root="text-sm 2xl:text-base" />
            <Button label="Kun nødvændige" type="button" @click="acceptNecessary" outlined pt:root="text-sm 2xl:text-base" />
        </div>
    </div>
</template>