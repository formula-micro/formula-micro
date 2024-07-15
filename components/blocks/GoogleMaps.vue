<script setup lang="ts">
    import type { Google_Maps_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Google_Maps_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, has_padding } = toRefs(props.data);
</script>

<template>
    <div v-if="__typename === 'google_maps_blocks'" class="w-full px-6 xl:px-12">
        <div :class="[ has_padding ? 'py-4' : '', 'flex justify-center items-center w-full' ]">
            <div :class="[ width?.class, has_padding ? 'py-8 xl:py-16' : '', 'w-full' ]">
                <!-- TODO: Brug Maps Javascript API v3, da den ikke bruger cookies og da vi kan fjerne konkurrenter fra vores map. -->
                <div class="w-full h-96">
                    <div id="gmap-canvas" style="height:100%; width:100%;max-width:100%;">
                        <iframe style="height:100%;width:100%;border:0;" frameborder="0" src="https://www.google.com/maps/embed/v1/search?q=Formula+Micro+Bornholm+A/S,+Rabækkevej,+Rønne,+Danmark&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>