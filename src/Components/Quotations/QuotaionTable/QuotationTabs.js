import React, { useState, useEffect } from "react";
import { Tabs, Row, Col, Image } from "antd";
import "../../Shipments/ShipBookingTabs.css";
import { useSelector } from "react-redux";
import QuotationTable from "./QuotationTable";
import { Dropdown } from "primereact/dropdown";
import { CaretDownOutlined } from "@ant-design/icons";
import cal from "../../../assets/calVector.svg";

const QuotationTabs = ({
  setHighlightShipmentCard,
  selectedDataToPatch,
  setSelectedDataToPatch,
}) => {
  const quotationData = useSelector((state) => state?.QuotationList?.Quotation);
  const [activeKey, setActiveKey] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(quotationData && quotationData?.data);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showMore, setshowMore] = useState(false);
  const [showAllData, setshowAllData] = useState(false);
  const [scrollHeight, setscrollHeight] = useState("653px");
  const [popoverVisible, setPopoverVisible] = useState(false); // State to control Popover visibility
  const [filterValue, setFilterValue] = useState(30);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedDropdownItem, setSelectedDropdownItem] =
    useState("Past 30 Days");
  const items = [
    "Past 30 Days",
    "Past 3 Months",
    "Past 6 Months",
    "Past 1 Year",
  ];

  console.log(filteredData);
  console.log(data);

  useEffect(() => {
    if (quotationData && quotationData?.data) {
      console.log("works");
      setData(quotationData?.data);
    }
  }, [quotationData]);

  const filterData = (status) => {
    console.log(status);
    if (status === "All") {
      console.log(data);
      setFilteredData(data && data);
      setSelectedStatus("All");
    } else {
      setFilteredData(data.filter((item) => status.includes(item.status)));
      setSelectedStatus(status);
    }
  };

  useEffect(() => {
    if (quotationData && quotationData?.data) {
      setData(quotationData?.data);
    }
  }, [quotationData]);

  useEffect(() => {
    setActiveKey("1");
    filterData("All");
  }, [selectedDropdownItem]);

  useEffect(() => {
    const lowercasedFilter = globalFilter.toLowerCase();
    const filteredData = quotationData?.data?.filter((item) =>
      Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(lowercasedFilter)
      )
    );
    setFilteredData(filteredData);
    setCurrentPage(1);
  }, [globalFilter, quotationData]);

  useEffect(() => {
    const filterDaysMap = {
      "Past 30 Days": 30,
      "Past 3 Months": 91,
      "Past 6 Months": 182,
      "Past 1 Year": 365,
    };
    setFilterValue(filterDaysMap[selectedDropdownItem]);
  }, [selectedDropdownItem]);

  const onChange = (key) => {
    setActiveKey(key);
    switch (key) {
      case "1":
        filterData("All");
        setCurrentPage(1);
        break;
      case "2":
        filterData(["ACTIVE"]);
        setCurrentPage(1);
        break;
      case "3":
        filterData(["BOOKED"]);
        setCurrentPage(1);
        break;
      case "4":
        filterData(["EXPIRED"]);
        setCurrentPage(1);
        break;
      case "5":
        filterData(["PENDING"]);
        setCurrentPage(1);
        break;
      default:
        filterData("All");
        setCurrentPage(1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tabs = [
    { label: `All Quotations (${data?.length})`, key: "1" },
    {
      label: `Active (0)`,
      key: "2",
    },
    {
      label: `Booked (0)`,
      key: "3",
    },
    {
      label: `Expired (0)`,
      key: "4",
    },
    {
      label: `Requested (0)`,
      key: "5",
    },
  ];

  console.log(activeKey);
  console.log(data);

  //for tab change according to show display showmore button

  useEffect(() => {
    if (activeKey == 1 && Number(data?.length) > 10) {
      setshowMore(true);
    }
    // else if(activeKey == 2 && Number(schedule?.booked)>10){
    //   setshowMore(true)
    // }
    // else if(activeKey == 3 && Number(schedule?.in_transit)>10){
    //   setshowMore(true)
    // }
    // else if(activeKey == 4 && Number(schedule?.arrived)>10){
    //   setshowMore(true)
    // }
    // else if(activeKey == 5 && Number(schedule?.delivered)>10){
    //   setshowMore(true)
    // }
    // else if(activeKey == 6 && Number(schedule?.cancelled)>10){
    //   setshowMore(true)
    // }
    else {
      setshowMore(false);
    }
    setshowAllData(false);
    setscrollHeight("653px");
  }, [activeKey && data]);

  const valueTemplate = () => {
    return (
      <div>
        <Image
          src={cal}
          alt="cal"
          style={{
            width: "12px",
            height: "12px",
            marginTop: "-2px",
            marginRight: "7px",
          }}
        />
        <span
          style={{
            color: "#495A6E",
            fontWeight: "400",
            fontSize: "13px",
            lineHeight: "19px",
            letterSpacing: "1%",
            textAlign: "center",
          }}
        >
          {selectedDropdownItem}
        </span>
        <CaretDownOutlined className="ms-1" style={{ color: "#67788E" }} />
      </div>
    );
  };
  return (
    <div
      className="mx-auto"
      style={{
        minWidth: "1255px",
        borderRadius: "8px",
      }}
    >
      <Row style={{ borderRadius: "8px" }}>
        <Col
          span={24}
          style={{
            backgroundColor: "#F8FAFC",
            borderRadius: "8px 8px 0px 0px",
            border: "1px solid #f0f0f0",
            borderBottom: "0px",
          }}
        >
          <Row justify="space-between" style={{ height: "57px" }}>
            <Col span={20}>
              <Tabs
                activeKey={activeKey}
                onChange={onChange}
                items={tabs}
              ></Tabs>
            </Col>
            <Col className="d-flex ">
              <div
                className="dropdownfield mx-2"
                style={{ alignContent: "center", height: "57px" }}
              >
                <Dropdown
                  value={selectedDropdownItem}
                  onChange={(e) => {
                    setSelectedDropdownItem(e.value);
                  }}
                  options={items}
                  valueTemplate={valueTemplate}
                  className="w-full md:w-14rem datehover"
                  style={{ border: "none" }}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          span={24}
          style={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "0px 0px 8px 8px",
            border: "1px solid #f0f0f0",
          }}
        >
          <QuotationTable
            filterData={filteredData}
            selectedStatus={selectedStatus}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setActiveKey={setActiveKey}
            selectedDropdownItem={selectedDropdownItem}
            setSelectedDropdownItem={setSelectedDropdownItem}
            setHighlightShipmentCard={setHighlightShipmentCard}
            selectedDataToPatch={selectedDataToPatch}
            setSelectedDataToPatch={setSelectedDataToPatch}
            showMore={showMore}
            showAllData={showAllData}
            setshowAllData={setshowAllData}
            scrollHeight={scrollHeight}
            setscrollHeight={setscrollHeight}
            popoverVisible={popoverVisible}
            setPopoverVisible={setPopoverVisible}
            filterValue={filterValue}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Col>
      </Row>
    </div>
  );
};

export default QuotationTabs;
