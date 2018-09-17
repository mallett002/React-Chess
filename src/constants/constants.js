export const isLight = (n) => {
    if (n <= 7 || 
        n > 15 && n < 24 ||
        n > 31 && n < 40 ||
        n > 47 && n < 56) {
        if (isEven(n)) return true;
    }
    else if (n > 7) {
        if (!isEven(n)) return true;
    }
};

export const isEven = (n) => {
    if (n % 2 === 0) return true;
    else return false;
}