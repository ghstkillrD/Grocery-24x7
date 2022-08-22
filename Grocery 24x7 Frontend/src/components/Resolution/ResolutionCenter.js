import React, { useState } from "react"; 
import axios from "axios";
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';


function ResolutionCenter(){
    return(

        <div className="container">
            
        <br></br>
        <br></br>
        <h2>Welcome to the Resolution Center!</h2>
        <br></br>

        <h4>Do you have any issues to report? Do You have any concerns that needs our attention?</h4>
        <br></br>

        <h3>We Are Here To Help!</h3>     
        <br></br>
        <br></br>
        <Link to = "/addnew"><Button variant="contained" color="black"  type="submit">Add a Report</Button></Link>

            
            <br></br>
            <br></br>
            <br></br>

            
        <Link to = "/view"><Button variant="contained" color="black" >View My Reports </Button></Link>

            <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br><br></br>
    <br></br>

        </div>
                
    )
}

export default ResolutionCenter;