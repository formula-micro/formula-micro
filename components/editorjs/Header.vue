<script setup lang="ts">
    interface Props
    {
        block: { type: string, data: { level: number, text: string }};
    }
    defineProps<Props>();
</script>

<template>
    <template v-if="block.type === 'header'" class="prose">
        <component :is="`h${block.data.level}`"
                :class="{
                    'leading-relaxed' : true }"
        >
            <span v-html="block.data.text"></span>
        </component>
    </template>
</template>