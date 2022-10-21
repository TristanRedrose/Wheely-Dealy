export interface CarListing {
    id: number,
    make: string,
    type: string,
    price: number,
    image: string,
    horsepower: number,
    engine:string
}

export interface NewListingData {
    description: string;
    company: string;
    model: string;
    engine: string;
    horsepower: number;
    price: number;
    image: string;
}

export interface NewListingReq {
    token: string,
    listingData: NewListingData;
}