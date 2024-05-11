import React, { useEffect, useState } from "react";
import LayoutsPage from "../components/LayoutsPage";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Modal, Form, Input, Select, message } from "antd";
import { render } from "@testing-library/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

//useSelector state for the table <EditOutlined /> <DeleteOutlined />

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.rootReducer);
  //       // Check if cartSelector is an array before using it as dataSource
  //   const dataSource = Array.isArray(cartSelector) ? cartSelector : [ {
  //     title: 'Name',
  //     dataIndex: 'name'
  //   },
  //   {
  //       title: 'Quantity',
  //       dataIndex: 'quantity',
  //     },
  //   {
  //     title: 'Price',
  //     dataIndex: 'price',
  //   },
  //   {
  //       title: 'Status',
  //       dataIndex: 'status',
  //     },
  //   {
  //     title: 'Category',
  //     dataIndex: 'category',
  //   },
  //   {
  //       title: 'Image',
  //       dataIndex: 'image',
  //       render:(image,record)=><img src={image} alt={record.name} height={60} width={60}/>
  //     },
  //     {
  //       title: 'Actions',
  //       dataIndex: '_id',
  //       render:(image,rocord)=><DeleteOutlined />
  //     }];

  //handle increment function
  const dispatch = useDispatch();
  const HandleIncrement = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };
  //states for invoice
  const [subTotal , setSubTotal]=useState(0)
  const [billPop, setbillPop]=useState(0)

  //useEffect for Invoice
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);

  //handle decrement function
  const HandleDecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

   const navigate = useNavigate()
  //handleSubmit for Invoice 

  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        cartItems,
        subTotal, 
        tax: Number(((subTotal / 100) * 10).toFixed(2)),
        totalAmount: Number(
          Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
        ),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };
 

      console.log(newObject);
      await axios.post("http://localhost:5000/api/addclient", newObject);
      message.success("Bill Generated");  
      navigate("/bills");
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => HandleIncrement(record)}
          />
          <b className="">{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-2"
            style={{ cursor: "pointer" }}
            onClick={() => HandleDecrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height={60} width={60} />
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (image, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() => {
            dispatch({
              type: "DELETE_CART",
              payload: record,
            });
          }}
        />
      ),
    },
  ];

  return (
    <LayoutsPage>
      <Table columns={columns} dataSource={cartItems} />
      <div className="d-flex flex-column align-items-end">
        <hr />
        <h3>
          SUB TOTAL : $ <b> {subTotal}</b> {" "}
        </h3>
        <Button type="primary" onClick={() => setbillPop(true)}>
          Create Invoice
        </Button>
      </div>
      <Modal
        title="Create Invoice"
        visible={billPop}
        onCancel={() => setbillPop(false)}
        footer={false}
      >
        <Form layout="vertical"
        onFinish={handleSubmit}
        >

          <Form.Item name="clientsName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="clientsNumber" label="Contact Number">
            <Input />
          </Form.Item>
 
          <Form.Item name="paymentMode" label="Payment Method">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="bill-it">
            <h5>
              Sub Total : <b>{subTotal}</b>
            </h5>
            <h4>
              TAX
              <b> {((subTotal / 100) * 10).toFixed(2)}</b>
            </h4>
            <h3>
              GRAND TOTAL -{" "}
              <b>
                {Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))}
              </b>
            </h3>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Generate Bill
            </Button>
          </div>
        </Form>
      </Modal>

    </LayoutsPage>
  );
};

export default CartPage; 
