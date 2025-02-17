<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sub_otdels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image_url');
            
            $table->foreignId('departament_id')
                ->constrained('departaments')
                ->onDelete('cascade');
                
            $table->foreignId('otdel_id')
                ->constrained('otdels')
                ->onDelete('cascade');
                
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sub_otdels');
    }
}; 