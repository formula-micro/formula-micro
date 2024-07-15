<script setup lang="ts">
    interface Props
    {
        block: { type: string, data: { file: { url: string } }};
    }
    defineProps<Props>();
</script>

<template>
    <template v-if="block.type === 'image'">
        <NuxtImg :src="`https://cms.formula.nu${block.data.file.url}`" loading="lazy" format="webp" sizes="sm:640px md:768px lg:1920px" width="1920" height="1080" aria-hidden="true" role="presentation" class="object-contain" />
    </template>
</template>