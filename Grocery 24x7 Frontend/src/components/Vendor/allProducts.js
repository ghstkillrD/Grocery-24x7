import React, {useState, useEffect} from "react";
import Header from "./Header";
import AddStudent from "./AddProduct";
import Button from '@material-ui/core/Button';
import axios from "axios";
import {Link} from "react-router-dom";
//import { ObjectId } from "bson";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import jsPDF from "jspdf";
import logo2 from "../../images/logo3.png"

function AllProducts() {

    const [products,setProducts] = useState([]);

    useEffect(() => {

        function getProducts(){ 

            axios.get("http://localhost:8070/product/ ").then((res)=>{
            console.log(res);
            setProducts(res.data);

            }).catch((err)=>{
            alert(err.message);
        })

        }



       
       
        getProducts();



    },[])


  
    const Titles = ["Name", "Price", "Description","Stocks","Image"];
    
    const setData = (products) => {
      let{_id,pname,pPrice,pDesc,stockUnits} = products;
      localStorage.setItem('ID',_id);
      localStorage.setItem('Name',pname);
      localStorage.setItem('Price',pPrice);
      localStorage.setItem('Description',pDesc);
      localStorage.setItem('Stocks available',stockUnits);


    }

     

    const onDelete =(_id)=>{
      axios.delete(`http://localhost:8070/product/delete/${_id}`) .then(
        
        (res) => {
         alert("Deleted Successfully");
        window.location.reload();
        
        })
      }

//SEARCH ITEM

const [searchTerm, setsearchTerm] = useState("");


// //Generate PDF 

// pdfGenerate=()=>{

//     var doc = new jsPDF("l","px",'a4','false')
//     doc.addImage(logo2,'png',40,40,50,50)
//     doc.text(100, 20, 'Grocery 24x7', 'center');
//     doc.text(100,20,'Summary Report of Stocks','center')
    
//     var today = new Date();
//     var newdat = "Date Printed : "+ today;
//     doc.text(107,68,newdat);


// }



    return(
        <div>
           
                <h1> All Products</h1>


{/*<Button  onClick={pdfGenerate}>Create Summary Report </Button>*/}

<div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100px'}}>
        <input type = "text"  placeholder = "search for a product..." className = "form-control" style={{margintop:50, marginbottom:20, width:"40%" }}
    onChange = {(e) => {
        setsearchTerm(e.target.value);
    }} />     
</div>
        
    <React.Fragment>
      <div>
      <table class="table">
        <thead >
          <tr>
            {Titles.map((Titles) => {
              return <th scope="col">{Titles}</th>;
            })}
          </tr>
        </thead>
        <tbody>
        {
        products.filter(val=> {
          if(searchTerm == ''){
              return val;
          }else if (
              val.pname.toLowerCase().includes(searchTerm.toLowerCase()) //||
              //val.yusername.toLowerCase().includes(searchTerm.toLowerCase()) ||
              //val.ousername.toLowerCase().includes(searchTerm.toLowerCase()) ||
              //val.issue.toLowerCase().includes(searchTerm.toLowerCase()) 
          ){
              return val;
          }
      }).map((products) => {
return (
    <tr>
      <td scope="row">{products.pname}</td>
      <td scope="row">{products.pPrice}</td>
      <td scope="row">{products.pDesc}</td>
      <td scope="row">{products.stockUnits}</td>
      <td scope="row"><img src={products.pImage} width="30px" height="30px"/></td>
      <td scope="row"><Link to={"/update/"+products._id}><Button variant="contained" color="black" onClick={() =>setData(products)} 
      size="small"
      >Update</Button></Link></td>
      <td scope="row">
        <Button 
        startIcon={<DeleteOutlinedIcon/>}
      variant="contained" color="secondary" size="small"
      onClick={()=>onDelete(products._id)} >Delete</Button></td>


    </tr>

   
  );
})}


        </tbody>
        </table>
      </div>
    </React.Fragment>

        </div>


    )

}

export default AllProducts;
//"/update/"+products._id