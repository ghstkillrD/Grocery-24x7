import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllPendingOrder() {
  const [PendingOrder, setPendingOrder] = useState([]);

  useEffect(() => {
    function getPendingOrder() {
      axios
        .get('http://localhost:8070/pendingOrder/')
        .then((res) => {
          setPendingOrder(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getPendingOrder();
  }, []);

  function onDelete(id) {
    axios
      .delete(`http://localhost:8070/pendingOrder/delete/${id}`)
      .then((res) => {
        alert('Successfully Deleted');
        this.getPendingOrder();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='container' className='relative'>
      <table className='table table-hover' style={{ marginTop: '40px' }}>
        <thead>
          <tr>
            <th scope='col'>OrderID</th>
            <th scope='col'>First Name</th>
            <th scope='col'>Last Name</th>
            <th scope='col'>Personal Address</th>
            <th scope='col'>Personal Mail</th>
            <th scope='col'>University Mail</th>
            <th scope='col'>LinkedIn Profile</th>
            <th scope='col'>Contact Number</th>
            <th scope='col'>Home Contact Number</th>
            <th scope='col'>Primary College</th>
            <th scope='col'>Secondary College</th>
            <th scope='col'>Univeristy</th>
          </tr>
        </thead>
        <tbody>
          {PendingOrder.map((PendingOrder, index) => (
            <tr key={index}>
              <th scope='row'>{index + 1}</th>
              <td>
                <a
                  href={`/pendingOrder/${PendingOrder._id}`}
                  style={{ textDecoration: 'none' }}
                >
                  {PendingOrder.firstname}
                </a>
              </td>
              <td>{PendingOrder.OrderID}</td>
              <td>{PendingOrder.distance}</td>
              <td>{PendingOrder.traffic}</td>
              <td>{PendingOrder.payment}</td>
              <td>{PendingOrder.customerName}</td>
              <td>{PendingOrder.orderDate}</td>
              <td>{PendingOrder.dueDate}</td>
              <td>{PendingOrder.eta}</td>
              <td>{PendingOrder.telephoneNo}</td>
              <td>{PendingOrder.deliveryAddress}</td>
              <td>{PendingOrder.comments}</td>
              <td>{PendingOrder.locationStatus}</td>
              <td>
                <a
                  className='btn btn-warning'
                  href={`/pendingOrder/edit/${PendingOrder._id}`}
                >
                  <i className='fas fa-edit'></i>&nbsp;Edit
                </a>
                &nbsp;
                <br></br> <br></br>
                <a
                  className='btn btn-danger'
                  href='#'
                  onClick={() => onDelete(PendingOrder._id)}
                >
                  <i className='fas fa-edit'></i>&nbsp;Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
