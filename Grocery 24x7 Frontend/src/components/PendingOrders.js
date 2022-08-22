import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Box, Chip, InputAdornment, OutlinedInput } from '@material-ui/core';
import Calendar from 'react-calendar';
import { CalendarToday } from '@material-ui/icons';

function Allorder() {
  const [order, setorder] = useState([]);
  const [showingOrderStatus, setShowingOrderStatus] = useState('Completed');
  const [showingOrders, setShowingOrders] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    function getorder() {
      axios
        .get('http://localhost:8070/pendingOrder/')
        .then((res) => {
          console.log(res);
          setorder(res.data);
          setShowingOrders(order);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getorder();
  }, []);

  const Titles = [
    'Order ID',
    'Due Date',
    'Price',
    'Location',
    'Order Status',
  ];

  const setData = (order) => {
    let {
      OrderID,
      dueDate,
      price,
      locationStatus,
      orderStatus,
    } = order;
    localStorage.setItem('OrderID', OrderID);
    localStorage.setItem('dueDate', dueDate);
    localStorage.setItem('price', price);
    localStorage.setItem('locationStatus', locationStatus);
    localStorage.setItem('orderStatus', orderStatus);
  };

  const onDelete = (_id) => {
    axios
      .delete(`http://localhost:8070/pendingOrder/delete/${_id}`)
      .then((res) => {
        alert('Deleted Successfully');
        window.location.reload();
      });
  };

  useEffect(() => {
    setShowingOrders(
      order.filter((currentOrder) => {
        return (
          new Date(currentOrder.dueDate).toDateString() ===
          selectedDate.toDateString() & currentOrder.orderStatus === showingOrderStatus
        );
      })
    );
  }, [selectedDate, showingOrderStatus]);

  // useEffect(()=>{
  //   setShowingOrders(
  //     showingOrders.filter((currentOrder)=>{
  //       console.log(currentOrder.orderStatus);
  //       return (
  //         currentOrder.orderStatus === showingOrderStatus
  //       );
  //     })
  //   )
  // }, [showingOrderStatus])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box>
            <h1>
              <span className='pt-3'>{showingOrderStatus} orders on</span>
              <OutlinedInput
                className='ml-4'
                id='selected-date'
                value={selectedDate.toDateString()}
                disabled={true}
                endAdornment={
                  <InputAdornment position='end'>
                    <CalendarToday />
                  </InputAdornment>
                }
              />
            </h1>
            <br /> <br /> <br />
            <Box className='ml-4 mr-3'>
              {showingOrders.length > 0 ? (
                <table className='table ml-md-3 mr-md-4 px-2'>
                  <thead>
                    <tr>
                      {Titles.map((Titles) => {
                        return <th scope='col'>{Titles}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {showingOrders.map((order) => {
                      return (
                        <tr key={order.OrderID}>
                          <td>{order.OrderID}</td>
                          <td>{order.dueDate}</td>
                          <td>{order.price}</td>
                          <td>{order.locationStatus}</td>
                          <td>{order.orderStatus}</td>
                          <td>
                            <Link to={'/details/' + order._id}>
                              <Button
                                variant='contained'
                                color='black'
                                onClick={() => setData(order)}
                                size='small'
                              >
                                Details
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h4 style={{ color: '#888888' }}>
                  No orders on {selectedDate.toDateString()}
                </h4>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <Box className='mt-2 mb-4 mr-0'>
              <Chip
                label='Completed'
                variant='outlined'
                color={showingOrderStatus === 'Completed' ? 'primary' : ''}
                onClick={() => {
                  setShowingOrderStatus('Completed');
                }}
                className='mx-2 px-2 my-2'
              />
              <Chip
                label='Pending'
                variant='outlined'
                color={showingOrderStatus === 'Pending' ? 'primary' : ''}
                onClick={() => {
                  setShowingOrderStatus('Pending');
                }}
                className='mx-2 px-2 my-2'
              />
              <Chip
                label='Cancelled'
                variant='outlined'
                color={showingOrderStatus === 'Cancelled' ? 'primary' : ''}
                onClick={() => {
                  setShowingOrderStatus('Cancelled');
                }}
                className='mx-2 px-2 my-2'
              />
            </Box>
          </Box>
          <Grid
            className='mt-5 mb-2'
            alignSelf='center'
            textAlign='center'
            align='center'
            justify='center'
          >
            <Calendar onChange={setSelectedDate} value={selectedDate} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Allorder;
//"/update/"+order._id
