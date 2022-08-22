import React,{useState, useEffect} from "react";
import { Button } from '@material-ui/core';
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";

export default function Search(){

    
    const [_id, setid] = useState("");
    //const [requests, setRequest] = useState([]);
    const [requests, setRequests] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");

    useEffect(() => {
        setid(localStorage.getItem('id'))
        
        
    }, []);

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


    /*useEffect(() => {
        function getRequests(){
            axios.get(`http://localhost:8070/request/rget/${_id}`).then((res) => {
                //setRequest(res.data);
                setDesc(res.data);
                console.log(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getRequests();
    },[])*/

    

    
    
   

    return(
        <div>
            
            <p>
                <div>
                   
                    <p><br/>
                        
                    <input type = "text" placeholder = "search..." className = "form-control" value={_id}
                    style={{margintop:50, marginbottom:20, width:"40%"}}
    onChange = {(e) => {
        setsearchTerm(e.target.value);
    }} />
           {requests.filter(val=> {
                               if(searchTerm == ''){
                                   return val;
                               }else if (
                                   val.orderID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.date.toLowerCase().includes(searchTerm.toLowerCase()) 
                               ){
                                   return val;
                               }
                           }).map(function (f) {
                            return <div>
                                
                                <p>
                                {f.orderID}<br/>
                                {f.reason} <br/>
                                {f.desc} <br/>
                                {f.date} <br/>
                                </p>
                                </div>
                        })
                    }
                       
                        
                        
                        
                    </p>
                </div>
                
            </p>
            
        </div>
    )
}