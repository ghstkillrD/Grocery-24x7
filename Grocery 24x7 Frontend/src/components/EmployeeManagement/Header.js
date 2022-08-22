/* eslint-disable */
import React from "react";
import {Link} from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import logo3 from '../images/logo3.png';
import SearchIcon from "@material-ui/icons/SearchOutlined"

function Header(){


  const useStyles = makeStyles({

    root : {
        color:'white',
        padding:'0 30px'
    },

      buttonStyle :{
          
          fontWeight: "bold",
          padding:'20 px',
          paddingRight: '20px',
          paddingLeft: '20px'

      }

  })

  const classes = useStyles();

    return(

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow" style={{height:"85px"}}>
        <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src={logo3} width="45" height="45" />
        </a>
          <a class="navbar-brand" href="#"><b>Grocery24/7</b></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
               <Link to="/" class="nav-link">Home</Link>
              </li>
              <li class="nav-item">
                <Link to="/add" class="nav-link">Add Employee</Link>
              </li>
              <li class="nav-item">
                <Link to="/Up" class="nav-link">Update Employee</Link>
              </li>
              

            </ul>
            <div class="d-flex flex-row"  > 
            <form class="d-flex" >
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"  />
              <Button startIcon={<SearchIcon/>}className={classes.buttonStyle}  variant="contained" color="inherit" size="medium" type="submit">Search</Button>
            </form>
              <IconButton className={classes.root} color="secondary" size="inherit">
                    <AccountCircleIcon />
              </IconButton>

            </div>
          </div>
        </div>
      </nav>




    )


}

export default Header;