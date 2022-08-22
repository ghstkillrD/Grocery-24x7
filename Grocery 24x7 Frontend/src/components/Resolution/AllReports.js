import React,{useState,useEffect} from "react";
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import jspdf from 'jspdf'
import "jspdf-autotable"
import img from '../../images/logo3.png';

import swal from 'sweetalert';

export default function AllReports(){

    const [reports, setReports] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");

    const deleteReport=(id) =>{
        axios.delete(`http://localhost:8070/report/delete/${id}`).then(()=>{
            swal({
                title: "Are you sure?",
                text: "The Item Will be Deleted from Reports List",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("The file has been deleted!", 
                    "success",
                  );  setTimeout(function(){
                    window.location.reload();
                   },1000);
                } else {
                  swal("File Is Not Deleted");
                }
              });
        
        })
      }

    useEffect(() =>{
        function getReports(){
            axios.get("http://localhost:8070/report/").then((res) => {
                setReports(res.data);
            
            }).catch((err) => {
                alert(err.massage);
            })
        }
        getReports();

    }, [])

// genarate pdf

const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Full Name", "User Name", "Wrongdoer UserName", "Issue"];
    const tableRows = [];
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];

    tickets.map(ticket => {
        const ticketData = [
            ticket.name,
            ticket.yusername,
            ticket.ousername,
            ticket.issue,
 
        ];
        tableRows.push(ticketData);
    })
    doc.text("Grocery 24x7", 70, 8).setFontSize(13);
    doc.text("Resolution Center Detail Report", 14, 16).setFontSize(13);
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    //right down width height
    doc.addImage(img, 'JPEG', 170, 8, 25, 25);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY:35});
    doc.save("Resolution Center Details Report.pdf");
};

    return (
        <>
        <div class="head" >

        <br></br>
   <div style = {{display:"flex", alignItems:"center", justifyContent:"center"}}><h2> Reports</h2> </div> 
   <br></br>
   <br></br>
   </div>
   
   <div class="buttonn">
       <button type="button" class="btn btn-secondary btn-sm" onClick={() => generatePDF(reports)} >Generate Report</button> <br></br>
   </div>

   <br></br>

    <div class="lft">

<div class="card" >

<div style = {{display:"flex", alignItems:"center", justifyContent:"center"}} class="button">
<input type = "text" placeholder = "search..." className = "form-control" style={{margintop:50, marginbottom:20, width:"40%"}}
    onChange = {(e) => {
        setsearchTerm(e.target.value);
    }} />
    </div>
    <br></br>
    <br></br>
    <div style = {{display:"flex", alignItems:"center", justifyContent:"center"}} class="button">
   <table class="table table-bordered">
        <table class="table table-hover" >
                   <thead>
                       <tr>
                           <th>Name</th>
                           <th>User Name</th>
                           <th>Wrongdoer UserName</th>
                           <th>Issue</th>
                           <th>Delete</th>
                          

                       </tr>
                   </thead>
                   <tbody>
                       {
                           reports.filter(val=> {
                               if(searchTerm == ''){
                                   return val;
                               }else if (
                                   val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.yusername.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.ousername.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   val.issue.toLowerCase().includes(searchTerm.toLowerCase()) 
                               ){
                                   return val;
                               }
                           }).map(function (f) {
                               return <tr>
                                   

                                   <td >{f.name}</td>
                                   <td >{f.yusername} </td>
                                   <td >{f.ousername} </td>
                                   <td >{f.issue} </td>
                                  

                                   <td > <IconButton aria-label="delete"  onClick={() => deleteReport(f._id)}>
                                         <DeleteIcon fontSize="small" />
                                         </IconButton></td>

                                 
                               </tr>

                           })
                       }
                   </tbody>
                   </table>
               </table>
              
        </div>
        </div>
        <br></br>
    <br></br>
    <br></br>
    <br></br><br></br>
    <br></br>
</div>
   

</>)
}