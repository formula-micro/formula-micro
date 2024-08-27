export const useSearchStore = defineStore("search",
{
    state: () => 
    ({
        query: "",
        isDialogVisible: false,
    }),
    getters:
    {
        isDialogVisible() : boolean
        {
            return this.isDialogVisible;
        },
    },
    actions:
    {
        setQuery(query : string)
        {
            this.query = query;
        },
        showDialog()
        {
            this.isDialogVisible = true;
        },
        hideDialog()
        {
            this.isDialogVisible = false;
        }
    },
});