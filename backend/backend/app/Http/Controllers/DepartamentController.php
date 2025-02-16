<?php

namespace App\Http\Controllers;

use App\Models\Departament;
use Illuminate\Http\Request;

class DepartamentController extends Controller
{
   
    public function index()
    {
        $departaments = Departament::all();
        return response()->json($departaments);
    }

    public function show(Departament $departament)
    {
        return response()->json([
            'departament' => $departament,
            'has_otdels' => $departament->otdels()->exists()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image_url' => 'required|string'
        ]);

        $departament = Departament::create($request->all());
        return response()->json($departament, 201);
    }
}
