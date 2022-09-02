import { makeObservable, observable } from "mobx";
import { CarListing } from "../Types/listing.type";
import { Company } from "../Types/company.type";

const mockList: CarListing[] = [
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
        image:"Images/Cars/mercedes.png"
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
        image:"Images/Cars/mercedes.png"
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
        image:"Images/Cars/mercedes.png"
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
        image:"Images/Cars/mercedes.png"
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
    {
        id: 21,
        make: "Volkswagen",
        type: "Polo",
        price: 15000,
        image:"Images/Cars/volkswagen.png"
    },
    {
        id: 22,
        make: "BMW",
        type: "A-class",
        price: 22000,
        image:"Images/Cars/Bmw.png"
    },
    {
        id: 23,
        make: "Ford",
        type: "Focus",
        price: 10000,
        image:"Images/Cars/ford.png"
    },
    {
        id: 24,
        make: "Mercedes",
        type: "Benz-55",
        price: 13000,
        image:"Images/Cars/mercedes.png"
    },
    {
        id: 25,
        make: "Opel",
        type: "Corsa",
        price: 8000,
        image:"Images/Cars/opel.png"
    },
    {
        id: 26,
        make: "Volkswagen",
        type: "Polo",
        price: 15000,
        image:"Images/Cars/volkswagen.png"
    },
    {
        id: 27,
        make: "Volkswagen",
        type: "Polo",
        price: 15000,
        image:"Images/Cars/volkswagen.png"
    },
    {
        id: 28,
        make: "Volkswagen",
        type: "Polo",
        price: 15000,
        image:"Images/Cars/volkswagen.png"
    },
    {
        id: 29,
        make: "BMW",
        type: "A-class",
        price: 22000,
        image:"Images/Cars/Bmw.png"
    },
    {
        id: 30,
        make: "Ford",
        type: "Focus",
        price: 10000,
        image:"Images/Cars/ford.png"
    },
    {
        id: 31,
        make: "Mercedes",
        type: "Benz-55",
        price: 13000,
        image:"Images/Cars/mercedes.png"
    },
    {
        id: 32,
        make: "Opel",
        type: "Corsa",
        price: 8000,
        image:"Images/Cars/opel.png"
    },
    {
        id: 33,
        make: "Volkswagen",
        type: "Polo",
        price: 15000,
        image:"Images/Cars/volkswagen.png"
    },
]

const companyList: Company[] = [
    {
        id:1,
        company: "BMW",
    },
    {
        id:2,
        company: "Ford",
    },
    {
        id:3,
        company: "Mercedes",
    },
    {
        id:4,
        company: "Volkswagen",
    },
    {
        id:5,
        company: "Opel",
    },
]

export class ListingStoreImpl {

    listings: CarListing[] = mockList;

    companyList: Company[] = companyList

    constructor() {
        makeObservable(this, {
            listings: observable,
            companyList: observable,
        });
    }
}

export const ListingStore = new ListingStoreImpl();