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
            $products = $ProductModel->getAllproducts($request->limit,$request->offset);
            $productsData = [];
            foreach ($products as $product) {
                $productsData[] = [
                    'title'            => $product->productTitle,
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
                'error' => "An error occurred while fetching Data"
            ], 500);
        }
    }
}