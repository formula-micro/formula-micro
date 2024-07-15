<script setup lang="ts">
    import type { Disclosure_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Disclosure_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, width, has_padding, title, is_expanded_by_default, editor_js_content } = toRefs(props.data);
    const emit = defineEmits(["on-expanded", "on-collapsed"]);
    const internalIsExpanded = ref(is_expanded_by_default?.value ?? false);
    const overflowControl = ref("");
    
    // Methods.
    const onClick = () =>
    {
        internalIsExpanded.value = !internalIsExpanded.value;
        if (internalIsExpanded.value) emit("on-expanded");
        if (!internalIsExpanded.value) emit("on-collapsed");
    };

    const enter = (element : any) =>
    {      
        overflowControl.value = "overflow-hidden";

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
        overflowControl.value = "";
        element.style.height = "auto";
    };

    const leave = (element : any) =>
    {
        overflowControl.value = "overflow-hidden";

        const { height, } = getComputedStyle(element);
        element.style.height = height;

        // Force repaint to make sure the animation is triggered correctly.
        getComputedStyle(element).height;
        requestAnimationFrame(() => element.style.height = "0");
    };
</script>
 
<template>
    <div v-if="__typename === 'disclosure_blocks'" class="w-full px-6 xl:px-12">
        <div class="flex justify-center items-center w-full">
            <div :class="[ overflowControl, width?.class, 'w-full prose py-2' ]">               
                <button type="button" @click="onClick" :class="[ internalIsExpanded ? 'mb-6' : 'mb-2', 'w-full flex items-center justify-between group' ]">
                    <div class="flex flex-col">
                        <div class="w-full flex items-center mb-1">
                            <span class="flex items-center">
                                <Icon name="tabler:chevron-down" :class="[ internalIsExpanded ? '-rotate-180' : 'rotate-0', 'w-6 h-6 transition transform duration-300 ease-in-out text-gray-400 group-focus:text-gray-900' ]" />
                            </span>
                            <h2 class="ml-3 text-base font-bold text-gray-800 !mt-0 !mb-0">{{ title }}</h2>
                        </div>
                    </div>
                </button>

                <transition enter-active-class="ease-in duration-300"
                            enter-class="opacity-0"
                            enter-to-class="opacity-100"
                            leave-active-class="ease-out duration-300"
                            leave-class="opacity-100"
                            leave-to-class="opacity-0"
                            @enter="enter"
                            @after-enter="afterEnter"
                            @leave="leave">

                    <div v-show="internalIsExpanded">
                        <EditorjsEditorJS :blocks="editor_js_content?.blocks" />
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
    * {
      will-change: height;
      transform: translateZ(0);
      backface-visibility: hidden;
      perspective: 1000px;
    }
</style>