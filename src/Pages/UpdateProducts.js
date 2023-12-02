import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProducts = () => {
    const [product, setProduct ] = useState("");
    const [price, setPrice ] = useState("");
    const [category, setCategory ] = useState("");
    const [company, setCompany ] = useState("");
    const navigate = useNavigate()
    const params = useParams();

    useEffect(()=>{
        getProductResult();
    },[])
    const getProductResult = async()=>{
        console.log(params.id)
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result = await result.json();
        console.log(result)
        setProduct(result.product)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    const updateResult = async()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method: "put",
            body: JSON.stringify({product, price, company, category }),
            headers: {
                "Content-Type" : "application/json"
            }
        });
        result = await result.json()
        console.log(result)
        navigate("/products")
    }
    return (
        <div>
            <div className='container my-5'>
                <form className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Product Name</label>
                        <input type='text' className="form-control" name="product" value={product} onChange={(e)=>setProduct(e.target.value)} placeholder='Product Name'/>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Price</label>  
                        <input type='text' className="form-control" name="price" placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">category</label>
                        <input type='text' className="form-control" name="category" placeholder='Category' value={category} onChange={(e)=>setCategory(e.target.value)}/>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Company</label>
                        <input type='text' className="form-control" name="company" placeholder='Company' value={company} onChange={(e)=>setCompany(e.target.value)}/>
                    </div>
                    <div className="col-md-6 mb-3">
                        <button type="button" onClick={updateResult} className="btn btn-warning">Update Product</button>
                    </div>
                    <div>
                        {/* { <div class="alert alert-success" role="alert">Item Updated Successfully</div>} */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProducts