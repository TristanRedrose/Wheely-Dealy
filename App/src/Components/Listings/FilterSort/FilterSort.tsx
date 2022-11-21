import React from "react";
import { useRootStore } from "../../../Context/StoresContext";
import "./FilterSort.css";

const ListingsFilterSort = () => {

    const {listingsPageStore} = useRootStore();
    const {companyList, setMakeFilter, setEngineFilter, setSorting, engineFilterKeys, companyFilterKeys, queryParams, goToFirstPage} = listingsPageStore;
    const {sorting, filter: {company, engine}} = queryParams

    return (
        <div className="filter-sort-container">
            <div className="select-container">
                <h5>Filter by:</h5>
                <div className="label-select-box">
                    <h6>Make:</h6>
                    <select 
                        title="company-filter" 
                        className="filter" 
                        value={(company && companyFilterKeys.includes(company)) ? company : "all"} 
                        onChange={(e) => {setMakeFilter(e.currentTarget.value); goToFirstPage()}}>
                            <option value={"all"}>All</option>
                            {companyList.map(item => {
                                return <option key={item.id} value={item.company}>{item.company}</option>
                            })}
                    </select>
                </div>
                <div className="label-select-box">
                    <h6>Engine:</h6>
                    <select 
                        title="engine-filter"
                        className="filter" 
                        value={engine && engineFilterKeys.includes(engine) ? engine : "all"} 
                        onChange={(e) => {setEngineFilter(e.currentTarget.value); goToFirstPage()}}>
                            <option value={"all"}>All</option>
                            <option value={"petrol"}>Petrol</option>
                            <option value={"diesel"}>Diesel</option>
                    </select>
                </div>
            </div>
            <div className="select-container">
                <h5>Sort by:</h5>
                <div className="label-select-box">
                    <h6>Horsepower:</h6>
                    <select 
                        title="horsepower-sort" 
                        className="filter" 
                        value={(sorting && ["-horsepower", "horsepower"].includes(sorting)) ? sorting : "none"} 
                        onChange={(e) => {setSorting(e.currentTarget.value); goToFirstPage()}}>
                            <option value={"none"}>N/A</option>
                            <option value={"-horsepower"}>Highest first</option>
                            <option value={"horsepower"}>Lowest first</option>
                    </select>
                </div>
                <div className="label-select-box">
                    <h6>Price:</h6>
                    <select 
                        title="price-sort" 
                        className="filter" 
                        value={(sorting && ["-price", "price"].includes(sorting)) ? sorting : "none"}
                        onChange={(e) => {setSorting(e.currentTarget.value); goToFirstPage()}}>
                            <option value={"none"}>N/A</option>
                            <option value={"-price"}>Highest first</option>
                            <option value={"price"}>Lowest first</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ListingsFilterSort;