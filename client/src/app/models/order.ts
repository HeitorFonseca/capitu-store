export class Order {
    _id: string;
    References: Array<string>;
    ClientName: string;
    Confirmed: boolean;
    Sizes: Array<string>;
    createdAt: string;
    date: string;
    isChecked: boolean = false;
}



