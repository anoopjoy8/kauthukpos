<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $primaryKey = 'fldAdminUserId';
    protected $fillable = [
        'fldName',
        'fldUserName',
        'fldEmail',
        'fldPassword',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    const CREATED_AT = 'fldCreatedAt';
    const UPDATED_AT = 'fldUpdatedAt';
    protected $table = 'tbladminUsers';
    protected $hidden = [
        'fldpassword',
        'remember_token',
    ];
    public function getAuthIdentifierName()
    {
        return 'fldEmail'; // Custom field for the identifier
    }
    public function getAuthPassword()
    {
        return $this->fldPassword; // Custom field for the password
    }

    // Ensure the email field is correctly mapped if you use it elsewhere
    public function getEmailForPasswordReset()
    {
        return $this->fldEmail;
    }
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
}
