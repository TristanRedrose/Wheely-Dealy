import { makeObservable, observable } from "mobx";


const mockList: Listing[] = [
    {
        id: 1,
        make: "BMW",
        type: "A-class",
        price: 22000,
        image:"Images/Cars/Bmw.png"
    },
    {
        id: 2,
        make: "Ford",
        type: "Focus",
        price: 10000,
        image:"Images/Cars/ford.png"
    },
    {
        id: 3,
        make: "Mercedes",
        type: "Benz-55",
        price: 13000,
        image:"Images/Cars/mercedes.jpg"
    },
    {
        id: 4,
        make: "Opel",
        type: "Corsa",
        price: 8000,
        image:"Images/Cars/opel.png"
    },
    {
        id: 5,
        make: "Volkswagen",
        type: "Polo",
        price: 15000,
        image:"Images/Cars/volkswagen.png"
    },
    {
        id: 6,
        make: "BMW",
        type: "A-class",
        price: 22000,
        image:"Images/Cars/Bmw.png"
    },
    {
        id: 7,
        make: "Ford",
        type: "Focus",
        price: 10000,
        image:"Images/Cars/ford.png"
    },
    {
        id: 8,
        make: "Mercedes",
        type: "Benz-55",
        price: 13000,
        image:"Images/Cars/mercedes.jpg"
    },
    {
        id: 9,
        make: "Opel",
        type: "Corsa",
        price: 8000,
        image:"Images/Cars/opel.png"
    },
    {
        id: 10,
        make: "Volkswagen",
        type: "Polo",
        price: 15000,
        image:"Images/Cars/volkswagen.png"
    },
    {
        id: 11,
        make: "BMW",
        type: "A-class",
        price: 22000,
        image:"Images/Cars/Bmw.png"
    },
    {
        id: 12,
        make: "Ford",
        type: "Focus",
        price: 10000,
        image:"Images/Cars/ford.png"
    },
    {
        id: 13,
        make: "Mercedes",
        type: "Benz-55",
        price: 13000,
        image:"Images/Cars/mercedes.jpg"
    },
    {
        id: 14,
        make: "Opel",
        type: "Corsa",
        price: 8000,
        image:"Images/Cars/opel.png"
    },
    {
        id: 15,
        make: "Volkswagen",
        type: "Polo",
        price: 15000,
        image:"Images/Cars/volkswagen.png"
    },
    {
        id: 16,
        make: "BMW",
        type: "A-class",
        price: 22000,
        image:"Images/Cars/Bmw.png"
    },
    {
        id: 17,
        make: "Ford",
        type: "Focus",
        price: 10000,
        image:"Images/Cars/ford.png"
    },
    {
        id: 18,
        make: "Mercedes",
        type: "Benz-55",
        price: 13000,
        image:"Images/Cars/mercedes.jpg"
    },
    {
        id: 19,
        make: "Opel",
        type: "Corsa",
        price: 8000,
        image:"Images/Cars/opel.png"
    },
    {
        id: 20,
        make: "Volkswagen",
        type: "Polo",
        price: 15000,
        image:"Images/Cars/volkswagen.png"
    },
]

export interface Listing {
    id: number,
    make: string,
    type: string,
    price: number,
    image: string,
}

export class ListingStoreImpl {

    listings: Listing[] = mockList;

    constructor() {
        makeObservable(this, {
            listings: observable
        });
    }
}

export const ListingStore = new ListingStoreImpl();