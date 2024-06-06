import { string } from 'zod';
export interface IRoom {
    id: string;
    name: string;
    images: string[];
    type: string;
    price: number;
}
export interface IRoomData {
    id : number;
    title : string;
    rent_time_title : string;
    price : string;
    rent_state : string;
    is_lock : boolean;
}
export interface ICustomRoom {
    images : string[];
    title : string;
    id : number;
    slug :string;
    price:number
}