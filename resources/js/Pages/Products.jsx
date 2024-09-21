import {React, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getAllProductCategories, onProductCategorySelect} from "../Actions/productsAction";
import Loading from '../Components/Common/Loader.jsx'
import Table from "../Components/inputComponents/Table.jsx";
import ModalPopup from "../Components/Common/Modal/ModalPopup.jsx";

function Products() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state);
    const [page, setPage] = useState(1);
    const [submitSearch, setsubmitSearch] = useState(1);
    const [searchFormData, setsearchFormData] = useState({});
    const { productsLoading,
        productsError, 
        products, 
        productsModal, 
        productsLoadMore,
        productsLimit,
        productCategories,
        productSubCategories
    } = data.products;
    useEffect(() => {
        dispatch(getAllProductCategories());
    }, []);
    const [offset,setOffset] = useState(0);
    useEffect(() => {
        dispatch(getAllProducts(productsLimit,offset,searchFormData));
    }, [offset,submitSearch]);
    const tableHeaders = [
        {Title: 'Title', value : 'shortTitle', type : 'title'},
        {Title: 'Category', value : 'productCategory', type: 'text'},
        {Title: 'Price', value : 'productUnitPrice', type : 'price'},
        {Title: 'Stock', value :'stock', type : 'num'},
        {Title: 'Status', value :'status', type : 'status'}
    ];
    const handleLoadMore =  ()=>{
        setPage(prevPage => prevPage + 1);
        setOffset(page*productsLimit);
    }
    const searchInputFields = [
        { title : 'Title', name: 'title', id: 'title', type: 'text', placeHolder: 'Title', data:'' },
        { title : 'Category', name: 'pcategory', id: 'pcategory', type: 'drop-down', placeHolder: 'Catgeory', data: productCategories?.data || []},
        { title : 'Subcategory', name: 'psubcategory', id: 'psubcategory', type: 'drop-down', placeHolder: 'Subcategory', data: productSubCategories?.data || []},
    ];
    const handleSearch = (event) =>{
        const { name, value } = event.target;
        setsearchFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
        if(name == 'pcategory'){
            dispatch(onProductCategorySelect(value));
        }
    }
    const handleSubmitSearch = () =>{
        setsubmitSearch(!submitSearch)
    }
    console.log(searchFormData)
    return (
        <>
            <ModalPopup 
                showModal = {productsModal}
                title = "An error Occured"
                body = {productsError}
                modalType = "error"
            />
            {productsLoading ? <Loading /> : null}
            <Table headers = {tableHeaders}
                data={products?.data || []}
                addButtonLink = "/add-product"
                editButtonLink = "/edit-product"
                searchButtonEnabled = "false"
                searchButtonLink = ""
                searchButtonTitle = "search products"
                isLoading = {productsLoadMore}
                handleLoadMore = {handleLoadMore}
                tableTitle = "List Products"
                addTitle = "Add Products"
                searchInputFields = {searchInputFields}
                handleSearchOnChange = {handleSearch}
                handleSubmitSearch = {handleSubmitSearch}

            />
      </>
    )
}

export default Products
