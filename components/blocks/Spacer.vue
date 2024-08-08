<script setup lang="ts">
    import type { Spacer_Blocks } from "@/graphql/generated/graphql";

    // Properties.
    interface Properties
    {
        data: Spacer_Blocks;
    }
    const props = defineProps<Properties>();

    // Fields.
    const { __typename, height } = toRefs(props.data);
</script>

<template>
    <div :class="[ height?.class, 'w-full' ]" />
</template>