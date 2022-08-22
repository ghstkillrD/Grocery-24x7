//import e from "cors";
import React,{useEffect, useState} from "react";
import axios from "axios";
import AllProducts from "./allProducts";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";


function UpdateProduct(){


  




    const [pname,setName] = useState('');
    const [pPrice, setpPrice] = useState('');
    const [pDesc,setpDesc] = useState('');
    const [stockUnits,setstockUnits] = useState('');
    const[id, setID]= useState(null);


   

    useEffect( () =>
    {

      setID(localStorage.getItem('ID'))
      setName(localStorage.getItem('Name'));
      setpPrice(localStorage.getItem('Price'));
      setpDesc(localStorage.getItem('Description'));
      setstockUnits(localStorage.getItem('Stocks available'))
}, [] 
    );

    /*function sendData(e){

        e.preventDefault();
        alert("Insert");

        const newProduct ={

            pname,
            pPrice,
            pDesc,
            stockUnits

        }

        console.log(newProduct);

        axios.post("http://localhost:8070/product/add",newProduct).then(()=>{

            alert("student Added")
        }).catch((err)=>
        {
            alert(err);
            console.log(err)

        }
        )*/

        const updateAPIData = () => {
          axios.put(`http://localhost:8070/product/update/${id}`, {
            pname,
            pPrice,
            pDesc,
            stockUnits,
        }
          )}
      
        
          let history = useHistory();
          
//FORM VALIDATION

const priceChangeHandler = (e) => {
  //let nam = e.target.name;
  //let val =e.target.value;
 
    if (!Number(e)) {
      alert("Product Price must be a number");
    }
  
  
}

const stockChangeHandler = (e) => {
  //let nam = e.target.name;
  //let val =e.target.value;
 
    if (!Number(e)) {
      alert("Stock availabele must be a number");
    }
  
  
}
        

    



return(

    <form className="container"  >
  <div class="mb-3">
    <label for="pname" class="form-label">Product Name</label>
    <input type="text" class="form-control" id="pname" value={pname} placeholder="Enter Product Name"
    onChange={(e)=> {

        setName(e.target.value);

    }
    }
    />
   
  </div>
 
  <div class="mb-3">
    <label for="pPrice" class="form-label">Product Price</label>
    <input type="text" class="form-control" value={pPrice} id="pPrice"
    onChange={(e)=> {

        setpPrice(e.target.value);
        priceChangeHandler(e.target.value);

    }
    }/>
  </div>
 
  <div class="mb-3">
    <label for="pDesc" class="form-label">Product Description</label>
    <input type="text" class="form-control"   value={pDesc} id="pDesc"
       onChange={(e)=> {

        setpDesc(e.target.value);

    }
    }/>

  </div>

  <div class="mb-3">
    <label for="stockUnits" class="form-label">Stock Available</label>
    <input type="text" class="form-control" value={stockUnits} id="stockUnits"
      onChange={(e)=> {

        setstockUnits(e.target.value);
        stockChangeHandler(e.target.value);
    }
    }/>
  </div>


 
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <Link to={"/"}><button type="submit" class="btn btn-primary" onClick={()=>{updateAPIData();}}>Update</button></Link>
</form>




)



}






export default UpdateProduct;