export const shortenName = (name: string) => name.length > 9
    ? name.slice(0, 7) + '...'
    : name