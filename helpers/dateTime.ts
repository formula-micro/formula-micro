export function getDate(published : any)
{
    const dateFormat: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(published);
    
    return date.toLocaleDateString(undefined, dateFormat).toLowerCase();
};

export function getTime(published : any)
{
    const timeFormat: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "numeric" };
    const date = new Date(published);
    
    return `${date.toLocaleTimeString(undefined, timeFormat).replace(".", ":")}`;
};