export interface Voucher {
        name: string;
        description: string;
        partnerId: string;
        price: number;
        limitUse: number;
        startDate: Date;
        endDate: Date;
}
