import React from 'react'
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';



function Home() {
    return (
        <div className="home_page">
            <br></br>
            <br></br>
            <h2>Welcome to Grocery 24x7!</h2>
            <br></br>

            <h4>Are You a Vendor or a Customer?!</h4>
            <br></br>

            <h3>Click on the button below</h3>     
            <br></br>
            <br></br>
            <Link to = "/addnew"><Button variant="contained" color="black"  type="submit">Vendor</Button></Link>

                
                <br></br>
                <br></br>
                <br></br>

                
            <Link to = "/add"><Button variant="contained" color="black" >Customer </Button></Link>

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

export default Home