<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sotrudnik extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'image_url',
        'phone',
        'profession',
        'departament_id',
        'otdel_id',
        'sub_otdel_id'
    ];

    public function departament()
    {
        return $this->belongsTo(Departament::class);
    }

    public function otdel()
    {
        return $this->belongsTo(Otdel::class);
    }

    public function subOtdel()
    {
        return $this->belongsTo(SubOtdel::class);
    }
}
