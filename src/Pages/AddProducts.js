import React, { useEffect, useState } from 'react'

const AddProducts = () => {
    const [product, setProduct ] = useState("");
    const [price, setPrice ] = useState("");
    const [category, setCategory ] = useState("");
    const [company, setCompany ] = useState("");
    const [error, setError] = useState(false)
    const [added, setAdded] = useState(false)

    const auth = localStorage.getItem("user")
    const getUserid = JSON.parse(auth)._id
    const addProduct = async()=>{
        console.warn(!product)
        if(!product || !price || !company || !category){
            setError(true)
        }
        const auth = localStorage.getItem("user")
        const userID = JSON.parse(auth)._id
        let result = await fetch("http://localhost:5000/addproduct",{
            method: "post",
            body: JSON.stringify({product, price, company, category, userID }),
            headers: {
                "Content-Type" : "application/json"
            }
        });
        result = await result.json()
        if(result){
            setAdded(true)
        }
        return false;
    }
  return (
    <div className='container my-5'>
        <form className="row">
            <div className="col-md-6 mb-3">
                <label className="form-label">Product Name</label>
                <input type='text' className="form-control" name="product" value={product} onChange={(e)=>setProduct(e.target.value)} placeholder='Product Name'/>
                {error && !product && <small style={{color: "red", display: "block"}}>Enter Valid Product name</small>}
            </div>
            <div className="col-md-6 mb-3">
                <label className="form-label">Price</label>  
                <input type='text' className="form-control" name="price" placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} />
                {error && !price && <small style={{color: "red", display: "block"}}>Enter Valid Price</small>}
            
            </div>
            <div className="col-md-6 mb-3">
                <label className="form-label">category</label>
                <input type='text' className="form-control" name="category" placeholder='Category' value={category} onChange={(e)=>setCategory(e.target.value)}/>
                {error && !category && <small style={{color: "red", display: "block"}}>Enter Valid Category</small>}
            
            </div>
            <div className="col-md-6 mb-3">
                <label className="form-label">Company</label>
                <input type='text' className="form-control" name="company" placeholder='Company' value={company} onChange={(e)=>setCompany(e.target.value)}/>
                {error && !company && <small style={{color: "red", display: "block"}}>Enter Valid Company</small>}
            
            </div>
            <div className="col-md-6 mb-3">
                <button type="button" onClick={addProduct} className="btn btn-danger">Add Product</button>
            </div>
            <div>
                { added && <div class="alert alert-success" role="alert">Item Added Successfully</div>}
            </div>
        </form>
    </div>
  )
}

export default AddProducts