<script setup lang="ts">
    interface Props
    {
        block: { type: string, data: { type: string, message: string }};
    }
    defineProps<Props>();
</script>

<template>
    <template v-if="block.type === 'alert' && block.data.type === 'info'">
        <!-- Information -->
        <div class="rounded-md bg-blue-50 p-4">
            <div class="flex items-center flex-wrap">
                <div class="flex items-center space-x-2">
                    <Icon name="tabler:info-square-rounded-filled" class="h-6 w-6 text-blue-400" />
                    <p class="!-mt-0.5 !mb-0 text-base font-bold text-blue-800">Information</p>
                </div>
                
                <p class="!-mt-0.5 !mb-0 ml-3 text-blue-800" v-html="block.data.message"></p>
            </div>
        </div>
    </template>

    <template v-if="block.type === 'alert' && block.data.type === 'warning'">
        <!-- Warning -->
        <div class="rounded-md bg-yellow-50 p-4">
            <div class="flex items-center">
                <Icon name="tabler:alert-square-rounded-filled" class="h-5 w-5 text-yellow-400" />

                <p class="!-mt-0.5 !mb-0 ml-3 text-yellow-700" v-html="block.data.message"></p>
            </div>
        </div>
    </template>

    <template v-if="block.type === 'alert' && block.data.type === 'success'">
        <!-- Success -->
        <div class="rounded-md bg-green-50 p-4">
            <div class="flex items-center">
                <Icon name="tabler:square-rounded-check-filled" class="h-5 w-5 text-green-400" />
                
                <p class="!-mt-0.5 !mb-0 ml-3 text-green-700" v-html="block.data.message"></p>
            </div>
        </div>
    </template>

    <template v-if="block.type === 'alert' && block.data.type === 'danger'">
        <!-- Danger -->
        <div v-if="block.type === 'alert' && block.data.type === 'danger'" class="rounded-md bg-red-50 p-4">
            <div class="flex items-center">
                <Icon name="tabler:square-rounded-x-filled" class="h-5 w-5 text-red-400" />

                <p class="!-mt-0.5 !mb-0 ml-3 text-red-700" v-html="block.data.message"></p>
            </div>
        </div>
    </template>
</template>