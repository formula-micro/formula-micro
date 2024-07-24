import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
    devtools: { enabled: true },

    nitro: {
        compressPublicAssets: {
            brotli: true
        },
    },

    runtimeConfig: {
        url: process.env.URL,
        cmsUrl: process.env.CMS_URL,
    },

    modules: [
        "@nuxtjs/seo",
        "nuxt-meilisearch",
        "nuxt-headlessui",
        "@primevue/nuxt-module",
        "@nuxt/image",
        "@pinia/nuxt",
        "@vueuse/nuxt",
        "@vueuse/motion/nuxt",
        "@vee-validate/nuxt",
        "@nuxt/icon",
        "@nuxt/fonts",
        "@nuxtjs/tailwindcss"
    ],

    fonts: {
        families: [
            { name: "Plus Jakarta Sans", provider: "google" }
        ],
        defaults: {
            weights: [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ],
            styles: [ "normal", "italic" ],
            subsets: [
                "cyrillic-ext",
                "cyrillic",
                "greek-ext",
                "greek",
                "vietnamese",
                "latin-ext",
                "latin",
            ]
        }
    },

    image: {
        domains: [
            "cms.formula.nu",
            "formula-micro.dk",
            "localhost:3000"
        ]
    },

    primevue: {
        importTheme: { from: "@/themes/app-theme.ts" },
        options: {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: ".dark-mode",
                }
            }
        }
    },

    pinia: {
        autoImports: [
            "defineStore",
        ]
    },

    meilisearch: {
        hostUrl: "https://meilisearch.formula.nu/",
        searchApiKey: "lEgZN0c4YnW2xiL_qz9HcPg1PJCcjuMa4431QELxN1Q",
        instantSearch: true,
    },

    compatibilityDate: "2024-07-07",
});