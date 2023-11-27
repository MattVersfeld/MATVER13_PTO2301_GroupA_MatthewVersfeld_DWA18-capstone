// @ts-expect-error
export const dateUp = (x, y) => {
    x = new Date(x.updated),
        y = new Date(y.updated);
    return x - y;
}
// @ts-expect-error
export const dateDown = (x, y) => {
    x = new Date(x.updated),
        y = new Date(y.updated);
    return y - x;
}
// @ts-expect-error
export const titleDown = (a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA > titleB) {
        return -1;
    }
    if (titleA < titleB) {
        return 1;
    }
    return 0;
}
// @ts-expect-error
export const titleUp = (a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA < titleB) {
        return -1;
    }
    if (titleA > titleB) {
        return 1;
    }
}