interface UserWallet {
    wallet: number;
  }

interface UserVoucher {
    voucherId: string;
    userId: string;
    claim: number;
}

interface UserUpdate extends User {
    phone?: string;
    adress?: string;
    nickname?: string;
}
interface UserTrees {
    trees: number;
}
interface User{
    email: string;
    password: string;
    fname: string;
    lname: string;
}
  export { User, UserTrees, UserWallet, UserVoucher, UserUpdate };