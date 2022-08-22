/* eslint-disable */
import React, {useState,useEffect} from "react";
import AddEmployee from "./AddEmployee";
import {Link} from "react-router-dom";
import axios from "axios";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Button from '@material-ui/core/Button';
import jspdf from 'jspdf'
import "jspdf-autotable"
import img from '../images/logo3.png';



//receive

export default function AllEmployees(){
    const [employees,setEmployees] = useState([]);
    

    useEffect(() => {
        function getEmployees(){
            axios.get("http://localhost:8070/employee/ ")
            .then((res)=>{
            console.log(res);
            setEmployees(res.data);

            }).catch((err)=>{
            alert(err.message);
        })
        }

        getEmployees();

    }, [])

   /* const Titels = ["EmployeeNo", 
                    "FirstName",
                    "EmailAddress", 
                    "HomeAddress",
                    "PhoneNo"];*/

         //update

    const setData = (employees) => { 
        let {_id, EmployeeNo, Name, EmailAddress, HomeAddress, PhoneNo} = employees;
        localStorage.setItem('ID', _id);
        localStorage.setItem('EmployeeNo', EmployeeNo);
        localStorage.setItem('Name', Name);
        localStorage.setItem('EmailAddress', EmailAddress);
        localStorage.setItem('HomeAddress', HomeAddress);
        localStorage.setItem('PhoneNo', PhoneNo);
    
    }


    //delete
    const onDelete =(_id)=>{
        axios.delete(`http://localhost:8070/employee/delete/${_id}`)
         .then((res) => {
           alert("Deleted Successfully");
          window.location.reload();
          
          })
        }




    // genarate pdf

    const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["EmployeeNo", "Name", "EmailAddress", "HomeAddress","PhoneNo"];
    const tableRows = [];
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    tickets.map(ticket => {
        const ticketData = [
            ticket.EmployeeNo,
            ticket.Name,
            ticket.EmailAddress,
            ticket.HomeAddress,
            ticket.PhoneNo,
 
        ];
        tableRows.push(ticketData);
    })
    doc.text("Grocery 24x7", 70, 8).setFontSize(13);
    doc.text("All Employee Detail Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    //right down width height
    doc.addImage(img, 'JPEG', 170, 8, 25, 25);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
    doc.save("Employee Details Report.pdf");
};


return(
    <div >
        
            <h1> All Employees </h1>

            <div class="buttonn">
                    <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(employees)} >Generate Report</button> <br></br>
            </div>

        

            <div>
            <table class="table">
                    <thead>
                    <tr>
                           <th>EmployeeNo</th>
                           <th>Name</th>
                           <th>EmailAddress</th>
                           <th>HomeAddress</th>
                           <th>PhoneNo</th>
                           <th>Action</th>
                    
                    </tr>
                    </thead> 


                    {employees.map((employees) => {return(


                    <tbody>
                        <tr>
                    <td scope="row">{employees.EmployeeNo}</td>
                    <td scope="row">{employees.Name}</td>
                    <td scope="row">{employees.EmailAddress}</td>
                    <td scope="row">{employees.HomeAddress}</td>
                    <td scope="row">{employees.PhoneNo}</td>
                    <td scope="row"><Link to="/Up">
                        <Button 
                        variant="contained" color="black" 
                        onClick={() =>setData(employees)} size="small">Update</Button></Link></td>
                    <td scope="row">
                        <Button 
                        startIcon={<DeleteOutlinedIcon/>}
                        variant="contained" color="secondary" size="small"
                        onClick={()=>onDelete(employees._id)} >Delete</Button></td>


      
                    </tr>
                  
                    </tbody>
                    );
                    })}
            </table>
            </div>
                    
            
     </div>
     )
}


