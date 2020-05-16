import { MetalInterface } from '../interfaces/metalInterface'
import { ElectronicInterface } from '../interfaces/electronicInterface'

export function filterPounchData(data, sign){
    let group = [];
    let group_object = {};
    for (let item in data) {
        if (group_object[data[item][sign]]) {
            group_object[data[item][sign]].push(data[item])
        } else {
            group_object[data[item][sign]] = [data[item]]
        }
    }
    for (let key in group_object) {
        group[key] = group_object[key];
    }
    let filterGroup = group.filter(function(x) {
        return (x !== (undefined || null || ''));
    });
    return filterGroup
}

export function filterData<T>(data: T[], sign: string): Array<T[]> {
    let group:Array<T[]> = [];
    let group_object = {};
    for (let item in data) {
        if (group_object[data[item][sign]]) {
            group_object[data[item][sign]].push(data[item])
        } else {
            group_object[data[item][sign]] = [data[item]]
        }

    }
    for (let key in group_object) {
        group[key] = group_object[key];
    }
    let filterGroup = group.filter(function(x) {
        return (x !== (undefined || null || ''));
    });
    return filterGroup
}
