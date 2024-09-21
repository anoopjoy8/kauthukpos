import {React, useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Text from '../Components/inputComponents/Text'
import DropDownOne from '../Components/inputComponents/DropDownOne'
import EmailOne from '../Components/inputComponents/EmailOne'
import PasswordOne from '../Components/inputComponents/PasswordOne'
import { getAllProductCategories, 
    onProductCategorySelect,
    addProduct, 
    editProduct,
    updateProduct
} from "../Actions/productsAction.jsx";
import Loading from '../Components/Common/Loader.jsx'
import ModalPopup from "../Components/Common/Modal/ModalPopup.jsx";
import SubmitButton from "../Components/inputComponents/submitButton.jsx";
import Radio from "../Components/inputComponents/Radio.jsx";
import Checkbox from "../Components/inputComponents/Checkbox.jsx";
 
function AddProduct() {
    const dispatch = useDispatch()
    const [id,setId] = useState(useParams().id);
    const [submitButtonType, setSubmitButtonType] = useState('add');
    useEffect(() => {
        if (id) {
            dispatch(editProduct(id));
            setSubmitButtonType('update');
        }
    }, [id, dispatch]);
    const data = useSelector((state) => state);
    const {productCategoryLoading,
        addProductLoading,
        productCategories,
        productCategoriesErrorModal,
        addProductModalSucces,
        addProductModalError,
        addProductError,
        productCategoriesError,
        productSubCategories,
        productSubCategoriesLoading,
        productData,
        updateProductLoading,
        updateProductSuccess,
        updateProductErrorState,
        updateProductSuccessMessage,
        updateProductErrorMessage
    } = data.products;
    const [freeShipping, setFreeShipping] = useState(false);
    const [codAvailable,setCodAvailable] = useState(true);
    useEffect(() => {
        if (productData && productData.data) {
            setFreeShipping(productData.data.freeShipping || false);
            setCodAvailable(productData.data.cod || false);
        }
    }, [productData]);
    const [formData, setFormData] = useState({
        pcategory: '',
        psubcategory: '',
        shorttitle : '',
        title : '',
        stockstatus : 'instock',
        quantitylimit : '',
        productcount : '',
        freeshipping : freeShipping,
        hsncode : '',
        taxpercentage : '',
        priceinr : '',
        cod : codAvailable

    });
    useEffect(() => {
        if (productData && productData.data) {
          setFormData(prevFormData => ({
            ...prevFormData,
            ...Object.fromEntries(
              Object.entries(productData.data).filter(([key]) => key in prevFormData)
            )
          }));
          if(formData.pcategory){
            dispatch(onProductCategorySelect(formData.pcategory));
          }
        }
    }, [productData]);
    const [errors, setErrors] = useState({
        pcategory: '',
        psubcategory: '',
        shorttitle : '',
        title : '',
        stockstatus : '',
        quantitylimit : '',
        
    });
    const showModal = productCategoriesErrorModal || addProductModalSucces || addProductModalError || updateProductSuccess || updateProductErrorState;
    const modalBody = addProductModalError ? addProductError 
        : productCategoriesErrorModal ? productCategoriesError
        : updateProductSuccess ? updateProductSuccessMessage
        : updateProductErrorState ? updateProductErrorMessage
        : "Product Created Successfully"
    const modalType = productCategoriesErrorModal ? 'error'
        : addProductModalError ? 'error'
        : updateProductErrorState ? 'error'
        : 'success';
    const modalTitle = modalType == "error" ? "An error Occured" : "Success";;
    useEffect(() => {
        dispatch(getAllProductCategories());
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
        if (errors[name]) {
            setErrors(prevErrors => ({
              ...prevErrors,
              [name]: ''
            }));
        }
        if(name == 'pcategory'){
            dispatch(onProductCategorySelect(value));
        }
        if(name == 'freeshipping'){
            const freeshippingValue = !formData.freeshipping;
            setFormData({
                    ...formData,
                    freeshipping: freeshippingValue
            });
        }
        if(name == 'stockstatus'){
            setFormData(prevData => ({
                ...prevData,
                [name]: value
              }));
        }
        if(name == 'cod'){
            const codValue = !formData.cod;
            setFormData({
                    ...formData,
                    cod: codValue
            });
        }
    };
    const validateForm = () => {
        let newErrors = {};
        if (!formData.psubcategory) {
            newErrors.psubcategory = 'Must have to select a subcategory';
        }
        if (!formData.pcategory) {
            newErrors.pcategory = 'Must have to select a category';
        }
        if(!formData.shorttitle){
            newErrors.shorttitle = 'Short Title is required'; 
        }
        if(!formData.title){
            newErrors.title = 'Title is required';
        }
        if(!formData.stockstatus){
            newErrors.stockstatus = 'Stock Status is required';
        }
        if(!formData.quantitylimit){
            newErrors.quantitylimit = 'Quantity Limit is required';
        }
        if(!formData.hsncode){
            newErrors.hsncode = 'HSN Code is required';
        }
        if(!formData.taxpercentage){
            newErrors.taxpercentage = 'Tax Percentage is required'
        }
        if(!formData.priceinr){
            newErrors.priceinr = "Price in indian rupees is required"
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            submitButtonType == 'add' 
            ? dispatch(addProduct(formData))
            : dispatch(updateProduct(formData,id))
        }
    };
    return(
        <div className="card">
            <ModalPopup 
                showModal={showModal} 
                title = {modalTitle}
                body={modalBody}
                modalType = {modalType}
            />
            <div className="card-body">
                <h4 className="card-title">Add Product</h4>
                {(productCategoryLoading || addProductLoading || updateProductLoading) ? <Loading /> : null}
                <form className="forms-sample" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <DropDownOne title = "Product Category"
                                name="pcategory"
                                id="pcategory"
                                value={formData.pcategory}
                                placeHolder = "select one category"
                                data={productCategories?.data || []}
                                required = "true"
                                error={errors.pcategory}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <DropDownOne title = "Product Sub Category"
                                name="psubcategory"
                                id="psubcategory"
                                value={formData.psubcategory}
                                placeHolder = "select one Subcategory"
                                data={productSubCategories?.data || []}
                                required = "true"
                                error={errors.psubcategory}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <Text title = "Short Title"
                                name="shorttitle"
                                id = "shorttitle"
                                value = {formData.shorttitle}
                                placeHolder = "Short Title"
                                required = "true"
                                error={errors.shorttitle}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <Text title = "Title"
                                name="title"
                                id = "title"
                                value = {formData.title}
                                placeHolder = "Title"
                                required = "true"
                                error={errors.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <Radio title = "Stock Status"
                                name="stockstatus"
                                id = "stockstatus"
                                checked = {formData.stockstatus}
                                options={[
                                    {value: 'instock', title: 'In Stock'},
                                    {value: 'outofstock', title: 'Out of Stock'}
                                ]}
                                value = {formData.stockstatus}
                                placeHolder = "Stock Status"
                                required = "false"
                                error={errors.stockstatus}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <Text title = "Product Count"
                                name="productcount"
                                id = "productcount"
                                value = {formData.productcount}
                                placeHolder = "Product Count"
                                required = "true"
                                type = "number"
                                error={errors.productcount}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <Text title = "Quantity Limit (order)"
                                name="quantitylimit"
                                id = "quantitylimit"
                                value = {formData.quantitylimit}
                                placeHolder = "Enter Maximum Quantity Can Order(in nos)"
                                required = "true"
                                type = "number"
                                error={errors.quantitylimit}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <Checkbox
                                title = "Free Shipping"
                                name="freeshipping"
                                id = "freeshipping"
                                value = {formData.freeshipping}
                                placeHolder = "Free Shipping"
                                required = "false"
                                error={errors.freeshipping}
                                isChecked = {formData.freeshipping}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <Text title = "HSN Code"
                                name="hsncode"
                                id = "hsncode"
                                value = {formData.hsncode}
                                placeHolder = "HSN Code"
                                required = "true"
                                error={errors.hsncode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <Text title = "Tax Percentage"
                                name="taxpercentage"
                                id = "taxpercentage"
                                value = {formData.taxpercentage}
                                placeHolder = "Tax Percentage"
                                required = "true"
                                error={errors.taxpercentage}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <Text title = "Price (INR)"
                                name="priceinr"
                                id = "priceinr"
                                value = {formData.priceinr}
                                type = "number"
                                placeHolder = "Price in indian rupees"
                                required = "true"
                                error={errors.priceinr}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <Checkbox
                                title = "COD Available"
                                name="cod"
                                id = "cod"
                                value = {formData.cod}
                                placeHolder = "COD Available"
                                required = "false"
                                error={errors.cod}
                                isChecked = {formData.cod}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <SubmitButton type={submitButtonType}/>
                </form>
            </div>
        </div>
    )
}
export default AddProduct