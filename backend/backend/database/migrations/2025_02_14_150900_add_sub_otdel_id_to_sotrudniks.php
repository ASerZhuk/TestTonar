<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sotrudniks', function (Blueprint $table) {
            $table->foreignId('sub_otdel_id')
                ->nullable()
                ->constrained('sub_otdels')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('sotrudniks', function (Blueprint $table) {
            $table->dropForeign(['sub_otdel_id']);
            $table->dropColumn('sub_otdel_id');
        });
    }
}; 