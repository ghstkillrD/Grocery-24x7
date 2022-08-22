import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import axios from "axios";
import {toast} from "react-toastify";

function OrderDetails() {
  const {id} = useParams();
  const getURL = "http://localhost:8070/pendingOrder/get/" + id;
  let history = useHistory();

  const [currentOrder, setCurrentOrder] = useState();
  const [updatedOrderStatus, setUpdatedOrderStatus] = useState("");
  const [updatedLocationStatus, setUpdatedLocationStatus] = useState("");
  const [updatedComments, setUpdatedComments] = useState("");

  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsConfirmationDialogOpen(true);
  };

  const handleClose = () => {
    setIsConfirmationDialogOpen(false);
  };


  function handleUpdateClick() {
    axios
      .put(`http://localhost:8070/pendingOrder/update/${id}`, {
        OrderID: currentOrder.OrderID,
        payment: currentOrder.payment,
        customerName: currentOrder.customerName,
        orderDate: currentOrder.orderDate,
        dueDate: currentOrder.dueDate,
        price: currentOrder.price,
        telephoneNo: currentOrder.telephoneNo,
        deliveryAddress: currentOrder.deliveryAddress,
        comments: updatedComments,
        locationStatus: updatedLocationStatus,
        orderStatus: updatedOrderStatus,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Order details updated successfully', {
            position: "top-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error('Sorry! something went wrong, please try again', {
            position: "top-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  }

  function handleDeleteClick() {
    setIsConfirmationDialogOpen(false);
    axios.delete(`http://localhost:8070/pendingOrder/delete/${id}`).then((res) => {
      if (res.status === 200) {
        history.push("/");
        toast.success('Order deleted successfully', {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Sorry! something went wrong, please try again', {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  }

  function getOrderDetails() {
    axios
      .get(getURL)
      .then((res) => {
        console.log(res.data.order);
        setUpdatedOrderStatus(res.data.order.orderStatus);
        setUpdatedComments(res.data.order.comments);
        setUpdatedLocationStatus(res.data.order.locationStatus)
        setCurrentOrder(res.data.order);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    getOrderDetails();
  }, []);

  function showOrderDetails() {
    return (
      <>
        <Dialog
          open={isConfirmationDialogOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="px-3 py-2 mx-2"
        >
          <DialogTitle id="alert-dialog-title">
            Confirm action
            <hr/>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete order <b>#{currentOrder.OrderID}</b>?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="mb-2">
            <Button onClick={handleClose} className="mx-2">No</Button>
            <Button variant="contained" className="mx-2" onClick={handleDeleteClick} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box className="mx-2 pl-3">
              <h2>Order - #{currentOrder.OrderID}</h2>
              <hr/>
              <Box textAlign="left" lineHeight="2.2em" padding={5} fontSize="1.1em">
                <ul style={{listStyle: "none"}}>
                  <li>Price - <b>{currentOrder.price}</b></li>
                  <li>Customer Name - <b>{currentOrder.customerName}</b></li>
                  <li>Order Status -&nbsp;
                    <Select
                      id="order-status-select"
                      value={updatedOrderStatus}
                      onChange={(e) => {
                        setUpdatedOrderStatus(e.target.value);
                      }}
                      variant="outlined"
                    >
                      <MenuItem value={"Completed"}>&nbsp;Completed&nbsp;</MenuItem>
                      <MenuItem value={"Pending"}>&nbsp;Pending&nbsp;</MenuItem>
                      <MenuItem value={"Cancelled"}>&nbsp;Cancelled&nbsp;</MenuItem>
                    </Select>
                  </li>
                  <li>Order Date - <b>{currentOrder.orderDate}</b></li>
                  <li>Due Date - <b>{currentOrder.dueDate}</b></li>
                  <li>Telephone No - <b>{currentOrder.telephoneNo}</b></li>
                  <li>Delivery Address - <b>{currentOrder.deliveryAddress}</b></li>
                  <li>Location Status -&nbsp;
                    <Select
                      id="location-status-select"
                      value={updatedLocationStatus}
                      onChange={(e) => {
                        setUpdatedLocationStatus(e.target.value);
                      }}
                      variant="outlined"
                    >
                      <MenuItem value={"Main Warehouse"}>&nbsp;Main Warehouse&nbsp;</MenuItem>
                      <MenuItem value={"Regional Warehouse"}>&nbsp;Regional Warehouse&nbsp;</MenuItem>
                      <MenuItem value={"Dispatch van"}>&nbsp;Dispatch van&nbsp;</MenuItem>
                    </Select></li>
                </ul>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className="mx-2 pl-3">
              <h2>Comments</h2>
              <hr/>
              <Box padding={5} marginTop={3} marginBottom={2}>
                <TextField
                  id="outlined-multiline-static"
                  label="Order Comments"
                  multiline
                  rows={7}
                  fullWidth={true}
                  defaultValue={currentOrder.comments}
                  variant="outlined"
                  onChange={(e) => {
                    setUpdatedComments(e.target.value);
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Button variant="contained" className="mx-3" onClick={handleUpdateClick}>Update</Button>
                <Button variant="contained" className="mx-3" onClick={handleClickOpen}>Delete</Button>
                <Button variant="outlined" className="mx-3">Navigate</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <h2>Google Map</h2>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      {currentOrder ?
        showOrderDetails()
        :
        <Grid
          className='m-4'
          alignSelf='center'
          textAlign='center'
          align='center'
          justify='center'
        >
          <CircularProgress color="inherit"/>
          <br/>
          <br/>
          <Box className="my-3">Loading order details...</Box>
        </Grid>
      }
    </>
  );
}

export default OrderDetails;
