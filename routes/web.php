<?php

use App\Http\Controllers\ManController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::get('/',[ManController::class,"index"]);
Route::get("/page2",[ManController::class,"index2"]);
Route::get("/page3",[ManController::class,"index3"]);
Route::patch("/page3",[ManController::class,"dataSiswa"]);
Route::post("/page2",[ManController::class,"store"])->name("buat-siswa");
Route::delete("/page3/{Siswa:id}",[ManController::class,"destroy"]);
Route::put("/page3/{Siswa:id}",[ManController::class,"update"]);
Route::get("/test",function () {
    return Inertia::render("Man/test");
});

require __DIR__.'/auth.php';
