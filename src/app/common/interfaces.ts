

// export interface Equity {
//     symbol: string;
//     exchange?: string;
//     options?: Option[];
// }


export class Equity {
    id?: string;
    symbol?: string;
    exchange?: string;
    options?: Option[];
    published?: boolean;

}

export interface Option {
    symbol: string;
    underlying?: string;
    expiration?: Date;
    strike?: number;
    type?: string;
}

export interface Item {
    name?: string;
    data?: number[];
    }