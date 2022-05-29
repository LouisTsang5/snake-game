export function isInclude(targetList: any[], lists: any[][]) {
    return lists.map(curList => {
        return targetList.length === curList.length &&
            targetList.map((item, i) => {
                return item === curList[i];
            }).reduce((acc, cur) => acc && cur);
    }).reduce((acc, cur) => acc || cur);
}

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function getRandomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
}