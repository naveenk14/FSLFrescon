import { Table } from "antd";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import { VscClose } from "react-icons/vsc";

const ContainerDetailsModal = ({ children, handleContClose }) => {
  const columns = [
    {
      title: "Container Details",
      dataIndex: "container",
    },
  ];
  console.log(children);
  return (
    <>
      <Table columns={columns} dataSource={children} pagination={false}/> 
      {/* <DataTable value={children} scrollable={true} scrollHeight={"550px"} style={{borderRadius:"10px"}} >
        <Column
          field="container"
          header={
            <span
              style={{ fontFamily: "Roboto", cursor: "pointer" }}
              className=" d-flex"
            >
              Container Details
            </span>
          }
          style={{ padding: "10px 10px 10px 0px", width: "170px" }}
        ></Column>
      </DataTable> */}
      <div
        className="modal_cancel_icon flex-center-end"
        style={{
          position: "absolute",
          right: "-30px",
          top: "0",
          cursor: "pointer",
        }}
      >
        <VscClose size={22} color="#ffff" onClick={() => handleContClose()} />
      </div>
    </>
  );
};

export default ContainerDetailsModal;