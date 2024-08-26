import { cacheExchange, fetchExchange, ssrExchange } from "@urql/core";
import { createClient } from "@urql/vue";

export default defineNuxtPlugin(nuxt =>
{
    const SSR_KEY = "urql";

    const ssr = ssrExchange(
    {
        isClient: import.meta.client,
        initialState: import.meta.client ? nuxt.payload[SSR_KEY] : undefined,
    });

    // When app has been rendered on the server, send SSR state to client.
    if (import.meta.server) nuxt.hook("app:rendered", () => nuxt.payload[SSR_KEY] = ssr.extractData());

    const urql = createClient(
    {
        url: "https://cms.formula.nu/graphql",
        exchanges:
        [
            cacheExchange,
            ssr,
            fetchExchange,
        ],
        fetchOptions: () =>
        {
            return {
                headers: { authorization: "Bearer KUzicFZBjbbSYjUpjds1ss4EpuFkoXwE" },
            };
        },
    });

    nuxt.provide("urql", urql);
    nuxt.vueApp.provide("$urql", ref(urql));
});