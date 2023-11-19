export const dateUp = (x, y) => {
    x = new Date(x.updated),
        y = new Date(y.updated);
    return x - y;
}

export const dateDown = (x, y) => {
    x = new Date(x.updated),
        y = new Date(y.updated);
    return y - x;
}

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