<script setup lang="ts">
    // Fields.
    const { $preview } = useNuxtApp(); 
    const previewData = ref({} as any);

    if ($preview && import.meta.client) {
        window.addEventListener("message", (event) =>
        {
            const { type, path, values } = event.data;
            if (type !== "directus-preview") return;
            previewData.value = event.data;
            console.log(event.data);
        }, false);
    }
</script>

<template>
    <div>
        {{ previewData }}
    </div>
</template>