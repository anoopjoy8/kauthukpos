<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Products extends Model
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'title'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    const CREATED_AT = 'fldCreatedAt';
    const UPDATED_AT = 'fldUpdatedAt';
    protected $table = 'product';

    public function getAllproductCategories()
    {
        $productCategories = DB::select("
            SELECT
                PC.cat_name,
                PC.url,
                PC.show_home,
                PC.id
            FROM
                category PC
            WHERE 
                PC.fldStatus = 1
            AND 
                PC.high_level_cat_id = 1;
        ");
        return $productCategories;
    }
    public function getProductSubCategories($category)
    {
        $productSubCategories = DB::select("
            SELECT
                SC.id,
                SC.subcategory
            FROM
                sub_category SC
            WHERE 
                SC.cat_id = $category;
        ");
        return $productSubCategories;
    }
    public function getAllproducts($limit,$offset,$search)
    {   
        try {
            $query = "
                SELECT 
                    P.id AS ID,
                    P.title AS productTitle,
                    P.shortTitle AS shortTitle,
                    P.stock AS stockStatus,
                    P.stock_count AS stockCount,
                    P.status AS productStatus,
                    P.price_rupees AS productUnitPrice,
                    C.cat_name AS category,
                    SC.subcategory AS subCategory
                FROM 
                    product P
                    LEFT JOIN category C ON C.id = P.cat_id
                    LEFT JOIN sub_category SC ON SC.id = P.subcat_id
            ";
            if (isset($search['title']) && !empty($search['title'])) {
                $query .= " WHERE P.title LIKE '%" . $search['title'] . "%'";
            }
            if (isset($search['pcategory']) && !empty($search['pcategory'])) {
                $query .= " WHERE P.cat_id = '" . $search['pcategory'] . "'";
            }
            if (isset($search['psubcategory']) && !empty($search['psubcategory'])) {
                $query .= " WHERE P.subcat_id = '" . $search['psubcategory'] . "'";
            }
            $query .= " ORDER BY P.id DESC LIMIT :limit OFFSET :offset";
            $products = DB::select($query, [
                'limit' => $limit,
                'offset' => $offset
            ]);
            return $products;
        }catch(\Exception $e){
            return response()->json([
                'success' => false
            ]);
        }
    }
    public function addNewProduct($formdata)
    {
        try {
            $query = "INSERT INTO product (
                cat_id, 
                subcat_id, 
                shortTitle, 
                title, 
                quantity_limit,
                stock,
                stock_count, 
                free_shipping, 
                hsn_code, 
                tax, 
                price_rupees, 
                cod,
                date_created
            ) VALUES (:pcategory, 
                :psubcategory, 
                :shorttitle, 
                :title,
                :quantitylimit, 
                :stockstatus, 
                :productcount, 
                :freeshipping, 
                :hsncode, 
                :taxpercentage, 
                :priceinr, 
                :cod,
                :date_created
            )";
            $params = [
                'pcategory'     => $formdata['pcategory'],
                'psubcategory'  => $formdata['psubcategory'],
                'shorttitle'    => $formdata['shorttitle'],
                'title'         => $formdata['title'],
                'quantitylimit' => $formdata['quantitylimit'],
                'stockstatus'   => $formdata['stockstatus'] == 'instock' ? 1 : 0,
                'productcount'  => $formdata['productcount'],
                'freeshipping'  => (bool) $formdata['freeshipping'],
                'hsncode'       => $formdata['hsncode'],
                'taxpercentage' => $formdata['taxpercentage'],
                'priceinr'      => $formdata['priceinr'],
                'cod'           => $formdata['cod'] ? 'yes' : 'no',
                'date_created'  => now()
            ];
            $productAdded = DB::insert($query, $params);
            return response()->json([
                'success' => true
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success' => false
            ]);
        }
    }
    public function editProductData($productID)
    {
        try {
            $products = DB::select("
                SELECT
                    P.id AS ID,
                    P.title AS productTitle,
                    p.shortTitle AS shortTitle,
                    P.stock AS stockStatus,
                    P.stock_count AS stockCount,
                    P.status As productStatus,
                    p.free_shipping AS freeShipping,
                    P.price_rupees AS productUnitPrice,
                    p.quantity_limit AS quantityLimit,
                    p.hsn_code AS hsnCode,
                    p.tax AS tax,
                    p.cod AS cod,
                    C.id AS category,
                    SC.id AS subCategory
                FROM 
                    product P
                    LEFT JOIN category C ON C.id = P.cat_id
                    LEFT JOIN sub_category SC ON SC.id = P.subcat_id
                WHERE 
                    P.id = $productID
            ");
            return $products;
        }catch(\Exception $e){
            return response()->json([
                'success' => false
            ]);
        }
    }
    public function updateProduct ($productID, $formdata)
    {
        try {
            $query = "UPDATE 
                product 
            SET
                cat_id = :pcategory, 
                subcat_id = :psubcategory, 
                shortTitle = :shorttitle, 
                title = :title, 
                quantity_limit = :quantitylimit, 
                stock = :stockstatus, 
                stock_count = :productcount, 
                free_shipping = :freeshipping, 
                hsn_code = :hsncode, 
                tax = :taxpercentage, 
                price_rupees = :priceinr, 
                cod = :cod,
                fldUpdatedAt = :date_updated
            WHERE 
                id = :productId";
            
            $params = [
                'pcategory'     => $formdata['pcategory'],
                'psubcategory'  => $formdata['psubcategory'],
                'shorttitle'    => $formdata['shorttitle'],
                'title'         => $formdata['title'],
                'quantitylimit' => $formdata['quantitylimit'],
                'stockstatus'   => $formdata['stockstatus'] == 'instock' ? 'yes' : 'no',
                'productcount'  => $formdata['productcount'],
                'freeshipping'  => $formdata['freeshipping'] ? 'yes' : 'no',
                'hsncode'       => $formdata['hsncode'],
                'taxpercentage' => $formdata['taxpercentage'],
                'priceinr'      => $formdata['priceinr'],
                'cod'           => $formdata['cod'] ? 'yes' : 'no',
                'date_updated'  => now(),
                'productId'     => $productID
            ];
            $productUpdated = DB::update($query, $params);
            return response()->json([
                'success' => true
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success' => false
            ]);
        }
    }
}
