<?php

namespace App\Http\Controllers;

use App\Models\Departament;
use App\Models\Otdel;
use App\Models\Sotrudnik;
use App\Models\SubOtdel;
use Illuminate\Http\Request;

class SotrudnikController extends Controller
{
    public function byDepartament(Departament $departament)
    {
        $sotrudniks = Sotrudnik::where('departament_id', $departament->id)
            ->whereNull('otdel_id')
            ->get();
            
        return response()->json($sotrudniks);
    }

    public function byOtdel(Departament $departament, Otdel $otdel)
    {
        $sotrudniks = Sotrudnik::where('departament_id', $departament->id)
            ->where('otdel_id', $otdel->id)
            ->whereNull('sub_otdel_id')
            ->get();
            
        return response()->json($sotrudniks);
    }

    public function bySubOtdel(Departament $departament, Otdel $otdel, SubOtdel $subOtdel)
    {
        $sotrudniks = Sotrudnik::where('departament_id', $departament->id)
            ->where('otdel_id', $otdel->id)
            ->where('sub_otdel_id', $subOtdel->id)
            ->get();
            
        return response()->json($sotrudniks);
    }

    public function store(Request $request, Departament $departament)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'image_url' => 'required|string',
            'phone' => 'required|string',
            'profession' => 'required|string'
        ]);

        $sotrudnik = new Sotrudnik($request->all());
        $sotrudnik->departament_id = $departament->id;
        $sotrudnik->save();

        return response()->json($sotrudnik, 201);
    }

    public function storeWithOtdel(Request $request, Departament $departament, Otdel $otdel)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'image_url' => 'required|string',
            'phone' => 'required|string',
            'profession' => 'required|string'
        ]);

        $sotrudnik = new Sotrudnik($request->all());
        $sotrudnik->departament_id = $departament->id;
        $sotrudnik->otdel_id = $otdel->id;
        $sotrudnik->save();

        return response()->json($sotrudnik, 201);
    }

    public function storeWithSubOtdel(Request $request, Departament $departament, Otdel $otdel, SubOtdel $subOtdel)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'image_url' => 'required|string',
            'phone' => 'required|string',
            'profession' => 'required|string'
        ]);

        $sotrudnik = new Sotrudnik($request->all());
        $sotrudnik->departament_id = $departament->id;
        $sotrudnik->otdel_id = $otdel->id;
        $sotrudnik->sub_otdel_id = $subOtdel->id;
        $sotrudnik->save();

        return response()->json($sotrudnik, 201);
    }
}
