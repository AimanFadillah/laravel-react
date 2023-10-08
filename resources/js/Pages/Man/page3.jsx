import { useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useForm } from "@inertiajs/react";

export default function Page3(promps) {
    const {data,setData,put} = useForm({
        id:"",
        index:"",
        nama:"",
    });
    const [dataSiswa, setDataSiswa] = useState([]);
    const [time, setTime] = useState();
    const [page, setPage] = useState(1);
    const [cari,setCari] = useState("");

    useEffect(() => {
        ambilData();
    }, []);

    function ambilData(pagination = page,reset = false) {
        clearTimeout(time);
        const tm = setTimeout(
            () => {
                axios
                    .patch(window.location.href + `?page=${pagination}&cari=${cari}`)
                    .then((res) => {
                        reset ? setDataSiswa(res.data.data) : setDataSiswa([...dataSiswa, ...res.data.data]);
                        setPage(pagination + 1);
                    });
            },
            pagination == 1 ? 0 : 500
        );
        setTime(tm);
    }

    function cariData (e){
        e.preventDefault();
        ambilData(1,true);
    }

    function editData (index){
        const siswa = dataSiswa[index];
        setData({
            nama:siswa.nama,
            id:siswa.id,
            index,
        })
    }

    function updateData (e){
        e.preventDefault()
        put(`/page3/${data.id}`,{
            onSuccess:() => {
                const baru = [...dataSiswa];
                const baru2 = baru[data.index];
                baru2["nama"] = data.nama 
                baru[data.index] = baru2;
                setDataSiswa(baru);
            }
        });
    }

    function hapusData (id,index) {
        axios.delete(`/page3/${id}`)
        const baru = [...dataSiswa];
        baru.splice(index,1);
        setDataSiswa(baru);
    }



    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <Navbar></Navbar>
                    <div className="col-md-10 mb-2">
                        <form onSubmit={cariData} className="input-group" >
                            <input type="search" value={cari} onChange={(e) => setCari(e.target.value)} className="form-control" />
                            <button className="btn btn-dark" >Cari</button>
                        </form>
                    </div>
                </div>
                <InfiniteScroll
                    dataLength={dataSiswa.length}
                    next={ambilData}
                    hasMore={true}
                    className="row justify-content-center"
                >
                    {dataSiswa.map((siswa, index) => (
                        <div
                            key={index}
                            className="col-md-10 bg-success text-light mb-1 rounded p-1"
                        >
                            <div className="d-flex justify-content-between">
                                {siswa.nama}
                                <div className="">
                                    <button className="badge me-2 bg-primary"  onClick={() => editData(index)} data-bs-toggle="modal" data-bs-target="#exampleModal" >Edit</button>
                                    <button className="badge bg-danger" onClick={() => hapusData(siswa.id,index)} >Hapus</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>

            <div className="modal fade" id="exampleModal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <form onSubmit={updateData} > 
                            <div className="mb-3" >
                                <label htmlFor="nama" className="form-label" >Nama</label>
                                <input type="text" value={data.nama} onChange={(e) => setData("nama",e.target.value)} className="form-control" />
                            </div> 
                            <button  style={{ width:"100%" }} data-bs-dismiss="modal" className="btn btn-primary" >Update</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}
