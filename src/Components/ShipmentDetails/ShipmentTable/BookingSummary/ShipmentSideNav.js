import React, { useEffect, useState } from "react";
import { Card, Row, Col, Tag, Tabs, Tooltip } from "antd";
import "./ShipmentSideNav.css";
import ShipmentSidebarArrow from "../../../../assets/ShipmentSibarArrow.svg";
import CountryFlag from "../../../Core-Components/CountryFlag";
import { Height } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import shipgif from "../../../../assets/shipbg-gif.gif";


const ShipmentCard = ({
  item,
  setAgentData,
  index,
  selected,
  setSelected

}) => {

return (
    <Card
      className="shipment__sidebarcard p-0"
      style={{ marginBottom: 3,background:index === selected ? "#CFF1FF" : "white",cursor:"pointer" }}
      onClick={()=>{return setAgentData(item),setSelected(index)}}
    >
      <Row align="middle" style={{ width: "100%", padding: "0px" }}>
        <Col span={14} style={{ fontSize: "14px", fontWeight: "500",fontFamily: "Roboto" }}>
          {item?.hbl_number}
        </Col>
        <Col span={7} style={{ textAlign: "right" }}>
          {/* <Tag
            className="shipmentsidebartag"
            style={{ width: "109px", textAlign: "center",fontFamily: "Roboto" }}
            color={item?.trade === "IMPORT" ? "green" : "blue"}
          >
            {item?.trade}
          </Tag> */}
        </Col>
      </Row>
      <Row style={{ marginTop: "5px" }}>
        <Col className="d-flex align-items-center" span={24} style={{ fontSize: "14px" }}>
          <p className="m-0" style={{ marginRight: "25px",width: "100px",display:"flex" }}>
            <CountryFlag countryCode={item?.origin_countrycode} styleData={{marginRight:"8px", marginTop:"4px",width:"unset",height:"11px",boxShadow: "1px 1px 3px 1px black"}}  />
            {item?.origin?.length <=9 ? (
             item?.origin
            ) : item?.origin ? (
              <Tooltip placement="topLeft" zIndex={9999} title={item?.origin}>
                <span role="button">{item?.origin.slice(0, 9)?.trim() + "..."}</span>
              </Tooltip>
              ) : (
                "N/A" // Fallback text for undefined or null origin
              )}
          </p>
          <img src={ShipmentSidebarArrow} alt="Arrow" style={{margin:"0px 20px"}} />
          <p className="m-0" style={{ marginLeft: "25px",width: "120px",marginBottom:"10px",display:"flex" }}>
            <CountryFlag countryCode={item?.destination_countrycode} styleData={{marginRight:"8px",width:"unset",height:"11px",boxShadow: "1px 1px 3px 1px black",marginTop:"4px"}}  />
            {item?.destination?.length <= 9 ? (
              item?.destination
            ) : (
              <Tooltip placement="topLeft" zIndex={9999} title={item?.destination}>
                <span role="button">
                  {item?.destination.slice(0, 8)?.trim() + "..."}
                </span>
              </Tooltip>
            )}
          </p>
        </Col>
      </Row>
    </Card>
  );
};

const ShipmentSidNav = ({ rowData, agentContainerData, setAgentData }) => {

  const data = agentContainerData?.viewContainerData?.container;
  const count = agentContainerData?.viewContainerData?.statuswise_count;
  console.log(data);
  const [activeTab, setActiveTab] = useState(
    count[0]?.hasOwnProperty("EXPORT") ? "EXPORT":count[0]?.hasOwnProperty("IMPORT")?"IMPORT":"TRANSIT"
  );
  console.log(activeTab);
  const [selected, setSelected] = useState(0)

  // Filter data based on the selected tab
  // const getFilteredData = (status) => {
  //   return data?.filter((item) => item.trade === status);
  // };

    // Filtered data based on active tab
    const filteredData = data?.filter((item) => item?.trade === activeTab);
    console.log(filteredData?.length)

  // Counts for the tabs
  // const importCount = getFilteredData(
  //   rowData?.export_import === "Export" ? "EXPORT" : "IMPORT"
  // )?.length;
  // const defaultData = getFilteredData(
  //   rowData?.export_import === "Export" ? "EXPORT" : "IMPORT"
  // )?.[getFilteredData?.length-1];
  // const transshipmentCount = getFilteredData("TRANSIT")?.length;
  // console.log(importCount, transshipmentCount);

  // useEffect(() => {
  //   if (filteredData && filteredData.length > 0) {
  //     setAgentData(filteredData[0]);
  //   } else {
  //     setAgentData(null); // Clear if there's no item
  //   }
  // }, []);

  // Set the first item in the filtered data to agent data
  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      console.log("worked")
      setAgentData(filteredData[0]);
    } else {
      setAgentData(null); // Clear if there's no item
    }
    setSelected(0)
    
  }, [filteredData && activeTab]);

  
  // const {loading} = useSelector((state) => state.ViewContainer);

  // if (loading ){
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "353px",
  //         // alignSelf:"center"
  //       }}
  //     >
  //       {/* <CircularProgress style={{ color: "red" }} /> */}
  //       <img src={shipgif} width="140px" height="140px" />
  //     </Box>
  //   );
  // }


  return (
    <div
      className="tabshadow border shadow"
      style={{
        width: "100%",
        maxWidth: "303px",
        background: "#F8FAFC",
        borderRadius: "6px",
        minHeight:"400px"
      }}
    >
      <Tabs
        className="d-flex align-items-center "
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        tabBarStyle={{ marginBottom: "9px" }}
      >
        <Tabs.TabPane
          tab={`${count[0]?.hasOwnProperty("EXPORT") ? "Import" :count[0]?.hasOwnProperty("IMPORT") ? "Export": "Export" } (${
            count?.[0]?.[
              count[0]?.hasOwnProperty("EXPORT")? "EXPORT" : "IMPORT"
            ] || "0"
          })`}
          key={`${count[0]?.hasOwnProperty("EXPORT") ? "EXPORT" : "IMPORT"}`}
        />
        <Tabs.TabPane
          tab={`Transhipment (${count?.[0]?.["TRANSIT"] || "0"})`}
          key="TRANSIT"
        />
      </Tabs>
      <div
        className="shipmentsidebar"
        style={{
          width: "100%",
          maxWidth: "301px",
          border: "1px solid #E7E8F2",
          background: "#F3F5F7",
          height:"calc(100% - 66px)"
        }}
      >
        {filteredData?.length ? filteredData?.map((item,index) => (
          <ShipmentCard
            key={index}
            item = {item}
            setAgentData={setAgentData}
            index={index}
            selected={selected}
            setSelected={setSelected}
          />
        )):
        <div className="d-flex align-items-center justify-content-center" style={{height:"100%"}}>
            <p className="m-0" style={{textAlign:"center"}}>No datas found</p>
        </div>
        }
      </div>
      {filteredData?.length < 0 && <p>No datas found</p>}
    </div>
  );
};

export default ShipmentSidNav;
