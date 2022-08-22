import React, { useState } from 'react';
import axios from 'axios';

export default function AddcashonDelivery() {
  const [OrderID, setOrderID] = useState('');
  const [accountNumber, setaccountNumber] = useState('');
  const [amount, setamount] = useState('');
  const [date, setdate] = useState('');
  const [bank, setbank] = useState('');
  const [branch, setbranch] = useState('');

  function sendData(e) {
    e.preventDefault();

    const newcashonDelivery = {
      OrderID,
      accountNumber,
      amount,
      date,
      bank,
      branch,
    };

    axios
      .post('http://localhost:8070/cashonDelivery/add', newcashonDelivery)
      .then(() => {
        alert('Cash on delivery added');
      })
      .catch((err) => {
        alert(err);
      });
  }

  const amountHandler = (e) => {
    //let nam = e.target.name;
    //let val =e.target.value;

    if (!Number(e)) {
      alert('Amount must be a number');
    }
  };

  const accountHandler = (e) => {
    //let nam = e.target.name;
    //let val =e.target.value;

    if (!Number(e)) {
      alert('Amount must be a number');
    }
  };

  return (
    <div className='container'>
      <form onSubmit={sendData}>
        <div className='form-group1'>
          <label for='exampleInputOrderID'>Order ID</label>
          <input
            type='text'
            className='form-control'
            id='exampleInputOrderID'
            aria-describedby='emailHelp'
            placeholder='Enter Order ID'
            onChange={(e) => {
              setOrderID(e.target.value);
            }}
          />
        </div>{' '}
        <br />
        <div className='form-group1'>
          <label for='exampleInputaccountNumber'>Account Number</label>
          <input
            type='text'
            className='form-control'
            id='exampleInputaccountNumber'
            placeholder='Enter Account Number'
            onChange={(e) => {
              setaccountNumber(e.target.value);
              accountHandler(e.target.value);
            }}
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your Account number with anyone else.
          </small>
        </div>{' '}
        <br />
        <div className='form-group1'>
          <label for='exampleInputamount'>Amount</label>
          <input
            type='text'
            className='form-control'
            id='exampleInputamount'
            placeholder='Enter Amount (Rs.)'
            onChange={(e) => {
              setamount(e.target.value);
              amountHandler(e.target.value);
            }}
          />
        </div>{' '}
        <br />
        <div className='form-group1'>
          <label for='exampleInputdate'>Date (DD/MM/YYYY)</label>
          <input
            type='text'
            className='form-control'
            id='exampleInputdate'
            placeholder='Enter Date'
            onChange={(e) => {
              setdate(e.target.value);
            }}
          />
        </div>{' '}
        <br />
        <div className='form-group1'>
          <label for='exampleInputbank'>Bank</label>
          <input
            type='text'
            className='form-control'
            id='exampleInputbank'
            placeholder='Enter Bank name'
            onChange={(e) => {
              setbank(e.target.value);
            }}
          />
        </div>{' '}
        <br />
        <div className='form-group1'>
          <label for='exampleInputbranch'>Branch</label>
          <input
            type='text'
            className='form-control'
            id='exampleInputbranch'
            placeholder='Enter Branch of the bank'
            onChange={(e) => {
              setbranch(e.target.value);
            }}
          />
        </div>{' '}
        <br />
        <button type='reset' className='btn btn-primary'>
          Reset
        </button>{' '}
        <t /> <t />
        <t />
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
}
