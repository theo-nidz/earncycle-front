export interface userVoucherList {
    id: number;
    claim: number;
    userId: string;
    voucherId: {
        description:string;
        endDate: Date;
        id:number;
        image:string;
        limitUse:number;
        name:string;
        partnerId:string;
        partnerName:string;
        price:number;
        startDate: Date;
        sDate: string;
        eDate: string;
    }
};