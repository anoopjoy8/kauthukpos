<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbladminUsers', function (Blueprint $table) {
            $table->bigIncrements('fldAdminUserId'); // Primary key: id
            $table->string('fldName');
            $table->string('fldUserName')->default(''); // Column for username
            $table->string('fldEmail')->unique(); // Unique column for email
            $table->string('fldPassword'); // Column for password
            $table->tinyInteger('fldRole')->default(1); // Column for role with default value
            $table->tinyInteger('fldStatus')->default(0);
            $table->timestamp('fldCreatedAt')->nullable(); // Custom column for created at
            $table->timestamp('fldUpdatedAt')->nullable(); // Custom column for updated at
            $table->timestamp('fldDeletedAt')->nullable(); // Custom column for soft delete
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbladminUsers');
    }
};
