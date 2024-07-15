<script setup lang="ts">
    interface Props
    {
        block: { type: string, data: { text: string }};
    }
    defineProps<Props>();
</script>

<template>
    <p v-if="block.type === 'paragraph'" v-html="block.data.text" />
</template>