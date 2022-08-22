import React,{useState, useEffect} from "react";
import { Button } from '@material-ui/core';
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";

export default function ItemSearch(){

    
    const [_id, setid] = useState("");
    //const [requests, setRequest] = useState([]);
   
    const [searchTerm, setsearchTerm] = useState("");

    useEffect(() => {
        setsearchTerm(localStorage.getItem('isearch'))
        
        
    }, []);

    const [items, setItems] = useState([]);
    
        useEffect(() => {
            function getItems() {
                axios.get("http://localhost:8070/product/").then((res) => {
                    console.log(res.data);
                    setItems(res.data);
                }).catch((err) => {
                    alert(err.message);
                })
            }
            getItems();
        }, [])


    return(
        <div>
            
            <p>
                <div>
                   
                    <p><br/>
                        
                    <input type = "text" placeholder = "search..." className = "form-control" value={searchTerm}
                    style={{margintop:50, marginbottom:20, width:"40%"}}
    onChange = {(e) => {
        setsearchTerm(e.target.value);
    }} />
           {items.filter(val=> {
                               if(searchTerm == ''){
                                   return val;
                               }else if (
                                   val.pname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.pPrice.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.pDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.stockUnits.toLowerCase().includes(searchTerm.toLowerCase()) 
                               ){
                                   return val;
                               }
                           }).map(function (f) {
                            return <div>
                                
                                <p>
                                {f.pname}<br/>
                                {f.pPrice} <br/>
                                {f.pDesc} <br/>
                                {f.stockUnits} <br/>
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