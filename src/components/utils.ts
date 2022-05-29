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