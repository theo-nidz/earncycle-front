export interface Voucher {
        id: number;
        name: string;
        description: string;
        partnerId: string;
        image: string;
        price: number;
        limitUse: number;
        startDate: Date;
        endDate: Date;
}
