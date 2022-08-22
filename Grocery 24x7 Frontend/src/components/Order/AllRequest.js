import React,{useState, useEffect} from "react";
import { Button } from '@material-ui/core';
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import axios from "axios";

import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";

export default function AllRequest(){

    const useStyles = makeStyles({

        navlink : {
            textDecoration: "none"
        },
        
        buttonStyle :{
              
            fontWeight: "bold",
            padding:'20 px',
            paddingRight: '20px',
            paddingLeft: '20px'
  
        }
    
          
    
      })
    
      const classes = useStyles();
    
    const [requests, setRequests] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");
  
    //const [date, setDate] = useState([]);

    useEffect(() => {
        function getRequests(){
            axios.get("http://localhost:8070/request/r").then((res) => {
                setRequests(res.data);
                //setDate(res.date);
                //const now = new Date(requests.date).toLocaleDateString();
                //const mydate = now.toLocaleDateString();
                   
            }).catch((err) => {
                alert(err.message);
            })
        }
        getRequests();
    },[])

    
    const setData = (requests) => {
        let { _id,orderID, reason,desc,date} = requests;
        localStorage.setItem('RID', _id);
        localStorage.setItem('OID', orderID);
        localStorage.setItem('Reason', reason);
        localStorage.setItem('Description', desc);
        localStorage.setItem('Date', date);
        
        //console.log(requests);
    }


    /*const [date, setDate] = useState("");
    useEffect(() => {
        
        setDate(localStorage.getItem('Date'));
        
    }, []);*/

    //const reqDate = new Date(date);
    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };    
    //const mydate = reqDate.toLocaleDateString();
    /*const myDateString = 0;
    const getData = () => {
        axios.get("http://localhost:8070/request/r").then((res) => {
                setRequests(res.data);
                myDateString = res.data.date;

             })
    }*/

    
    /*const onDelete = (requests) => {
        

        let {id,reason} = requests;
        localStorage.setItem('RID', id);
        //setID(localStorage.getItem('ID'));
        localStorage.setItem('Reason', reason);
        axios.delete(`http://localhost:8070/request/rdelete/${id}`).then(() => {
            getData();
        })
    }
    */

    return(
        <div className="container">
           
           <input type = "text" placeholder = "search..." className = "form-control" style={{margintop:50, marginbottom:20, width:"40%"}}
    onChange = {(e) => {
        setsearchTerm(e.target.value);
    }} />
    

                   <p>
                       {
                           requests.filter(val=> {
                               if(searchTerm == ''){
                                   return val;
                               }else if (
                                   val.orderID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.desc.toLowerCase().includes(searchTerm.toLowerCase()) 
                               ){
                                   return val;
                               }
                           }).map(function (f) {
                               return <div>
                                   

                                   <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemText primary="Request ID:" secondary={f._id}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Ordere ID:" secondary={f.orderID}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Reason" secondary={f.reason}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Description:" secondary={f.desc}  />
      </ListItem>
      <ListItem>
        <ListItemText primary="Requested Date:" secondary={f.date}  />
      </ListItem>
      

    </List>
   
    <Link to='/rupdate/:rid' className={classes.navlink}>
                            <Button variant="contained" onClick={() => setData(requests)}>Update</Button>
                        </Link> &nbsp;
                        <Link to='/rdelete/:id' className={classes.navlink}>
                            <Button startIcon={<DeleteOutlinedIcon/>} className={classes.buttonStyle}
                             variant="contained" color="secondary" onClick={() => setData(requests)}>Delete</Button>
                        </Link>
                               </div>

                           })
                       }
                   </p>
                   


           
            
        </div>
    )
}