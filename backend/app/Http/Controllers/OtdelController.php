<?php

namespace App\Http\Controllers;

use App\Models\Departament;
use App\Models\Otdel;
use Illuminate\Http\Request;

class OtdelController extends Controller
{
    public function index(Departament $departament)
    {
        return response()->json($departament->otdels);
    }

    public function show(Departament $departament, Otdel $otdel)
    {
        return response()->json($otdel);
    }

    public function store(Request $request, Departament $departament)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image_url' => 'required|string'
        ]);

        $otdel = $departament->otdels()->create($request->all());
        return response()->json($otdel, 201);
    }
}
