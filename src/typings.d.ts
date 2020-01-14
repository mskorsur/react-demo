export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IUserAddress;
    phone: string;
    website: string;
    company: IUserCompany;
}

export interface IUserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

export interface IUserCompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface IPost {
    id: number,
    userId: number;
    title: string;
    body: string;
}