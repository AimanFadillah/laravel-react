import { useEffect } from "react";
import Navbar from "./navbar";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";

export default function Page2 () {

    const { data, setData, post,errors} = useForm({
        nama:"",
        kelas:"",
        absen:"",
    });

    async function kirimData (e) {
        e.preventDefault()
        post(route("buat-siswa"))
    }

    function aturData (e){
        setData(e.target.name,e.target.value);
    }

    useEffect(() => {
        
    })

    return <>
        <div className="container mt-5">
            <div className="row justify-content-center ">
                <Navbar></Navbar>
            </div>
            <div className="row justify-content-center mt-3"> 
                <div className="col-md-7">
                    <form onSubmit={kirimData} className="shadow bg-primary rounded p-3">
                        <h1 className="text-center fw-bold" >Form</h1>
                        {!errors.nama ? null : 
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                {errors.nama}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        }
                        <div className="mb-3">
                            <label className="form-label fs-5">Nama</label>
                            <input type="text" value={data.nama} onChange={aturData}  name="nama" className="form-control" placeholder="Masukkan nama" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fs-5">Kelas</label>
                            <input type="text" name="kelas" value={data.kelas} onChange={aturData} className="form-control" placeholder="Masukkan Kelas" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fs-5">Absen</label>
                            <input type="text" name="absen" value={data.absen} onChange={aturData} className="form-control" placeholder="Masukkan Absen" />
                        </div>
                        <button className="bg-success rounded py-2 text-light" style={{ width:"100%" }} >Kirim</button>
                    </form>
                </div>
            </div>            
        </div>
    </>
}