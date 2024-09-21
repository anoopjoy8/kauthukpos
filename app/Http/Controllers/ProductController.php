<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Products;

class ProductController extends Controller
{
    public function getAllProducts(Request $request)
    {
        try {
            $ProductModel = new Products();
            $searchData = json_decode($request->input('search'), true);
            $products = $ProductModel->getAllproducts($request->limit,$request->offset,$searchData);
            $productsData = [];
            foreach ($products as $product) {
                $productsData[] = [
                    'ID'               => encrypt($product->ID),
                    'title'            => $product->productTitle,
                    'shortTitle'       => $product->shortTitle,
                    'stock'            => $product->stockStatus,
                    'status'           => $product->productStatus,
                    'productUnitPrice' => $product->productUnitPrice,
                    'productCategory'  => $product->category
                ];
            }
            return response()->json([
                'success' => true,
                'data' => $productsData
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => "An error occurred while fetching Data",
            ], 500);
        }
    }
    public function getAllProductCategories(Request $request)
    {
        try {
            $ProductModel = new Products();
            $productCategories = $ProductModel->getAllproductCategories();
            $productCategoriesData = [];
            foreach ($productCategories as $productCategory) {
                $productCategoriesData[] = [
                    'title'            => $productCategory->cat_name,
                    'value'            => $productCategory->id,
                    'url'              => $productCategory->url,
                    'show_home'        => $productCategory->show_home
                ];
            }
            return response()->json([
                'success' => true,
                'data' => $productCategoriesData
            ]);
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error1' => $e,
                'error' => "An error occurred while fetching Categories"
            ], 500);
        }
    }
    public function getProductSubCategory(Request $request)
    {
        try {
            $ProductModel = new Products();
            $productSubCategories = $ProductModel->getProductSubCategories($request->category);
            $productSubCategoriesData = [];
            foreach ($productSubCategories as $productSubCategory) {
                $productSubCategoriesData[] = [
                    'title'     => $productSubCategory->subcategory,
                    'value'     => $productSubCategory->id
                ];
            }
            return response()->json([
                'success' => true,
                'data' => $productSubCategoriesData
            ]);
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error1' => $e,
                'error' => "An error occurred while fetching subCategories"
            ], 500);
        }
    }
    public function addNewProduct(Request $request)
    {
        try {
            $request->validate([
                'formData.pcategory'     => 'required|numeric',
                'formData.psubcategory'  => 'required|numeric',
                'formData.shorttitle'    => 'required|string|min:2',
                'formData.title'         => 'required|string|min:2',
                'formData.stockstatus'   => 'required|string|min:2',
                'formData.quantitylimit' => 'required|numeric'
            ]);
            $formData     = $request->input('formData');
            $ProductModel = new Products();
            $addProduct   = $ProductModel->addNewProduct($formData);
            return response()->json([
                'success' => true,
                'data' => ""
            ]);
        }catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => "An error occurred while adding product"
            ], 500);
        }
    }
    public function editProductData(Request $request)
    {
        try {
            $ProductModel = new Products();
            $decryptedProductID = decrypt($request->productID);
            $product = $ProductModel->editProductData($decryptedProductID)[0];
            $productData = [
                'ID'                    => encrypt($product->ID),
                'title'                 => $product->productTitle,
                'shorttitle'            => $product->shortTitle,
                'stockstatus'           => $product->stockStatus == 'yes' ? 'instock' : 'outofstock',
                'status'                => $product->productStatus,
                'priceinr'              => $product->productUnitPrice,
                'pcategory'             => $product->category,
                'psubcategory'          => $product->subCategory,
                'freeshipping'          => $product->freeShipping == 'yes' ? true : false,
                'productcount'          => $product->stockCount,
                'quantitylimit'         => $product->quantityLimit,
                'hsncode'               => $product->hsnCode,
                'taxpercentage'         => $product->tax,
                'cod'                   => $product->cod == 'yes' ? true : false,
            ];          
            return response()->json([
                'success' => true,
                'data' => $productData
            ]);
        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => "An error occurred while fetching product"
            ], 500);
        }
    }
    public function updateProduct(Request $request)
    {
        try {
            $request->validate([
                'formData.pcategory'     => 'required|numeric',
                'formData.psubcategory'  => 'required|numeric',
                'formData.shorttitle'    => 'required|string|min:2',
                'formData.title'         => 'required|string|min:2',
                'formData.stockstatus'   => 'required|string|min:2',
                'formData.quantitylimit' => 'required|numeric'
            ]);
            $formData     = $request->input('formData');
            $productID    = decrypt($request->input('productID'));
            $ProductModel = new Products();
            $updateProduct   = $ProductModel->updateProduct($productID,$formData);
            return response()->json([
                'success' => true,
                'data' => "Product updated Succesfully"
            ]);
        }catch(\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => "An error occurred while adding product"
            ], 500);
        }
    }
}