<script setup lang="ts">
    interface Props
    {
        block: { type: string, data: { withHeadings: boolean, content: string[][] }};
    }
    const { block } = defineProps<Props>();
    
    const contentWithHeadings = computed(() => block.data.content);
    const contentWithoutHeadings = computed(() => block.data.content.slice(1, block.data.content.length));
    const columnsCount = computed(() => block.data.content[0]?.length ?? 0);
</script>

<template>
    <div v-if="block.type === 'table'" class="overflow-x-auto">
        <table v-if="block.data.withHeadings" class="text-lg text-left border border-black !mt-0 !mb-0">
            <tr>
                <th v-for="column in columnsCount" class="border border-black px-3 py-1">
                    {{ block.data.content[0][column - 1] }}
                </th>
            </tr>

        <tr v-for="row in contentWithoutHeadings.length" class="border border-black">
                <td v-for="column in columnsCount" class="border border-black px-3 py-1">
                    <span v-html="contentWithoutHeadings[row - 1][column - 1]"></span>
                </td>
            </tr>
        </table>

        <table v-if="!block.data.withHeadings" class="text-lg text-left border border-black !mt-0 !mb-0">
            <tr v-for="row in contentWithHeadings.length" class="border border-black">
                <td v-for="column in columnsCount" class="border border-black px-3 py-1">
                    <span v-html="contentWithHeadings[row - 1][column - 1]"></span>
                </td>
            </tr>
        </table>
    </div>
</template>