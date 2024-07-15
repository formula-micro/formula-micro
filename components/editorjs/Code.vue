<script setup lang="ts">
    interface Props
    {
        block: { type: string, data: { code: string }};
    }
    defineProps<Props>();
</script>

<template>
    <highlightjs v-if="block.type === 'code'" autodetect :code="block.data.code" class="rounded-lg overflow-hidden" />
</template>