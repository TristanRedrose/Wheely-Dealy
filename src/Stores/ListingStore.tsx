import { makeObservable, observable, action } from "mobx";
import { CarListing } from "../Types/listing.type";
import { Company } from "../Types/company.type";


const mockList: CarListing[] = [
    {
        id: 1,
        make: "BMW",
        type: "A-class",
        price: 22000,
        image:"Images/Cars/Bmw.png",
        horsepower: 110,
        engine: "petrol",
    },
    {
        id: 2,
        make: "Ford",
        type: "Focus",
        price: 9500,
        image:"Images/Cars/ford.png",
        horsepower: 100,
        engine: "petrol",
    },
    {
        id: 3,
        make: "Mercedes",
        type: "Benz-55",
        price: 13500,
        image:"Images/Cars/mercedes.png",
        horsepower: 110,
        engine: "petrol",
    },
    {
        id: 4,
        make: "Opel",
        type: "Corsa",
        price: 8000,
        image:"Images/Cars/opel.png",
        horsepower: 115,
        engine: "diesel",
    },
    {
        id: 5,
        make: "Volkswagen",
        type: "Polo",
        price: 15100,
        image:"Images/Cars/volkswagen.png",
        horsepower: 120,
        engine: "diesel",
    },
    {
        id: 6,
        make: "BMW",
        type: "A-class",
        price: 22300,
        image:"Images/Cars/Bmw.png",
        horsepower: 120,
        engine: "diesel",
    },
    {
        id: 7,
        make: "Ford",
        type: "Focus",
        price: 7340,
        image:"Images/Cars/ford.png",
        horsepower: 130,
        engine: "petrol",
    },
    {
        id: 8,
        make: "Mercedes",
        type: "Benz-55",
        price: 11500,
        image:"Images/Cars/mercedes.png",
        horsepower: 110,
        engine: "diesel",
    },
    {
        id: 9,
        make: "Opel",
        type: "Corsa",
        price: 9200,
        image:"Images/Cars/opel.png",
        horsepower: 130,
        engine: "petrol",
    },
    {
        id: 10,
        make: "Volkswagen",
        type: "Polo",
        price: 17300,
        image:"Images/Cars/volkswagen.png",
        horsepower: 120,
        engine: "petrol",
    },
    {
        id: 11,
        make: "BMW",
        type: "A-class",
        price: 19200,
        image:"Images/Cars/Bmw.png",
        horsepower: 125,
        engine: "petrol",
    },
    {
        id: 12,
        make: "Ford",
        type: "Focus",
        price: 18100,
        image:"Images/Cars/ford.png",
        horsepower: 125,
        engine: "diesel",
    },
    {
        id: 13,
        make: "Mercedes",
        type: "Benz-55",
        price: 11350,
        image:"Images/Cars/mercedes.png",
        horsepower: 110,
        engine: "petrol",
    },
    {
        id: 14,
        make: "Opel",
        type: "Corsa",
        price: 8750,
        image:"Images/Cars/opel.png",
        horsepower: 125,
        engine: "petrol",
    },
    {
        id: 15,
        make: "Volkswagen",
        type: "Polo",
        price: 1750,
        image:"Images/Cars/volkswagen.png",
        horsepower: 130,
        engine: "diesel",
    },
    {
        id: 16,
        make: "BMW",
        type: "A-class",
        price: 3450,
        image:"Images/Cars/Bmw.png",
        horsepower: 100,
        engine: "diesel",
    },
    {
        id: 17,
        make: "Ford",
        type: "Focus",
        price: 7700,
        image:"Images/Cars/ford.png",
        horsepower: 100,
        engine: "diesel",
    },
    {
        id: 18,
        make: "Mercedes",
        type: "Benz-55",
        price: 16400,
        image:"Images/Cars/mercedes.png",
        horsepower: 110,
        engine: "petrol",
    },
    {
        id: 19,
        make: "Opel",
        type: "Corsa",
        price: 9900,
        image:"Images/Cars/opel.png",
        horsepower: 125,
        engine: "petrol",
    },
    {
        id: 20,
        make: "Volkswagen",
        type: "Polo",
        price: 11100,
        image:"Images/Cars/volkswagen.png",
        horsepower: 130,
        engine: "petrol",
    },
    {
        id: 21,
        make: "Volkswagen",
        type: "Polo",
        price: 18340,
        image:"Images/Cars/volkswagen.png",
        horsepower: 125,
        engine: "diesel",
    },
    {
        id: 22,
        make: "BMW",
        type: "A-class",
        price: 20200,
        image:"Images/Cars/Bmw.png",
        horsepower: 110,
        engine: "diesel",
    },
    {
        id: 23,
        make: "Ford",
        type: "Focus",
        price: 19100,
        image:"Images/Cars/ford.png",
        horsepower: 105,
        engine: "petrol",
    },
    {
        id: 24,
        make: "Mercedes",
        type: "Benz-55",
        price: 13300,
        image:"Images/Cars/mercedes.png",
        horsepower: 140,
        engine: "petrol",
    },
    {
        id: 25,
        make: "Opel",
        type: "Corsa",
        price: 8120,
        image:"Images/Cars/opel.png",
        horsepower: 120,
        engine: "petrol",
    },
    {
        id: 26,
        make: "Volkswagen",
        type: "Polo",
        price: 15700,
        image:"Images/Cars/volkswagen.png",
        horsepower: 110,
        engine: "petrol",
    },
    {
        id: 27,
        make: "Volkswagen",
        type: "Polo",
        price: 16200,
        image:"Images/Cars/volkswagen.png",
        horsepower: 110,
        engine: "petrol",
    },
    {
        id: 28,
        make: "Volkswagen",
        type: "Polo",
        price: 13400,
        image:"Images/Cars/volkswagen.png",
        horsepower: 100,
        engine: "diesel",
    },
    {
        id: 29,
        make: "BMW",
        type: "A-class",
        price: 15900,
        image:"Images/Cars/Bmw.png",
        horsepower: 105,
        engine: "diesel",
    },
    {
        id: 30,
        make: "Ford",
        type: "Focus",
        price: 2350,
        image:"Images/Cars/ford.png",
        horsepower: 110,
        engine: "diesel",
    },
    {
        id: 31,
        make: "Mercedes",
        type: "Benz-55",
        price: 4400,
        image:"Images/Cars/mercedes.png",
        horsepower: 120,
        engine: "diesel",
    },
    {
        id: 32,
        make: "Opel",
        type: "Corsa",
        price: 9820,
        image:"Images/Cars/opel.png",
        horsepower: 120,
        engine: "diesel",
    },
    {
        id: 33,
        make: "Volkswagen",
        type: "Polo",
        price: 18340,
        image:"Images/Cars/volkswagen.png",
        horsepower: 110,
        engine: "diesel",
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

interface Filter {
    make: string | null ,
    engine: string | null,
}

export class ListingStoreImpl {

    listings: CarListing[] = mockList;

    companyList: Company[] = companyList;

    currentPageList: CarListing[] = [];

    filteredList:CarListing[] = [];

    sortedList: CarListing[] = [];

    unsortedList: CarListing[] = [];

    page:number = 1;

    filter: Filter = {
        make: null,
        engine: null,
    }

    listingsPerPage: number = 8;
    
    maxPages: number = 0

    isFiltered: boolean = false

    isSorted: boolean = false

    constructor() {
        makeObservable(this, {
            listings: observable,
            companyList: observable,
            page: observable,
            listingsPerPage: observable,
            filteredList: observable,
            maxPages: observable,
            currentPageList: observable,
            sortedList: observable,
            isFiltered: observable,
            isSorted: observable,
            filterList: action,
            sortByHorsepower: action,
            paginate: action,
            incrementPage: action,
            decrementPage: action,
            setPage: action,
        });
    }

    getMaxPages(): void {
        this.maxPages = Math.ceil(this.filteredList.length / this.listingsPerPage)
    }

    filterList(event: React.FormEvent<HTMLSelectElement>): void  {
        this.page = 1;
        if (event.currentTarget.value === "M-N/A") {
            this.filter.make = null
        } else if (event.currentTarget.value === "E-N/A") {
            this.filter.engine = null
        } else if (event.currentTarget.value === "diesel" || event.currentTarget.value === "petrol") {
            this.filter.engine = event.currentTarget.value
        } else {
            this.filter.make = event.currentTarget.value
        }

        if (!this.filter.engine && !this.filter.make) {
            this.filteredList = [];
            this.isFiltered = false;
            return;
        }

        this.isFiltered = true;

        let tempList: CarListing[] = mockList

        if (this.filter.make) {
            tempList = [...tempList].filter(item => item.make === this.filter.make);

            this.unsortedList = mockList.filter(item => item.make === this.filter.make);
        }

        if (this.filter.engine) {
            tempList= [...tempList].filter(item => item.engine === this.filter.engine);

            this.unsortedList = mockList.filter(item => item.engine === this.filter.engine);
        }

        this.filteredList = tempList;
        console.log(this.filteredList);
        console.log(this.filter);
    }

    sortByHorsepower(event: React.FormEvent<HTMLSelectElement>): void {
        if (event.currentTarget.value === "none") {
            this.isSorted = false;
            if (this.isFiltered) {
                this.filteredList = this.unsortedList;
                return;
            }

            this.listings = mockList;
            return;
        }

        if (event.currentTarget.value === "highest") {
            this.isSorted = true;

            if (this.isFiltered) {
                this.filteredList = [...this.filteredList].sort(function(listing1, listing2){return listing2.horsepower - listing1.horsepower});
            }

            this.listings = [...this.listings].sort(function(listing1, listing2){return listing2.horsepower - listing1.horsepower});
            return;
        }

        this.isSorted = true;

        if (this.isFiltered) {
            this.filteredList = [...this.filteredList].sort(function(listing1, listing2){return listing1.horsepower - listing2.horsepower});
        }

        this.listings = [...this.listings].sort(function(listing1, listing2){return listing1.horsepower - listing2.horsepower});
    }

    paginate():void {
        let currentList: CarListing[] = [];

        if (this.isFiltered === true) {
            currentList = this.filteredList;
        } else {
            currentList = this.listings;
        }

        this.maxPages = Math.ceil(currentList.length / this.listingsPerPage);

        this.currentPageList = currentList.slice((this.page - 1) * 8, this.page* 8);
    }

    incrementPage() {
        if (this.page === this.maxPages) return;

        ++this.page;
    }

    decrementPage() {
        if (this.page === 1 ) return;

        --this.page;
    }

    setPage(page:number) {
        this.page = page;
    }

}

export const ListingStore = new ListingStoreImpl();