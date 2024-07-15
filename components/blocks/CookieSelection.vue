<script setup lang="ts">
    import type { Cookie_Selection_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Cookie_Selection_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, has_padding } = toRefs(props.data);
    const isNessecaryCookiesExpanded = ref(false);
    const enabled = ref(true);

    // Methods.
    const enter = (element : any) =>
    {      
        const { width, } = getComputedStyle(element);
        element.style.width = width;
        element.style.position = "absolute";
        element.style.visibility = "hidden";
        element.style.height = "auto";

        const { height, } = getComputedStyle(element);
        element.style.width = null;
        element.style.position = null;
        element.style.visibility = null;
        element.style.height = "0";

        // Force repaint to make sure the animation is triggered correctly.
        getComputedStyle(element).height;
        requestAnimationFrame(() => element.style.height = height);
    };

    const afterEnter = (element : any) =>
    {
        element.style.height = "auto";
    };

    const leave = (element : any) =>
    {
        const { height, } = getComputedStyle(element);
        element.style.height = height;

        // Force repaint to make sure the animation is triggered correctly.
        getComputedStyle(element).height;
        requestAnimationFrame(() => element.style.height = "0");
    };
</script>

<template>
    <div v-if="__typename === 'cookie_selection_blocks'" class="w-full px-6 xl:px-12">
        <div :class="[ has_padding ? 'py-4' : '', 'flex justify-center items-center w-full' ]">
            <div :class="[ width?.class, has_padding ? 'py-8 xl:py-16' : '', 'w-full prose ' ]">
                <h2 class="!font-semibold">Samtykke status</h2>
                <p>Du har her mulighed for at se dit aktuelle samtykke og mulighed for at ændre det.</p>

                <div>
                    <dl class="space-y-6 divide-y divide-gray-200">
                        <!-- Nessecary cookies -->
                        <div class="pt-6">
                            <dt class="flex justify-between text-sm">
                                <!-- Details button -->
                                <button type="button" @click="isNessecaryCookiesExpanded = !isNessecaryCookiesExpanded" class="text-base lg:text-lg text-left w-full flex items-start text-gray-400 focus-within:outline-none focus-within:underline focus-within:text-gray-900">
                                    <span class="flex items-center">
                                        <Icon name="tabler:chevron-down" :class="[ !isNessecaryCookiesExpanded ? 'rotate-0' : '-rotate-180', 'h-6 w-6 transition duration-300 ease-in-out transform' ]" />
                                    </span>
                                    <span class="ml-3 text-gray-900">
                                        Nødvendige cookies
                                    </span>
                                </button>

                                <HeadlessSwitch v-model="enabled" :disabled="true" class="relative inline-flex h-8 w-15 items-center rounded-full bg-green-600 opacity-60">
                                    <span class="sr-only">Nødvændige cookies er slået til</span>
                                    <span :class="enabled ? 'translate-x-5.5 xl:translate-x-7' : 'translate-x-0.5'" class="relative inline-block h-7 w-7 transform rounded-full bg-white transition">
                                        <span class="absolute inset-0 h-full w-full flex items-center justify-center">
                                            <Icon name="tabler:check" class="h-5 w-5 text-green-600" />
                                        </span>
                                    </span>
                                </HeadlessSwitch>
                            </dt>
                            <transition enter-active-class="ease-in duration-300"
                                        enter-class="opacity-0"
                                        enter-to-class="opacity-100"
                                        leave-active-class="ease-out duration-300"
                                        leave-class="opacity-100"
                                        leave-to-class="opacity-0"
                                        @enter="enter"
                                        @after-enter="afterEnter"
                                        @leave="leave">
                                <dd ref="nessecaryCookiesDetails" class="overflow-y-hidden" v-show="isNessecaryCookiesExpanded">
                                    <div class="mt-3" />
                                    <p class="">
                                        Vores hjemmeside bruger cookies for at kunne gemme dit cookie samtykke.
                                    </p>
                                </dd>
                            </transition>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>