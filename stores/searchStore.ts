export const useSearchStore = defineStore("search",
{
    state: () => 
    ({
        _query: "",
        _isDialogVisible: false,
    }),
    getters:
    {
        query() : string
        {
            return this._query;
        },
        isDialogVisible() : boolean
        {
            return this._isDialogVisible;
        },
    },
    actions:
    {
        setQuery(query : string)
        {
            this._query = query;
        },
        showDialog()
        {
            this._isDialogVisible = true;
        },
        hideDialog()
        {
            this._isDialogVisible = false;
        }
    },
});