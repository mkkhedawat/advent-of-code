const intersectionBetweenArray = (a: number[], b: number[]) => {
    const setB = new Set(b);
    return [...new Set(a)].filter(x => setB.has(x));
}

export default {
    intersectionBetweenArray
}