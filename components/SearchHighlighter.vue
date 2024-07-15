<script setup lang="ts">
    import { onMounted } from "vue";
    import Mark from "mark.js";

    // Properties.
    interface Properties
    {
        query: string;
    }
    const props = defineProps<Properties>();
    const { query } = toRefs(props);

    // Fields.
    const highlightContainer = ref<HTMLElement|null>(null);
    const instance = ref<Mark|null>(null);

    // Events.
    watch(query, () =>
    {
        instance.value?.unmark();
        instance.value?.mark(query.value);
    });
    
    onMounted(() =>
    {
        instance.value = new Mark(highlightContainer.value);
        instance.value?.mark(query.value);
    })
</script>

<template>
    <div ref="highlightContainer" class="flex flex-col items-center w-full h-full">
        <slot />
    </div>
</template>