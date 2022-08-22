//import e from "cors";
import React,{useState} from "react";
import axios from "axios";
import {storage} from "./firebase";
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router,Route} from "react-router-dom"


function AddProduct(){

    const [pname,setName] = useState("");
    const [pPrice, setpPrice] = useState("");
    const [pDesc,setpDesc] = useState("");
    const [stockUnits,setstockUnits] = useState("");
    const [pImage,setpImage] = useState("");

    function sendData(e){

        e.preventDefault();
        alert("Insert");

        const newProduct ={

            pname,
            pPrice,
            pDesc,
            stockUnits,
            pImage

        }

        console.log(newProduct);

        axios.post("http://localhost:8070/product/add",newProduct).then(()=>{

            alert("student Added")
        }).catch((err)=>
        {
            alert(err);
            console.log(err)

        }
        )


    }

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

    //IMAGE UPLOAD CODE
    const allInputs = {imgUrl: ''}
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(allInputs);
   // const [progress, setProgress] = useState(0);
    
    const handleChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };


    const handleUpload = () => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          console.log(snapShot)
          
         // setProgress(progress);
        },
      (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((firebaseUrl) => {
              setpImage(firebaseUrl);

            });
        }
      );
    };
    console.log("image: ", image);



// console.log(url);
//setUrl(url);
//    const [pImage,setpImage] = useState("");

    


return(
  <div>

    <div>
      <h3>Add a Product</h3>
      <br/>      <br/>
      <br/>

    </div>


    <form className="container"  >
  <div class="mb-3">
    <label for="pname" class="form-label">Product Name</label>
    <input type="text" class="form-control" id="pname" placeholder="Enter Product Name"
    onChange={(e)=> {

        setName(e.target.value);

    }
    }
    />
   
  </div>
 
  <div class="mb-3">
    <label for="pPrice" class="form-label">Product Price</label>
    <input type="text" class="form-control" id="pPrice" placeholder="Enter Product Price"
    onChange={(e)=> {

        setpPrice(e.target.value);
        priceChangeHandler(e.target.value);

    }
    }/>
  </div>
 
  <div class="mb-3">
    <label for="pDesc" class="form-label">Product Description</label>
    <input type="text" class="form-control" id="pDesc" placeholder="Enter Product Description"
       onChange={(e)=> {

        setpDesc(e.target.value);

    }
    }/>

  </div>

  <div class="mb-3">
    <label for="stockUnits" class="form-label">Stock Available</label>
    <input type="text" class="form-control" id="stockUnits" placeholder="Enter Stock Available"
      onChange={(e)=> {

        setstockUnits(e.target.value);
        stockChangeHandler(e.target.value);
    }
    }/>
  </div>

  
  
 
  
  

</form>

<div class="mb-3"style={{ backgroundColor: '#949494', paddingBottom:'50px',paddingTop:'50px', marginLeft:'300px', marginRight:'300px' }}>
  <input type="file" onChange={handleChange} />
  <Button onClick={handleUpload} variant="contained" color="white">Upload</Button>
  <img src={pImage} width='150px' height='150px' />
  </div>

  

 <Button type="submit" variant="contained" color="primary" onClick={sendData}> <Link to={"/"} style={{ color: '#FFF' }}>Submit</Link></Button>

</div>


)



}




// || "http://via.placeholder.com/300"

export default AddProduct;