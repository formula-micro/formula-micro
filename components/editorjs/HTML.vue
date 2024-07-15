<script setup lang="ts">
    interface Props
    {
        block: { type: string, data: { html: string }};
    }
    defineProps<Props>();
</script>

<template>
    <template v-if="block.type === 'raw'">
        <div v-html="block.data.html">
        </div>
    </template>
</template>