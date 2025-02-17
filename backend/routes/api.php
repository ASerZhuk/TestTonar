<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DepartamentController;
use App\Http\Controllers\OtdelController;
use App\Http\Controllers\SubOtdelController;
use App\Http\Controllers\SotrudnikController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Маршруты для департаментов
Route::get('/departaments', [DepartamentController::class, 'index']);
Route::post('/departaments', [DepartamentController::class, 'store']);
Route::get('/departaments/{departament}', [DepartamentController::class, 'show']);

// Маршруты для отделов
Route::get('/departaments/{departament}/otdels', [OtdelController::class, 'index']);
Route::post('/departaments/{departament}/otdels', [OtdelController::class, 'store']);
Route::get('/departaments/{departament}/otdels/{otdel}', [OtdelController::class, 'show']);

// Маршруты для подотделов
Route::get('/departaments/{departament}/otdels/{otdel}/sub-otdels', [SubOtdelController::class, 'index']);
Route::post('/departaments/{departament}/otdels/{otdel}/sub-otdels', [SubOtdelController::class, 'store']);
Route::get('/departaments/{departament}/otdels/{otdel}/sub-otdels/{subOtdel}', [SubOtdelController::class, 'show']);

// Маршруты для сотрудников
Route::get('/departaments/{departament}/sotrudniks', [SotrudnikController::class, 'byDepartament']);
Route::post('/departaments/{departament}/sotrudniks', [SotrudnikController::class, 'store']);
Route::get('/departaments/{departament}/otdels/{otdel}/sotrudniks', [SotrudnikController::class, 'byOtdel']);
Route::post('/departaments/{departament}/otdels/{otdel}/sotrudniks', [SotrudnikController::class, 'storeWithOtdel']);
Route::get('/departaments/{departament}/otdels/{otdel}/sub-otdels/{subOtdel}/sotrudniks', [SotrudnikController::class, 'bySubOtdel']);
Route::post('/departaments/{departament}/otdels/{otdel}/sub-otdels/{subOtdel}/sotrudniks', [SotrudnikController::class, 'storeWithSubOtdel']); 