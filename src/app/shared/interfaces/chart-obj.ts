export interface ChartObj {
    categories: string[];
    series: DataPoint[];
}

export interface DataPoint {
    name: string;
    data: number[];
    color: string;
}
