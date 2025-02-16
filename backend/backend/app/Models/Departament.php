<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Departament extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'image_url'];

    public function otdels()
    {
        return $this->hasMany(Otdel::class);
    }

    public function sotrudniks()
    {
        return $this->hasMany(Sotrudnik::class);
    }
}
