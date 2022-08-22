import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import logo3 from '../../../images/logo3.png';
import SearchIcon from "@material-ui/icons/SearchOutlined"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"


function Header() {
    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth


    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <li className="drop-nav">
            <Link to="#" className="avatar">
            <img src={user.avatar} alt=""/> {user.name} <i className="fas fa-angle-down"></i>
            </Link>
            <ul className="dropdown">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
        </li>
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

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

    return (
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow" style={{height:"85px"}}>
        <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src={logo3} width="45" height="45" />
        </a>
          <a class="navbar-brand" href="#"><b>Grocery 24/7</b></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
               <Link to="/" class="nav-link">Home</Link>
              </li>
              <li class="nav-item">
                <Link to="/add" class="nav-link">Add Product</Link>
              </li>
              <li class="nav-item">
                <Link to="/i" class="nav-link">Items</Link>
              </li>
              <li class="nav-item">
                <Link  class="nav-link" to="/o">My Orders</Link>
              </li>
              <li class="nav-item">
                <Link to="/addReport" class="nav-link">Resolution Center</Link>
              </li>
           
            </ul>
            
          </div>
        </div>
      </nav>

            <div class="d-flex flex-row"  > 
                <form class="d-flex" >
                    <input class="form-control me-2" type="search" placeholder="Search"  aria-label="Search" size = "20" width=""/>
                    <Button startIcon={<SearchIcon/>}className={classes.buttonStyle}  variant="contained" color="inherit" size="medium" type="submit">Search</Button>
                </form>
                <ul style={transForm}>
                <li><Link to="/c"><i className="fas fa-shopping-cart"></i> Cart</Link></li>
                {
                    isLogged
                    ? userLink()
                    :<li><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
                }
                
            </ul>
            </div>

        
        </header>
    )
}

export default Header