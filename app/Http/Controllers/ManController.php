<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Traits\Pesan;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ManController extends Controller
{
    use Pesan;

    private $validasi = [
        "nama" => "required ",
        "kelas" => "required", 
        "absen" => "required",
    ];

    public function index (){
        return Inertia::render("Man/page1");
    }

    public function index2 () {
        return Inertia::render("Man/page2");
    }

    public function index3 (Request $request) {
        return inertia::render("Man/page3");
    }

    public function dataSiswa (Request $request){
        return response()->json(Siswa::latest()->where("nama","like","%".$request->query("cari")."%")->paginate(20));
    }

    public function store (Request $request){
        $validatedData = $request->validate($this->validasi);

        Siswa::create($validatedData);

        return redirect("/page3");
    }

    public function update (Request $request,Siswa $Siswa){
        $validatedData = $request->validate([
            "nama" => "required",
        ]);

        Siswa::where("id",$Siswa->id)->update($validatedData);

        return back();
    }

    public function destroy (Siswa $Siswa){
        Siswa::destroy($Siswa->id);

        return response()->json($this->pesanSuccess());
    }

}
