import React from 'react'
import LayoutsPage from '../components/LayoutsPage'
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Modal, Button, Table } from "antd";

const CustomerPage = () => {
    const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const getAllBills = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("http://localhost:5000/api/clients");
      setBillsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };
  //useEffect
  useEffect(() => {
    getAllBills();
    //eslint-disable-next-line
  }, []);
  //print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //able data
  const columns = [
    {
      title: "Cutomer Name",
      dataIndex: "clientsName",
    },
    { title: "Contact No", dataIndex: "clientsNumber" },
    { title: "Payment", dataIndex: "paymentMode" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" }

    // {
    //   title: "Actions",
    //   dataIndex: "_id",
    //   render: (id, record) => (
    //     <div>
    //       <EyeOutlined
    //         style={{ cursor: "pointer" }}
    //         onClick={() => {
    //           setSelectedBill(record);
    //           setPopupModal(true);
    //         }}
    //       />
    //     </div>
    //   ),
    // },
  ];
  console.log(selectedBill);
  return (
    <div>
        <LayoutsPage>
        <h1>Cutomer Page</h1>
      <Table
        columns={columns}
        dataSource={billsData}
        bordered
        pagination={false}
      />
        </LayoutsPage>
      
    </div>
  )
}

export default CustomerPage
