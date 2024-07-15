<script setup lang="ts">
    interface Props
    {
        block: { type: string, data: { text: string, caption: string }};
    }
    defineProps<Props>();
</script>

<template>
    <template  v-if="block.type === 'quote'">
        <div class="relative bg-gray-50 rounded-lg leading-relaxed p-5">
            <Icon name="tabler:quote" class="absolute top-0 left-0 mt-3 ml-3 w-5 h-5 text-gray-800"/>
            <p class="mt-3 ml-5 text-lg italic text-gray-700" v-html="block.data.text"></p>

            <div class="mt-2 ml-7 flex items-center">
                <Icon name="tabler:quote" class="w-5 h-5 text-gray-800"/>
                <p class="ml-2 text-gray-700" v-html="block.data.caption"></p>
            </div>
        </div>
    </template>
</template>