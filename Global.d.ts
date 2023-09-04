interface Data {
    datetime: string,//Date
    endtime: string,
    calendar: string,
    id: number,
    content: string,
    color: string,
}

interface setData extends Data {
    y1?: number,
    y2?: number,
    height?: number,
    width?: number,
    left?: number
}