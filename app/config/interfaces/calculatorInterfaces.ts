export interface calcItemInterface {
    name: string,
    density: number
}

export interface calcCatalogInterface {
    id: number,
    active: boolean,
    name: string,
    profile: number[],
    group: Array<calcItemInterface>
}
