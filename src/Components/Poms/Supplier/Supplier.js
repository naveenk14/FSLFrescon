import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Pagination from "../../Core-Components/Pagination";
import { useDispatch } from "react-redux";
import { bookingRequest } from "../../../Redux/Actions/BookingAction";
import { Tooltip } from "antd";
import CountryFlag from "../../Core-Components/CountryFlag";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../../Shipments/ShipmentTable/Booking.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton } from "@mui/material";
import ShipmentBase from "../../ShipmentDetails/ShipmentTable/ShipmentBase";
import { MultiSelect } from "primereact/multiselect";
import { useSelector } from "react-redux";
import { Tag } from "primereact/tag";
import { CloseOutlined } from "@ant-design/icons";
import { CircularProgress, Box } from "@mui/material";
import "../../Dashboard/ShipmentHistory/ShipmentHistory.css";
import shipgif from "../../../assets/shiploadinggif.gif";
import { IoCloseCircleSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SupplierexpansionTemplate from "./SupplierexpansionTemplate";

const Supplier = ({
  filterData,
  filterValue,
  currentPage,
  setCurrentPage,
  filterMonthValue,
  selectedStatus,
  showMore,
  showAllData,
  setshowAllData,
  scrollHeight,
  setscrollHeight,
  popoverVisible,
  setPopoverVisible,
  bookingData
}) => {
  const itemsPerPage = 5;
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState(filterData);
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(filteredData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState(null);
  const { loading } = useSelector((state) => state.Booking);
  // const [showAllData, setshowAllData] = useState(false)
  // const [scrollHeight, setscrollHeight] = useState("653px")
  const [selectfield, setselectfield] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  console.log(data);
  const [tblFilter, setTblFilter] = useState({
    supplierName: [],
    pending: [],
    ordered: [],
    inTransit: [],
    delivered: [],
    booked: [],
  });
  const payload = {
    filter_month: filterMonthValue ? filterMonthValue : "",
    booking_type: "",
    inTransit: "",
    spagesize: "",
    sperpage: "",
    booking_number: "",
    origin: "",
    destination: "",
    supplierName: "",
    etd: "",
    eta: "",
    filter_days: filterValue ? filterValue : "",
  };

//   useEffect(() => {
//     dispatch(bookingRequest({ payload }));
//   }, [filterValue, filterMonthValue]);

  useEffect(() => {
    const filterDataTable = filterData
      ?.map((item, index) => ({
        key: index,
        ...item,
      }))
      .filter((filteredItem) =>
        Object.keys(tblFilter).every(
          (key) =>
            tblFilter[key]?.length === 0 ||
            tblFilter[key]?.includes(filteredItem[key])
        )
      );
    setFilteredData(filterDataTable);
    setCurrentPage(1);
  }, [tblFilter, filterData]);

  //for adjust scrollbar
  const wrapper = document.querySelector(".scrolloftable .p-datatable-wrapper");
  // console.log(scrollArea)
  // useEffect(() => {
  //   if(wrapper){
  //   wrapper?.addEventListener('scroll', function() {
  //     const scrollHeight = wrapper.scrollHeight;
  //     const clientHeight = wrapper.clientHeight;
  //     const scrollTop = wrapper.scrollTop;
  //     const thumbHeight = Math.max(clientHeight * (clientHeight / scrollHeight), 20); // Ensure a minimum thumb height
  //     const thumbPosition = (scrollTop / scrollHeight) * clientHeight;

  //     // Apply custom styles to the scrollbar thumb
  //     wrapper.style.setProperty('--thumb-height', `${thumbHeight}px`);
  //     wrapper.style.setProperty('--thumb-position', `${thumbPosition}px`);
  // });
  //   }
  // }, [wrapper])

  // useEffect(() => {
  //   document.addEventListener('DOMContentLoaded', function() {
  //     // const scrollArea = document.querySelector('.scrolloftable .p-datatable-wrapper');

  //     console.log("height",scrollArea)
  //     // Apply additional height reduction
  //     scrollArea.style.height = "10px"; // Reduced height
  // });
  // }, [showMore])

  const getUniqueOptions = (array, key) => {
    if (!Array.isArray(array) || !array?.length) {
      return [];
    }
    console.log(array, key)
    return Array.from(new Set(array.map((data) => data[key]))).map(
      (value, index) => ({
        key: index,
        label: value,
        value,
      })
    );
  };

  useEffect(() => {
    if (clicked) {
      setData(filteredData);
    }
  }, [clicked]);

  const booked_ = getUniqueOptions(data, "booked");
  const supplierName_ = getUniqueOptions(data, "supplierName");
  const pending_ = getUniqueOptions(data, "pending");
  const ordered_ = getUniqueOptions(data, "ordered");
  const intransit_ = getUniqueOptions(data, "inTransit");
  const delivered_ = getUniqueOptions(data, "delivered");

  const handleChangeFilter = (field, filterValues) => {
    if (field === "all") {
      setTblFilter({
        supplierName: [],
        pending: [],
        ordered: [],
        inTransit: [],
        delivered: [],
        booked: [],
      });
    } else {
      setTblFilter((prevFilters) => ({
        ...prevFilters,
        [field]: filterValues,
      }));
    }
  };

  useEffect(() => {
    if (selectedStatus !== null) {
      setTblFilter({
        supplierName: [],
        pending: [],
        ordered: [],
        inTransit: [],
        delivered: [],
        booked: [],
      });
    }
  }, [selectedStatus]);

  function MultiSelectFilter(
    filterKey,
    options,
    value,
    headerText,
    additionalStyles
  ) {
    const renderOption = (option) => {
      console.log(option)
      if (option?.label?.length <= 14) {
        return <span>{option.label}</span>;
      } else {
        const truncatedText = option?.label?.slice(0, 14)?.trim() + "..";
        return (
          <Tooltip placement="topLeft" title={option.label}>
            <span role="button">{truncatedText}</span>
          </Tooltip>
        );
      }
    };

    console.log(filterKey,
      options,
      value,
      headerText,
      additionalStyles)

    const dynamicWidth = headerText?.length * 8 + "px";
    return (
      <MultiSelect
        className="custom-multi-select"
        value={value}
        options={options}
        filter
        style={{
          position: "absolute",
          opacity: "0",
          width: dynamicWidth,
          fontSize: "10px",
          ...additionalStyles,
        }}
        showSelectAll={false}
        onChange={(e) => handleChangeFilter(filterKey, e.value)}
        onFocus={() => setClicked(true)}
        onBlur={() => setClicked(false)}
        display="chip"
        placeholder="Select"
        itemTemplate={renderOption}
        filterPlaceholder="Search"
      />
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = Math.min(startIndex + itemsPerPage, filteredData?.length);

  const showModal = (rowData) => {
    setModalRowData(rowData);
    setIsModalOpen(true);
  };

  const actionBodyTemplate = (rowData) => {
    let buttonLabel;
    let btnClass;
    if (rowData.action === "Track") {
      buttonLabel = "More";
      btnClass = "cargo-picked-up";
    } else if (rowData.action === "Booking In Progress") {
      buttonLabel = "-";
    } else if (rowData.action === "Cargo Picked Up") {
      buttonLabel = "More";
      btnClass = "cargo-picked-up";
    }
    return (
      <Button
        outlined
        className={btnClass}
        style={{
          background: "rgba(240, 30, 30, 1)",
          color: "white",
          borderRadius: "8px",
          width: "80px",
          height: "30px",
          padding: "",
          gap: "8px",
        }}
        label={buttonLabel}
        onClick={() => {onOrderClick(rowData)}}
      />
    );
  };

  const orderDateTemplateFilterData = (rowData) => {
    return (
      <div style={{ textAlign: "start" }}>
        <span className="">
          {rowData?.orderDate?.length <= 20 ? (
            rowData?.orderDate
          ) : (
            <Tooltip placement="topLeft" title={rowData?.orderDate}>
              <span role="button">
                {rowData?.orderDate?.slice(0, 20)?.trim()?.split(" ")?.join("") +
                  ".."}
              </span>
            </Tooltip>
          )}
        </span>
      </div>
    );
  };
  const orderNoTemplateFilterData = (rowData) => {
    return (
      <div style={{ textAlign: "start" }} onClick={() => onOrderClick(rowData)}>
        <span className="text-decoration-underline" role="button">
          {rowData?.orderNo?.length <= 20 ? (
            rowData?.orderNo
          ) : (
            <Tooltip placement="topLeft" title={rowData?.orderNo}>
              <span role="button">
                {rowData?.orderNo?.slice(0, 20)?.trim()?.split(" ")?.join("") + ".."}
              </span>
            </Tooltip>
          )}
        </span>
      </div>
    );
  };
  const originBodyTemplate = (rowData) => {
    return (
      <div className="origin-cell" style={{ textAlign: "start" }}>
        <CountryFlag countryCode={rowData?.origin_countrycode} />
        <span
          style={{
            paddingLeft: "8px",
            fontWeight: "400",
            // width: "50px",
            textAlign: "start",
          }}
        >
          {rowData?.origin?.length <= 12 ? (
            rowData?.origin
          ) : (
            <Tooltip placement="topLeft" title={rowData?.origin}>
              <span role="button">
                {rowData?.origin?.slice(0, 11)?.trim()?.split(" ")?.join("") +
                  ".."}
              </span>
            </Tooltip>
          )}
        </span>
      </div>
    );
  };
  const destinationBodyTemplate = (rowData) => {
    return (
      <div className="origin-cell" style={{ textAlign: "start" }}>
        <CountryFlag countryCode={rowData?.destination_countrycode} />
        <span
          style={{ paddingLeft: "8px", fontWeight: "400", textWrap: "wrap" }}
        >
          {rowData?.destination?.length <= 12 ? (
            rowData?.destination
          ) : (
            <Tooltip placement="topLeft" title={rowData?.destination}>
              <span role="button">
                {rowData?.destination
                  ?.slice(0, 11)
                  ?.trim()
                  ?.split("")
                  ?.join("") + ".."}
              </span>
            </Tooltip>
          )}
        </span>
      </div>
    );
  };
  const bodyTemplateOrdered = (rowData) => {
  
    return (
      <div style={{ textAlign: "start" }}>
        <span className="">
          {rowData?.ordered?.length <= 20 ? (
            rowData?.ordered
          ) : (
            <Tooltip placement="topLeft" title={rowData?.ordered}>
              <span role="button">
                {rowData?.ordered?.slice(0, 20)?.trim()?.split(" ")?.join("") + ".."}
              </span>
            </Tooltip>
          )}
        </span>
      </div>
    );
  };

  const bodyTemplatePending = (rowData) => {

    return (
      <div style={{ textAlign: "start" }}>
        <span className="">
          {rowData?.pending?.length <= 20 ? (
            rowData?.pending
          ) : (
            <Tooltip placement="topLeft" title={rowData?.pending}>
              <span role="button">
                {rowData?.pending?.slice(0, 20)?.trim()?.split(" ")?.join("") + ".."}
              </span>
            </Tooltip>
          )}
        </span>
      </div>
    );
  };
  const bodyTemplateBooked = (rowData) => {

    return (
      <div style={{ textAlign: "start" }}>
        <span className="">
          {rowData?.booked?.length <= 20 ? (
            rowData?.booked
          ) : (
            <Tooltip placement="topLeft" title={rowData?.booked}>
              <span role="button">
                {rowData?.booked?.slice(0, 20)?.trim()?.split(" ")?.join("") + ".."}
              </span>
            </Tooltip>
          )}
        </span>
      </div>
    );
  };

  const bodyTemplateInTransit = (rowData) => {

    return (
      <div style={{ textAlign: "start" }}>
        <span className="">
          {rowData?.inTransit?.length <= 20 ? (
            rowData?.inTransit
          ) : (
            <Tooltip placement="topLeft" title={rowData?.inTransit}>
              <span role="button">
                {rowData?.inTransit?.slice(0, 20)?.trim()?.split(" ")?.join("") + ".."}
              </span>
            </Tooltip>
          )}
        </span>
      </div>
    );
  };
  const bodyTemplateDelievered = (rowData) => {

    return (
      <div style={{ textAlign: "start" }}>
        <span className="">
          {rowData?.delivered?.length <= 20 ? (
            rowData?.delivered
          ) : (
            <Tooltip placement="topLeft" title={rowData?.delivered}>
              <span role="button">
                {rowData?.delivered?.slice(0, 20)?.trim()?.split(" ")?.join("") + ".."}
              </span>
            </Tooltip>
          )}
        </span>
      </div>
    );
  };
  const sort = (col) => {
    const handleSort = (col) => {
      const sorted = [...filteredData].sort((a, b) => {
        const valA = a[col];
        const valB = b[col];
        if (Date.parse(valA) && Date.parse(valB)) {
          return new Date(valA) - new Date(valB);
        }
        if (!isNaN(valA) && !isNaN(valB)) {
          return valA - valB;
        }
        return valA > valB ? 1 : -1;
      });
      setFilteredData(sorted);
    };

    const handleSortDown = (col) => {
      const sorted = [...filteredData].sort((a, b) => {
        const valA = a[col];
        const valB = b[col];
        if (Date.parse(valA) && Date.parse(valB)) {
          return new Date(valB) - new Date(valA);
        }
        if (!isNaN(valA) && !isNaN(valB)) {
          return valB - valA;
        }
        return valA < valB ? 1 : -1;
      });
      setFilteredData(sorted);
    };

    return (
      <div>
        <div className="d-flex sorticon" style={{ flexDirection: "column" }}>
          <IconButton
            onClick={() => {
              handleSort(col, "asc");
            }}
            className="p-0"
          >
            <ExpandLessIcon className="sortup" />
          </IconButton>
          <IconButton
            onClick={() => {
              handleSortDown(col, "desc");
            }}
            className="p-0"
          >
            <ExpandMoreIcon className="sortdown" />
          </IconButton>
        </div>
      </div>
    );
  };

  // const paginatedData = showAllData
  //   ? filteredData
  //   : filteredData?.slice(
  //       startIndex,
  //       10

  //     );
  console.log(filterData)
  const paginatedData = showAllData ? filteredData : filteredData;
  const noData = () => {
    return (
      <div
        className="no-options "
        style={{ alignSelf: "center", height: "353px" }}
      >
        No Data Found
      </div>
    );
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "353px",
          // alignSelf:"center"
        }}
      >
        {/* <CircularProgress style={{ color: "red" }} /> */}
        <img src={shipgif} width="140px" height="140px" />
      </Box>
    );
  }
  const FilterTag = ({ field, filterValues, handleChangeFilter }) => {
    const popoverRef = useRef(null); // Reference for the popover
    const handleClick = (field) => {
      setselectfield(field);
      setPopoverVisible((prev) => !prev);
      console.log(field);
      console.log(selectfield);
    };

    // Close the popover if clicked outside
    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
          setselectfield("");
          setPopoverVisible(false); // Close the popover if clicked outside
        }
      };

      // Attach event listener
      if (popoverVisible) {
        document.addEventListener("mousedown", handleOutsideClick);
      }

      // Cleanup the event listener when popover is closed or unmounted
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [popoverVisible]);
    const renderTags = (field, filterValues) => {
      return (
        <div
          ref={popoverRef}
          style={{
            position: "absolute",
            top: "0",
            width: "100%",
            background: "white",
            zIndex: "10",
            borderRadius: "8px",
            boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.2)",
            margin: "25px 0px",
          }}
        >
          <ul style={{ padding: "8px", margin: "0px" }}>
            {filterValues?.map((item, index) => {
              return (
                <li
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    listStyle: "none",
                    color: "#000000c9",
                  }}
                  key={index}
                >
                  {item}{" "}
                  <IoCloseCircleSharp
                    role="button"
                    onClick={() => {
                      handleDeleteValue(field, item);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      );
    };

    const handleDeleteValue = (field, value) => {
      console.log(field, value);
      const newValues = filterValues.filter((item) => item !== value);
      console.log(field, newValues);
      handleChangeFilter(field, newValues);
    };
    if (!Array.isArray(filterValues)) {
      return null;
    }
    const renderedColumns = new Set();
    return (
      <>
        {filterValues.map((option) => {
          if (!renderedColumns.has(field)) {
            renderedColumns.add(field);
            return (
              <Tag
                key={field}
                style={{
                  backgroundColor: "#F01E1E",
                  marginRight: "10px",
                  position: "relative",
                  fontSize: "10px",
                }}
                className="px-2 py-1"
                rounded
              >
                <div style={{ position: "relative" }}>
                  {field === "booked" ? "Booked" : ""}
                  {field === "supplierName" ? "Supplier Name" : ""}
                  {field === "pending" ? "Pending" : ""}
                  {field === "ordered" ? "Ordered" : ""}
                  {field === "inTransit" ? "InTransit" : ""}
                  {field === "delivered" ? "Delivered" : ""}
                  &nbsp; :{" "}
                  {filterValues?.length === 1 ? (
                    <span className="me-2">{filterValues[0]}</span>
                  ) : (
                    <span>
                      {filterValues[0]}&nbsp;
                      <Button
                        style={{ backgroundColor: "#F01E1E", border: "none" }}
                        variant="contained"
                        onClick={() => handleClick(field)}
                      >
                        <BsThreeDotsVertical
                          size={10}
                          style={{ marginBottom: "3px", marginLeft: "6px" }}
                        />
                      </Button>
                      {popoverVisible &&
                        field === selectfield &&
                        renderTags(field, filterValues)}
                    </span>
                  )}
                  <span className="ms-2">
                    <CloseOutlined
                      onClick={() => {
                        handleChangeFilter(field, []);
                      }}
                    />
                  </span>
                </div>
              </Tag>
            );
          }
          return null;
        })}
      </>
    );
  };



  // Handle Order No click to toggle row expansion
  // const onOrderClick = (rowData) => {
  //   let _expandedRows = { ...expandedRows };
  //   if (_expandedRows[rowData.orderNo]) {
  //     delete _expandedRows[rowData.orderNo]; // Collapse row if already expanded
  //   } else {
  //     _expandedRows[rowData.orderNo] = true; // Expand row
  //   }
  //   console.log(_expandedRows)
  //   setExpandedRows(_expandedRows);
  // };

  // Handle Order No click to toggle expansion
  const onOrderClick = (rowData) => {
    console.log(rowData)
    console.log(expandedRow)
    setExpandedRow(expandedRow?.supplierName === rowData.supplierName ? null : rowData);
  };

  // Custom row expansion template
const rowExpansionTemplate = (rowData) => {
  console.log(rowData)
  return (
    <SupplierexpansionTemplate filterData={rowData.orders} />
    // <DataTable value={rowData.products} responsiveLayout="scroll">
    //   <Column field="productCode" header="Product Code" />
    //   <Column field="productName" header="Product Name" />
    //   <Column field="supplier" header="Supplier Name" />
    //   <Column field="ordered" header="Ordered" />
    //   <Column field="pending" header="Pending" />
    //   <Column field="booked" header="Booked" />
    //   <Column field="inTransit" header="In-Transit" />
    //   <Column field="delivered" header="Delivered" />
    // </DataTable>
  );
};

  return (
    <div
      style={{
        backgroundColor: "white",
      }}
    >
      {Object.keys(tblFilter)?.some((key) => tblFilter[key]?.length > 0) && (
        <div
          className="d-flex ps-2"
          style={{
            marginBottom: "9px",
            padding: "5px 0px",
            marginTop: "-11px",
          }}
        >
          {Object.entries(tblFilter).map(([field, filterValues]) => (
            <FilterTag
              key={field}
              field={field}
              filterValues={filterValues}
              handleChangeFilter={handleChangeFilter}
            />
          ))}
          {Object.keys(tblFilter)?.some(
            (key) => tblFilter[key]?.length > 0
          ) && (
            <Tag
              style={{
                backgroundColor: "#F01E1E",
                marginRight: "10px",
                position: "relative",
                fontSize: "10px",
                marginLeft: "auto",
              }}
              className="px-2 py-1"
              rounded
            >
              <div>
                Clear All
                <span className="ms-2">
                  <CloseOutlined
                    onClick={() => handleChangeFilter("all", [])}
                  />
                </span>
              </div>
            </Tag>
          )}
        </div>
      )}
      <DataTable
        value={filteredData ? filteredData : bookingData?.data}
        // reorderableColumns
        // reorderableRows
        // onRowReorder={(e) => setFilteredData(e.value)}
        scrollable={true}
        scrollHeight={scrollHeight}
        dataKey="supplierName"
        // expandedRows={expandedRows}
        expandedRows={expandedRow ? [expandedRow] : []}
        onRowToggle={(e) => setExpandedRow(e.data.length ? e.data[0] : null)}
        // onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        className={`${
          filteredData?.length === 0 ? "text-center" : ""
        } scrolloftable`}
        // style={{ height: "653px", overflowY: "auto", marginBottom: "10px" }}
        emptyMessage={noData()}
      >
        {/* <Column
          field="orderNo"
          header={
            <span
              style={{ fontFamily: "Roboto", cursor: "pointer" }}
              className=" d-flex"
            >
              Order No
              {MultiSelectFilter("orderNo", OrderNo_, tblFilter.orderNo, "Order No")}
              {sort("orderNo")}
            </span>
          }
          body={orderNoTemplateFilterData}
          style={{ paddingRight: "10px", width: "170px", paddingLeft: 10 }}
        ></Column>
        <Column
          field="orderDate"
          header={
            <span
              style={{ fontFamily: "Roboto", cursor: "pointer" }}
              className="py-3 d-flex "
            >
              Order Date
              {MultiSelectFilter(
                "orderDate",
                orderDate_,
                tblFilter.orderDate,
                "Order Date"
              )}
              {sort("orderDate")}
            </span>
          }
          body={orderDateTemplateFilterData}
          style={{ paddingLeft: "10px", paddingRight: "10px", width: "185px" }}
          headerClassName="custom-header"
        ></Column> */}
        <Column
          field="supplierName"
          header={
            <span
              style={{ fontFamily: "Roboto", cursor: "pointer" }}
              className=" d-flex"
            >
              Supplier Name
              {MultiSelectFilter("supplierName", supplierName_, tblFilter.supplierName, "Supplier Name")}
              {sort("supplierName")}
            </span>
          }
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        ></Column>

        

        <Column
          field="ordered"
          header={
            <span className=" d-flex" style={{ position: "relative" }}>
              Ordered
              {MultiSelectFilter("ordered", ordered_, tblFilter.ordered, "Ordered")}
              {sort("ordered")}
            </span>
          }
          body={bodyTemplateOrdered}
          bodyClassName="custom-cell"
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        ></Column>
        <Column
          field="pending"
          header={
            <span className=" d-flex">
              Pending
              {MultiSelectFilter("pending", pending_, tblFilter.pending, "Pending")}
              {sort("pending")}
            </span>
          }
          body={bodyTemplatePending}
          bodyClassName="custom-cell"
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        ></Column>
        <Column
          field="booked"
          header={
            <span className=" d-flex">
              Booked
              {MultiSelectFilter("booked", booked_, tblFilter.booked, "Booked")}
              {sort("booked")}
            </span>
          }
          body={bodyTemplateBooked}
          bodyClassName="custom-cell"
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        ></Column>
        <Column
          field="inTransit"
          header={
            <span className=" d-flex">
              InTransit
              {MultiSelectFilter("inTransit", intransit_, tblFilter.inTransit, "InTransit")}
              {sort("inTransit")}
            </span>
          }
          body={bodyTemplateInTransit}
          bodyClassName="custom-cell"
          style={{ paddingLeft: "10px", paddingRight: "10px",paddingBottom:"1.5rem",paddingTop:"1.5rem" }}
        ></Column>
        <Column
          field="delivered"
          header={
            <span className=" d-flex">
              Delivered
              {MultiSelectFilter("delivered", delivered_, tblFilter.delivered, "Delivered")}
              {sort("delivered")}
            </span>
          }
          body={bodyTemplateDelievered}
          bodyClassName="custom-cell"
          className="my-3"
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        ></Column>
        {/* <Column
          field="inTransit"
          header={
            <span className=" d-flex">
              InTransit
              {MultiSelectFilter("inTransit", status_, tblFilter.inTransit, "InTransit")}
              {sort("inTransit")}
            </span>
          }
          headerStyle={{
            width: "130px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
          bodyClassName={(rowData) =>
            rowData.inTransit === "Booking In Progress"
              ? "booking-progress-cell"
              : "booked-cell "
          }
          className="text-start my-3"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        ></Column> */}
        {/* <Column
          field="origin"
          header={
            <span
              style={{ fontFamily: "Roboto", cursor: "pointer" }}
              className="d-flex"
            >
              Origin
              {MultiSelectFilter("origin", Org_, tblFilter.origin, "Origin")}
              {sort("origin")}
            </span>
          }
          body={originBodyTemplate}
          headerClassName="custom-header"
          style={{ width: "185px", paddingLeft: "10px", paddingRight: "10px" }}
        ></Column>
        <Column
          field="destination"
          header={
            <span
              className=" d-flex"
              style={{ fontFamily: "Roboto", cursor: "pointer" }}
            >
              Destination
              {MultiSelectFilter(
                "destination",
                dest_,
                tblFilter.destination,
                "Destination"
              )}
              {sort("destination")}
            </span>
          }
          body={destinationBodyTemplate}
          style={{ width: "185px", paddingLeft: "10px", paddingRight: "10px" }}
        ></Column> */}
        <Column
          field="action"
          body={actionBodyTemplate}
          header={<span>Action</span>}
          className=" text-start"
          headerStyle={{ paddingLeft: "10px" }}
        ></Column>
 
      </DataTable>
      {showMore && (
        <span
          role="button"
          className="show-more"
          onClick={() => {
            return (
              setshowAllData(!showAllData),
              setscrollHeight((prev) => (prev === "653px" ? "1243px" : "653px"))
            );
          }}
        >
          {showAllData ? "Show Less" : "Show More"}
        </span>
      )}

      {/* <span role="button"  className="show-more" onClick={()=>{return (setshowAllData(!showAllData),setscrollHeight((prev)=>prev==="653px"?"1243px":"653px"))}} >
            {showAllData ? "Show Less" : "Show More"}
        </span> */}
      {/* <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={filteredData?.length}
        onPageChange={() => setCurrentPage(1)}
        itemsPerPage={itemsPerPage}
      /> */}
      <ShipmentBase
        open={isModalOpen}
        close={setIsModalOpen}
        rowData={modalRowData}
      />
    </div>
  );
};

export default Supplier;
