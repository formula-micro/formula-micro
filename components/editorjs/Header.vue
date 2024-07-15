<script setup lang="ts">
    interface Props
    {
        block: { type: string, data: { level: number, text: string }};
    }
    defineProps<Props>();
</script>

<template>
    <template v-if="block.type === 'header'">
        <component :is="`h${block.data.level}`"
                :class="{
                    'text-4xl' : block.data.level === 1,
                    'text-2xl xl:text-3xl' : block.data.level === 2,
                    'text-xl xl:text-2xl' : block.data.level === 3,
                    'text-lg xl:text-xl' : block.data.level === 4,
                    'text-base xl:text-lg' : block.data.level === 5,
                    'text-sm xl:text-base' : block.data.level === 6,
                    '!font-semibold tracking-wide leading-relaxed' : true }"
        >
            <span v-html="block.data.text"></span>
        </component>
    </template>
</template>