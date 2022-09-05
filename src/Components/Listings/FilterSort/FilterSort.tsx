import React, {useRef} from "react";
import { useListingsStore } from "../../../Context/ListingsContext";
import "./FilterSort.css";

const ListingsFilterSort = () => {

    const listingStore = useListingsStore();

    const priceFilter = useRef<null | HTMLSelectElement>(null);
    const horsepowerFilter = useRef<null | HTMLSelectElement>(null);

    return (
        <div className="filter-sort-container">
            <div className="select-container">
                <h5>Filter by:</h5>
                <div className="label-select-box">
                    <h6>Make:</h6>
                    <select className="filter" defaultValue={"All"} onChange={(e) => listingStore.filterList(e)}>
                        <option value={"M-N/A"}>All</option>
                        {listingStore.companyList.map(item => {
                            return <option key={item.id} value={item.company}>{item.company}</option>
                        })}
                    </select>
                </div>
                <div className="label-select-box">
                    <h6>Engine:</h6>
                    <select className="filter" defaultValue={"All"} onChange={(e) => listingStore.filterList(e)}>
                        <option value={"E-N/A"}>All</option>
                        <option value={"petrol"}>Petrol</option>
                        <option value={"diesel"}>Diesel</option>
                    </select>
                </div>
            </div>
            <div className="select-container">
                <h5>Sort by:</h5>
                <div className="label-select-box">
                    <h6>Horsepower:</h6>
                    <select ref={horsepowerFilter} className="filter" defaultValue={"none"} 
                        onChange={(e) => {
                            priceFilter.current!.value = "none";
                            listingStore.sortByHorsepower(e)}
                        }>
                        <option value={"none"}>N/A</option>
                        <option value={"highest"}>Highest first</option>
                        <option value={"lowest"}>Lowest first</option>
                    </select>
                </div>
                <div className="label-select-box">
                    <h6>Price:</h6>
                    <select ref={priceFilter} className="filter" defaultValue={"none"} 
                        onChange={(e) => {
                            horsepowerFilter.current!.value = "none";
                            listingStore.sortByPrice(e)}
                        }>
                        <option value={"none"}>N/A</option>
                        <option value={"highest"}>Highest first</option>
                        <option value={"lowest"}>Lowest first</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ListingsFilterSort;