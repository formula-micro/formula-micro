<script setup lang="ts">
    import { useFooterCategoriesQuery } from "@/graphql/generated/graphql";

     const { data, error } = await useFooterCategoriesQuery({ variables: {} });

    if (error.value) {
        console.error(error.value);
    }

    const categories = computed(() => {
        return data.value?.footer_categories;
    })
    

    const gridColsXl = computed(() => {
        const length = categories.value?.length;
        if (length === 3) return '2xl:grid-cols-3';
        if (length === 4) return '2xl:grid-cols-4';
        return '2xl:grid-cols-5'; 
    });


    
    // const links = ref([
    //     {
    //         id: "64ad4f78934f3b6d479aa42h",
    //         name: "Generelt",
    //         subLinks: [
    //             {
    //                 id: "64ag4f78934f3b6d479aa42h",
    //                 name: "Forside",
    //                 description: "",
    //                 href: "/",
    //                 icon: "tabler:phone"
    //             },
    //             {
    //                 id: "64ag4f78934f3b6d479aa42x",
    //                 name: "Cookiepolitik",
    //                 description: "",
    //                 href: "/",
    //                 icon: "tabler:phone"
    //             },
    //             {
    //                 id: "64ak4f78934f3b6d479aa42x",
    //                 name: "Privatlivspolitik",
    //                 description: "",
    //                 href: "/",
    //                 icon: "tabler:phone"
    //             },
    //             // {
    //             //     id: "64ag4f78934f3b6d479aa42x",
    //             //     name: "IT-Løsninger",
    //             //     description: "",
    //             //     href: "/",
    //             //     icon: "tabler:phone"
    //             // },
    //             // {
    //             //     id: "64ak4f78934f3b6d479aa42x",
    //             //     name: "Softwareløsninger",
    //             //     description: "",
    //             //     href: "/",
    //             //     icon: "tabler:phone"
    //             // },
    //             // {
    //             //     id: "64ax4f78934f3b6d479aa42x",
    //             //     name: "Kasseapparater",
    //             //     description: "",
    //             //     href: "/",
    //             //     icon: "tabler:phone"
    //             // },
    //             {
    //                 id: "64at4f78934f3b6d479aa42h",
    //                 name: "Blog",
    //                 description: "",
    //                 href: "/",
    //                 icon: "tabler:truck-delivery"
    //             },
    //             {
    //                 id: "64ah4f78934f3b6d479aa42h",
    //                 name: "Nyheder",
    //                 description: "",
    //                 href: "/nyheder",
    //                 icon: "tabler:lifebuoy"
    //             }
    //         ]
    //     },
    //     {
    //         id: "64ad4f78934f3b6d479aa48h",
    //         name: "Om os",
    //         subLinks: [
    //             {   
    //                 id: "64ad4h28934f3b6d479cc49a",
    //                 name: "Om Formula Micro",
    //                 description: "",
    //                 href: "/",
    //                 icon: "fluent:desk-24-regular"
    //             },
    //             {   
    //                 id: "64ar4h28934f3b6d479cc49a",
    //                 name: "Medarbejdere",
    //                 description: "",
    //                 href: "/",
    //                 icon: "ph:office-chair"
    //             },
    //             {   
    //                 id: "64at4h28934f3b6d479cs49a",
    //                 name: "Jobs",
    //                 description: "",
    //                 href: "/",
    //                 icon: "tabler:message-circle"
    //             }
    //         ]
    //     },
    //     {
    //         id: "64ad4f78934f3b6d479aa48h",
    //         name: "Kontakt",
    //         subLinks: [
    //             {
    //                 id: "64ag4f78934f3b6d479aa48h",
    //                 name: "Kontakt",
    //                 description: "",
    //                 href: "/",
    //                 icon: "tabler:phone"
    //             },
    //             {
    //                 id: "64at4f78934f3b6d479aa48h",
    //                 name: "Bestilling af toner og service",
    //                 description: "",
    //                 href: "/",
    //                 icon: "tabler:truck-delivery"
    //             },
    //             {
    //                 id: "64ah4f78934f3b6d479aa48h",
    //                 name: "Online IT support",
    //                 description: "",
    //                 href: "/",
    //                 icon: "tabler:lifebuoy"
    //             }
    //         ]
    //     },
    //     {
    //         id: "64ad4f78934f3b6d479aa48h",
    //         name: "Kontakt",
    //         subLinks: [
    //             {
    //                 id: "64ag4f78934f3b6d479aa48h",
    //                 name: "Kontakt",
    //                 description: "",
    //                 href: "/",
    //                 icon: "tabler:phone"
    //             },
    //             {
    //                 id: "64at4f78934f3b6d479aa48h",
    //                 name: "Bestilling af toner og service",
    //                 description: "",
    //                 href: "/",
    //                 icon: "tabler:truck-delivery"
    //             },
    //             {
    //                 id: "64ah4f78934f3b6d479aa48h",
    //                 name: "Online IT support",
    //                 description: "",
    //                 href: "/",
    //                 icon: "tabler:lifebuoy"
    //             }
    //         ]
    //     },
    //     {
    //         id: "64ad4f78934f3b6d4t9aa48h",
    //         name: "Sociale medier",
    //         subLinks: [
    //             {
    //                 id: "64ag4f7893tf3b6d479aa48h",
    //                 name: "LinkedIn",
    //                 description: "",
    //                 href: "/",
    //                 icon: "tabler:phone"
    //             },
    //             {
    //                 id: "64at4f7893tf3b6d479aa48h",
    //                 name: "Facebook",
    //                 description: "",
    //                 href: "/",
    //                 icon: "tabler:truck-delivery"
    //             }
    //         ]
    //     }
    // ]);
</script>

<template>
    <footer class="bg-white w-full py-8 xl:py-16 xl:mt-12 flex justify-center">
        <div :class="`grid grid-cols-2 lg:grid-cols-3 ${gridColsXl} gap-x-8 gap-y-12 w-full max-w-7xl px-7`">
            <div v-for="cat in categories" :key="cat.id" class="flex flex-col mx-10">
                <p class="text-lg font-semibold tracking-wide">{{ cat.name }}</p>
                <div class="mt-2 flex flex-col gap-3">
                    <div v-for="link in cat.links" :key="link?.id">
                        <NuxtLink :to="link?.type === 'link' ? link.link : link?.page?.slug" class="text-gray-600 no-underline hover:text-gray-950 ">
                            {{ link?.name }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>


<!--
<template>
    <footer class="bg-white w-full grid grid-cols-1 2xl:grid-cols-[1fr,2fr,1fr] justify-center items-center w-full py-8 xl:py-16 xl:mt-12">
        <div class="hidden lg:block" />

        <div class="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-10 w-full 2xl:min-w-7xl max-w-7xl py-8 px-7">
            <template v-for="link in links" :key="link.id">
                <template v-if="link.subLinks !== undefined">
                    <div class="px-3">
                        <p class="text-lg font-semibold tracking-wide">{{ link.name }}</p>

                        <div class="mt-2 flex flex-col gap-3">
                            <a v-for="subLink in link.subLinks" :key="subLink.id" :href="subLink.href" class="text-gray-900">
                                {{ subLink.name }}
                            </a>
                        </div>
                    </div>
                </template>
            </template>
        </div>

        <div class="hidden lg:block" />
    </footer>
</template>
-->