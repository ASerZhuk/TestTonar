<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Otdel extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'image_url'];

    public function departament()
    {
        return $this->belongsTo(Departament::class);
    }

    public function subOtdels()
    {
        return $this->hasMany(SubOtdel::class);
    }

    public function sotrudniks()
    {
        return $this->hasMany(Sotrudnik::class);
    }
}
