<script setup lang="ts">
    interface Props
    {
        block: { id: string, type: string, data: { style: string, items: { content: string }[] }};
    }
    defineProps<Props>();
</script>

<template>
    <ul v-if="block.type === 'nestedlist' && block.data.style === 'unordered'" class="ml-5 list-disc">
        <li v-for="(item, index) in block.data.items" :key="`list-${block.id}-${index}`" v-html="item.content" />
    </ul>
    <ol v-if="block.type === 'nestedlist' && block.data.style === 'ordered'" class="ml-5 list-decimal">
        <li v-for="(item, index) in block.data.items" :key="`list-${block.id}-${index}`" v-html="item.content" />
    </ol>
</template>