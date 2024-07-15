// https://nuxt.com/docs/api/configuration/nuxt-config
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

  modules: ["@nuxtjs/seo", ["@nuxtjs/google-fonts",
  {
      display: "swap",
      families: {
          Lexend: [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ],
          Poppins: [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ],
          "Plus Jakarta Sans": [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ],
      },
  }], "nuxt-meilisearch", "nuxt-headlessui", "nuxt-windicss", "@nuxt/image", "@pinia/nuxt", "@vueuse/nuxt", "@vueuse/motion/nuxt", "@vee-validate/nuxt", "@nuxt/icon"],

  image: {
      domains: [
          "cms.formula.nu",
          "formula-micro.dk"
      ]
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