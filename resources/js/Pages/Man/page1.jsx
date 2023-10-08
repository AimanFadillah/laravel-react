import { useState } from "react"
import { useForm } from "@inertiajs/react"
import Navbar from "./navbar";


export default function Page1 () {
    const [data,setData] = useState([]);
    const [inputTambah,setInputTambah] = useState("");
    const [inputEdit,setInputEdit] = useState("");
    const [idEdit,setIdEdit] = useState("");

    function tambahData () {  
      if(inputTambah === "") return 
      setData([inputTambah,...data]);
      setInputTambah("")
    }

    function hapusData (id) {
      const baru = data.filter((data,index) => index !== id)
      setData(baru);
    }

    function editData () {
      if(inputEdit === "") return
      const baru = [...data]
      baru[idEdit] = inputEdit;
      setData(baru)
    }

    function gantiPosisi (id) {
      const baru = [...data];
      const dataIndexIni = baru[id];
      const dataIndexDepan = baru[id - 1];
      if(!dataIndexDepan) return
      baru[id - 1] = dataIndexIni;
      baru[id] = dataIndexDepan;
      setData(baru);
    }


    return <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <Navbar></Navbar>
          <div className="col-md-10">
            <form onSubmit={(e) => {e.preventDefault();tambahData()}}  >
              <div className="input-group mb-3">
                  <input type="text" className="form-control" value={inputTambah} onChange={e => setInputTambah(e.target.value)} ></input>
                  <button className="btn btn-outline-secondary" type="submit" id="buttonCreate">Tambah</button>
              </div>
            </form>
          </div>
        </div>
        <div className="row align-content-center" style={{ flexDirection:"column" }} >
          { data.map( (dt,index) =>  (
            <div  key={index} className="col-md-10 bg-success text-light mb-1 rounded p-1">
              <div className="d-flex justify-content-between">
                {dt}
                <div className="">
                  <button className="badge me-2 bg-secondary" onClick={() => gantiPosisi(index)} >Atas</button>
                  <button className="badge me-2 bg-primary" onClick={() => {setInputEdit(data[index]),setIdEdit(index)} } data-bs-toggle="modal" data-bs-target="#exampleModal" >Edit</button>
                  <button className="badge bg-danger" onClick={() => hapusData(index)} >Hapus</button>
                </div>
              </div>
            </div>
          ))} 
        </div>
      </div>

      <div className="modal fade" id="exampleModal" >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <input type="text" className="form-control mb-1" value={inputEdit} onChange={e => setInputEdit(e.target.value)} ></input>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary" data-bs-dismiss="modal"  style={{ width:"100%" }} onClick={editData} type="button" >Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
}