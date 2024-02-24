export const getPagination = (page: number, size: number, count: number) => {
    let from = (page - 1) * size;
    if (page < 1 || from > count) from = 0;
    const to = from + size;
  
    return { from, to };
  };