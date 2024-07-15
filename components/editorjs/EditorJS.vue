<script setup lang="ts">
    // Properties.
    interface Properties
    {
        blocks: any[];
    }
    defineProps<Properties>();
</script>

<template>
    <template v-for="(block, index) in blocks" :key="index">
        <EditorjsAlert :block="block" />

        <EditorjsChecklist :block="block" />

        <EditorjsHeader :block="block" />

        <EditorjsImage :block="block" />

        <EditorjsNestedList :block="block" />

        <EditorjsParagraph :block="block" />

        <EditorjsQuote :block="block" />

        <EditorjsCode :block="block" />

        <EditorjsTable :block="block" />

        <EditorjsHTML :block="block" />
    </template>
</template>