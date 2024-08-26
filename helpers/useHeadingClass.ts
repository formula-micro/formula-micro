import { computed } from "vue";
import { useRoute } from "vue-router";

export function useHeadingClass()
{
    const route = useRoute();
    const headingClass = computed(() => (route.path === "/" ? "text-3xl xl:text-5xl xl:font-normal mb-5" : ""));
    return { headingClass };
};