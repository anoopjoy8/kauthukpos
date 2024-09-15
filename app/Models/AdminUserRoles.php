<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AdminUserRoles extends Model
{
    protected $primaryKey = 'fldAdminUserRoleId';
    protected $fillable = [
        'fldRoleTitle',
        'fldStatus'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    const CREATED_AT = 'fldCreatedAt';
    const UPDATED_AT = 'fldUpdatedAt';
    protected $table = 'tblAdminUserRoles';

    public function getAlladminUsers()
    {
        $adminUsers = DB::select("
            SELECT 
                AU.fldAdminUserId AS AdminUserID,
                AU.fldName AS Name,
                AU.fldRole AS RoleId,
                CASE 
                    WHEN AU.fldStatus = 1 THEN 'Active'
                    ELSE 'Inactive'
                END AS Status,
                AUR.fldRoleTitle AS Role
            FROM 
                tblAdminUsers AU
                INNER JOIN tblAdminUserRoles AUR ON AUR.fldAdminUserRoleID = AU.fldRole 
        ");
        return $adminUsers;
    }
    public function getAlladminUserRoles()
    {
        $getAllAdminUserRoles = DB::select('
            SELECT 
                AUR.fldRoleTitle,
                AUR.fldAdminUserRoleId
            FROM 
                tblAdminUserRoles AUR
            WHERE 
                fldStatus = 1'
        );
        return $getAllAdminUserRoles;
    }
}
