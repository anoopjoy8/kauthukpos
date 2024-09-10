import {React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Actions/productsAction";
import Loading from '../Components/Common/Loader.jsx'
import Table from "../Components/inputComponents/Table.jsx";
import ModalPopup from "../Components/Common/Modal/ModalPopup.jsx";

function Products() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state);
    const { productsLoading,productsError, products, productsModal } = data.products;
    useEffect(() => {
        dispatch(getAllProducts());
    }, []);
    const tableHeaders = [
        {Title: 'Title', value : 'title', type : 'title'},
        {Title: 'Category', value : 'productCategory', type: 'text'},
        {Title: 'Price', value : 'productUnitPrice', type : 'price'},
        {Title: 'Stock', value :'stock', type : 'num'},
        {Title: 'Status', value :'status', type : 'status'}
    ];
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
        />
      </>
    )
}

export default Products
