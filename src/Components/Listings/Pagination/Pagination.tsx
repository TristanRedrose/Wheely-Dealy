import React, {useEffect} from "react";
import { useRootStore } from "../../../Context/StoresContext";
import "./Pagination.css";
import { useSearchParams } from "react-router-dom";

const Pagination: React.FC = () => {

    const {listingsPageStore} = useRootStore();
    const {page, maxPages, setPage, sorting, filter, getQueryParams} = listingsPageStore;
    let {engine, company} = filter
    let [searchParams, setSearchParams] = useSearchParams();

    let queryPage = searchParams.get('page');

    useEffect(() => {
        if (queryPage && +queryPage > 0 && maxPages > 0) {
            (+queryPage <= maxPages) ? setPage(+queryPage) : setPage(maxPages);
        } else {
            setPage(1);
        }
    }, [queryPage, maxPages, setPage])

    return (
        <div className="pagination">
            <div className="pagi-buttons-container">
                {page > 1 && <div className="page-button" onClick={() => setSearchParams(getQueryParams(1, sorting, company , engine))}>
                    <h5>1</h5>
                </div>}
                {(page - 4) > 1 && <div className="page-button" onClick={() => setSearchParams(getQueryParams(page - 4, sorting, company , engine))}>
                    <h5>{page - 4}</h5>
                </div>}
                {page > 1 && <div className="page-button" onClick={() => setSearchParams(getQueryParams(page -1, sorting, company , engine))}>
                    <h5>{'<'}</h5>
                </div>}
            </div>
            <div className="current-page-div">
                <div>
                    <h5>{page} of {maxPages}</h5>
                </div>
            </div>
            <div className="pagi-buttons-container">
                {page < maxPages && <div className="page-button" onClick={() => setSearchParams(getQueryParams(page + 1, sorting, company , engine))}>
                    <h5>{'>'}</h5>
                </div>}
                {(page + 4) < maxPages && <div className="page-button" onClick={() => setSearchParams(getQueryParams(page + 1, sorting, company , engine))}>
                    <h5>{page + 4}</h5>
                </div>}
                {page < maxPages && <div className="page-button" onClick={() => setSearchParams(getQueryParams(maxPages, sorting, company , engine))}>
                    <h5>{maxPages}</h5>
                </div>}
            </div>
        </div>
    )
}

export default Pagination