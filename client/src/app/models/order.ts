export class Order {
    _id: string;
    References: Array<string>;
    ClientName: string;
    Sizes: Array<string>;
    createdAt: string;
    isChecked: boolean = false;
}



