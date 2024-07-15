<script setup lang="ts">
    interface Props
    {
        block: { type: string, data: { items: { checked: boolean, text: string }[] }};
    }
    defineProps<Props>();
</script>

<template>
    <template v-if="block.type === 'checklist'">
        <ul role="list" class="flex flex-col">
            <template v-for="(checkbox, index) in block.data.items" :key="`checkbox-${index}-${checkbox.text}`">
                <li class="flex items-center space-x-3">
                    <div class="inline-flex justify-center items-center rounded-full border-2 border-green-700 p-1">
                        <Icon v-if="checkbox.checked" name="tabler:check" class="h-4 w-4 text-green-700" />
                    </div>
                    <span v-html="checkbox.text"></span>
                </li>
            </template>
        </ul>
    </template>
</template>

<style scoped>
    .prose ul > li {
        padding-left: unset !important;;    
    }

    .prose >ul > li::before
    {
        content: none !important;
    }

    .prose > ul > li > *:first-child {
        margin-top: unset !important;
    }

    .prose > ul > li > *:last-child {
        margin-bottom: unset !important;
    }
</style>