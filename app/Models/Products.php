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

    public function getAllproducts()
    {
        $products = DB::select("
            SELECT 
                P.title AS productTitle,
                P.stock AS stockStatus,
                P.stock_count AS stockCount,
                P.status As productStatus,
                P.price_rupees AS productUnitPrice,
                C.cat_name AS category,
                SC.subcategory AS subCategory
            FROM 
                product P
                LEFT JOIN category C ON C.id = P.cat_id
                LEFT JOIN sub_category SC ON SC.id = P.subcat_id
        ");
        return $products;
    }
}
