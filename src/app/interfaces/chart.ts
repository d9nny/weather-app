export interface Chart {
    categories: string[];
    series: DataPoint[];
}

export interface DataPoint {
    name: string;
    data: number[];
}