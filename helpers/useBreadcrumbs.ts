import { computed } from "vue";
import { useRoute } from "vue-router";

export function useBreadcrumbs()
{
    const route = useRoute();
    const pages = computed(() =>
    {
        const pages = route.path.split("/").filter(page => page !== "").map(page => `/${page}`);
        let previousPage;
        const result = [];
        
        for(const page of pages)
        {
            const name = (page.charAt(1).toUpperCase() + page.slice(2)).replace(/-/g, " ");
            const href: string = !previousPage ? page : previousPage + page;

            result.push({ name: name, href: href, current: page === `/${route.params.slug}` });
            previousPage = href;
        }
        
        return result;
    });

    return { pages };
};