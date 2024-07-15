export const useSearchStore = defineStore("search",
{
    state: () => 
    ({
        query: "",
    }),
    getters:
    {
    },
    actions:
    {
        setQuery(query : string)
        {
            this.query = query;
        },
    },
});