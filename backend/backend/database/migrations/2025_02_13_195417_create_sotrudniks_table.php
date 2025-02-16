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
        Schema::create('sotrudniks', function (Blueprint $table) {
            $table->id();
            
            $table->string('first_name');
            $table->string('last_name');
            $table->string('image_url');
            $table->string('phone');
            $table->string('profession');

            $table->foreignId('departament_id')
                ->constrained('departaments')
                ->onDelete('cascade');
                
            $table->foreignId('otdel_id')
                ->nullable()
                ->constrained('otdels')
                ->onDelete('cascade');
                
            $table->foreignId('sub_otdel_id')
                ->nullable()
                ->constrained('sub_otdels')
                ->onDelete('cascade');
                
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sotrudniks');
    }
};
