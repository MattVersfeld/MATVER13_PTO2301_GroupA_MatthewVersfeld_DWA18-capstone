// @ts-nocheck

/*
  These utility functions are designed to facilitate sorting and filtering operations
  on an array of objects representing shows. The functions cover sorting by date,
  sorting by title in ascending and descending order, and filtering shows by genre.

  Functions:
  1. dateUp(x, y): Sorts shows based on the 'updated' property in ascending order.
  2. dateDown(x, y): Sorts shows based on the 'updated' property in descending order.
  3. titleDown(a, b): Sorts shows based on the 'title' property in descending alphabetical order.
  4. titleUp(a, b): Sorts shows based on the 'title' property in ascending alphabetical order.
  5. filterByGenre(showsArr, title): Filters shows by genre, keeping only those
     that have at least one genre with a matching 'title'.

  Note:
  - The 'updated' property is expected to be present in the objects being compared for sorting.
  - The 'title' property is assumed to be present in the objects being compared for sorting by title.
  - The 'filterByGenre' function checks if any genre in the show's 'genres' array has a matching 'title'.
*/
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

export const titleDown = (a: { title: string }, b: { title: string }): number => {
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

export const titleUp = (a: { title: string }, b: { title: string }): number => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA < titleB) {
        return -1;
    }
    if (titleA > titleB) {
        return 1;
    }
    return 0;
}

export const filterByGenre = (showsArr, title) => {
    return showsArr.filter(show => {
        return show.genres.some(genre => genre.title === title);
    });
}