import React,{useState, useEffect} from "react";
import { Button } from '@material-ui/core';
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import axios from "axios";

export default function DeleteRequest(){

    const useStyles = makeStyles({

        
    
          buttonStyle :{
              
              fontWeight: "bold",
              padding:'20 px',
              paddingRight: '20px',
              paddingLeft: '20px'
    
          }
      })

      const classes = useStyles();


    //const [requestID, setRequestID] = useState("");
    const [reason, setReason] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    

    const [_id, setID] = useState(null);

    useEffect(() => {
        setID(localStorage.getItem('RID'))
        //setRequestID(localStorage.getItem('RID'));
        setReason(localStorage.getItem('Reason'));
        setDesc(localStorage.getItem('Description'));
        setDate(localStorage.getItem('Date'));
        
    }, []);

    
    /*const d = new Date(date);
    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };    
    const mydate = d.toLocaleDateString(
        'en-gb',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
      );*/

    //const a = Intl.DateTimeFormat(navigator.language, { weekday: 'long', month: 'short', day: 'numeric' , year:'numeric'}).format(new Date()) // Friday, Dec 27
    
    //const e = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: true }).format(new Date()) // 2:00 PM
   

   const onDelete = (id) => {
        

        //let {id,reason} = requests;
        //localStorage.setItem('RID', id);
        //setID(localStorage.getItem('ID'));
        //localStorage.setItem('Reason', reason);
        axios.delete(`http://localhost:8070/request/rdelete/${_id}`).then(() => {
            
                alert("Deleted successfully");
                window.location.replace("/r");   
        }).catch((err) =>{
            alert(err)
        })
    }
    
    /*function sendData(e){
        e.preventDefault();

        const newRequest = {
            requestID,
            date,
            desc
        }

        axios.post("http://localhost:8070/request/add",newRequest).then(()=>{
            alert("Student Added")
        }).catch((err) =>{
            alert(err)
        })

    }*/

    return(
        <div>
            
            
                <div>
                   
                    <p><br/>
                        Reason : {reason}<br/>
                        Description : {desc}<br/>
                        Requested Date : {date}<br/><br/>
                        

                            <Button startIcon={<DeleteOutlinedIcon/>} className={classes.buttonStyle}
                            variant="contained" color="secondary" onClick={() => onDelete(_id)}>Delete</Button>
                        
                        
                            
                        
                    </p>
                </div>
                
            
        </div>
    )

}