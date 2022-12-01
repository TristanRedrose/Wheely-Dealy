import { useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { useRootStore } from "../../Context/StoresContext";

export const usePagingParams = (): void => {

    let [searchParams, setSearchParams] = useSearchParams();

    let pageParam = searchParams.get('page');
    let sortParam = searchParams.get('sort');
    let engineParam = searchParams.get('engine');
    let makeParam = searchParams.get('make');
    
    const {listingsPageStore} = useRootStore();
    const {getListings, clearListingsPage, setPage, setSorting, setEngineFilter, setMakeFilter, serializeQueryParams, queryParams} = listingsPageStore;
    const {page, sorting, filter: {engine, company}} = queryParams;

    let params = searchParams.toString();

    useEffect(() => {
        pageParam ? setPage(pageParam) : setPage('');
    }, [pageParam, setPage])

    useEffect(() => {
        sortParam ? setSorting(sortParam) : setSorting('');
    }, [sortParam, setSorting])

    useEffect(() => {
        engineParam ? setEngineFilter(engineParam) : setEngineFilter('');
    }, [engineParam, setEngineFilter])

    useEffect(() => {
        makeParam ? setMakeFilter(makeParam) : setMakeFilter('');
    }, [makeParam, setMakeFilter])

    useEffect(() => {
        setSearchParams(serializeQueryParams())
    }, [serializeQueryParams, setSearchParams, page, company, engine, sorting])

    useEffect(() => {
        getListings()
    }, [getListings, params]);

    useEffect(() => {
        return () => clearListingsPage();
    }, [clearListingsPage])
}
