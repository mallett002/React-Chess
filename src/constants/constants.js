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

export const findIndex = (n, array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === n) return i;
    }
}

export const makeCoords = index => {
    let coords = [];
    let x = 0; 
    let y = 0; 
    if (index < 8) {
        y = 0;
        x = index; 
    } else if (index >= 8 && index < 16) {
        y = 1;
        x = index - 8;
    } else if (index >= 16 && index < 24) {
        y = 2; 
        x = index - 16;
    } else if (index >= 24 && index < 32) {
        y = 3;
        x = index - 24;
    } else if (index >= 32 && index < 40) {
        y = 4; 
        x = index - 32;
    } else if (index >= 40 && index < 48) {
        y = 5;
        x = index - 40;
    } else if (index >= 48 && index < 56) {
        y = 6;
        x = index - 48;
    } else {
        y = 7;
        x = index - 56;
    }
    coords.push(x);
    coords.push(y);
    return coords;
}