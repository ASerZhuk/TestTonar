<?php

namespace App\Http\Controllers;

use App\Models\Departament;
use App\Models\Otdel;
use App\Models\SubOtdel;
use Illuminate\Http\Request;

class SubOtdelController extends Controller
{
    public function index(Departament $departament, Otdel $otdel)
    {
        return response()->json($otdel->subOtdels);
    }

    public function show(Departament $departament, Otdel $otdel, SubOtdel $subOtdel)
    {
        return response()->json($subOtdel);
    }

    public function store(Request $request, Departament $departament, Otdel $otdel)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image_url' => 'required|string'
        ]);

        $subOtdel = new SubOtdel($request->all());
        $subOtdel->departament_id = $departament->id;
        $subOtdel->otdel_id = $otdel->id;
        $subOtdel->save();

        return response()->json($subOtdel, 201);
    }
} 