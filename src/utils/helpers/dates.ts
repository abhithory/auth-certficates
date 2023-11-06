export function formatDateTime(inputDate: string, locale: string = 'en-US'): string {
    const date = new Date(inputDate);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    const formatter = new Intl.DateTimeFormat(locale, options);
    const formattedDate = formatter.format(date);
    return formattedDate;
}