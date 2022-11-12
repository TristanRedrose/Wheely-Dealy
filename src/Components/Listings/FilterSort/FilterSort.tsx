import React, {useRef, useEffect} from "react";
import { useRootStore } from "../../../Context/StoresContext";
import "./FilterSort.css";
import { useSearchParams } from "react-router-dom";

const ListingsFilterSort = () => {

    const {listingsPageStore} = useRootStore();
    const {companyList, setMakeFilter, setEngineFilter, setSorting, getQueryParams} = listingsPageStore;

    const priceSorting = useRef<null | HTMLSelectElement>(null);
    const horsepowerSorting = useRef<null | HTMLSelectElement>(null);
    const engineFilter = useRef<null | HTMLSelectElement>(null);
    const makeFilter = useRef<null | HTMLSelectElement>(null);

    let [searchParams, setSearchParams] = useSearchParams();
    let querySort = searchParams.get('sort');
    let queryEngine = searchParams.get('engine');
    let queryMake = searchParams.get('make');

    useEffect(() => {
        if (querySort === "price" || querySort === "-price" || querySort === "none") {
            priceSorting.current!.value = querySort;
            horsepowerSorting.current!.value = "none";
            setSorting(querySort);
        }

        if (querySort === "horsepower" || querySort === "-horsepower") {
            horsepowerSorting.current!.value = querySort;
            priceSorting.current!.value = "none";
            setSorting(querySort);
        }
    }, [querySort, setSorting])

    useEffect(() => {
        if (queryEngine === 'petrol' || queryEngine === "diesel" || queryEngine === "all") {
            engineFilter.current!.value = queryEngine;
            setEngineFilter(queryEngine);
        }
    }, [queryEngine, setEngineFilter])

    useEffect(() => {
        function companyExists(company: string): boolean {
            return companyList.some((el) => {
                return el.company === company;
            });
        }

        if (queryMake && (companyExists(queryMake) || queryMake === "all")) {
            makeFilter.current!.value = queryMake;
            setMakeFilter(queryMake);
        }
    }, [queryMake, setMakeFilter, companyList])

    return (
        <div className="filter-sort-container">
            <div className="select-container">
                <h5>Filter by:</h5>
                <div className="label-select-box">
                    <h6>Make:</h6>
                    <select title="company-filter" className="filter" defaultValue={"all"} ref={makeFilter} onChange={(e) => setSearchParams(getQueryParams(1, querySort, e.currentTarget.value, queryEngine))}>
                        <option value={"all"}>All</option>
                        {companyList.map(item => {
                            return <option key={item.id} value={item.company}>{item.company}</option>
                        })}
                    </select>
                </div>
                <div className="label-select-box">
                    <h6>Engine:</h6>
                    <select title="engine-filter" className="filter" ref={engineFilter} defaultValue={"all"} onChange={(e) => setSearchParams(getQueryParams(1, querySort, queryMake, e.currentTarget.value))}>
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
                    <select title="horsepower-sort" ref={horsepowerSorting} className="filter" defaultValue={"none"} 
                        onChange={(e) => setSearchParams(getQueryParams(1, e.currentTarget.value, queryMake, queryEngine))}>
                        <option value={"none"}>N/A</option>
                        <option value={"-horsepower"}>Highest first</option>
                        <option value={"horsepower"}>Lowest first</option>
                    </select>
                </div>
                <div className="label-select-box">
                    <h6>Price:</h6>
                    <select title="price-sort" ref={priceSorting} className="filter" defaultValue={"none"} 
                        onChange={(e) => setSearchParams(getQueryParams(1, e.currentTarget.value, queryMake, queryEngine))}>
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