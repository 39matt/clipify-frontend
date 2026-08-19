interface IAccount {
    id?: string;
    userId: string;
    username: string;
    platform: string;
    verifiedAt: Date;
    createdAt: Date;
    verificationCode: string;
}