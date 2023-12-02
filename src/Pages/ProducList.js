import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProducList = () => {
    const [product, setProduct] = useState([]);
    useEffect(()=>{
        getProductList();
    },[])
    
    const getProductList = async()=>{
        let result = await fetch("http://localhost:5000/products")
        result = await result.json();
        setProduct(result)
    }
    const DeleteItem = async(id)=>{
        console.log("adasd")
        let deletProduct = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
        });
        deletProduct = await deletProduct.json()
        if(deletProduct){
            getProductList();
        }   
    } 
    const getSearchResult = async(e) =>{
        let key = e.target.value
        console.log(key)  
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`)
            result = await result.json()
            setProduct(result)
        }else{
            getProductList()
        }
    }

    return (
        <>
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6'>
                    <input type="text" className="form-control mb-5" placeholder='Searh Here' onChange={getSearchResult} />
                </div>
                <div className='col-12'>
                        <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">S.No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                product.length>0 ?product.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{item.product}</td>
                                        <td>{item.price}</td>
                                        <td>{item.category}</td>
                                        <td>{item.company}</td>
                                        <td>
                                            <Link className='btn btn-warning me-2' to={"/update/"+ item._id}>Update</Link>
                                            <button className='btn btn-danger me-2' onClick={()=>{DeleteItem(item._id)}}>Delete</button>
                                        </td>
                                    </tr>
                                )})
                                : <h2>No Result Found</h2>
                            }
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
        </>
  )
}

export default ProducList