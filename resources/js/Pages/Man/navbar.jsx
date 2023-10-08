import { Link } from "@inertiajs/react";

export default function Navbar () {
    return <>
        <div className="col-md-10">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Belajar React</h1>
              <div className="">
                <Link href="/" className="btn btn-dark me-1" >Page 1</Link>
                <Link href="/page2" className="btn btn-dark me-1" >Page 2</Link>
                <Link href="/page3" className="btn btn-dark" >Page 3</Link>
              </div>
            </div>
          </div>
    </>
}