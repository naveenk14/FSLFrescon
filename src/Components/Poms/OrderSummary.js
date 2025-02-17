import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Card,
  CardContent,
  TableSortLabel,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

const OrderSummary = ({ open, handleClose }) => {
  const milestones = [
    { label: "Order Confirm", date: "2024-05-28" },
    { label: "Order Pickup", date: "2024-05-30" },
    { label: "Order Received", date: "2024-05-30" },
    { label: "Departed", date: "2024-06-28" },
    { label: "Arrived", date: "2024-06-29" },
    { label: "Customs Cleared", date: "2024-06-30" },
    { label: "Delivery Planned", date: "2024-06-30" },
    { label: "Customs Cleared", date: "2024-06-30" },
    { label: "Delivery Planned", date: "2024-06-30" },
  ];
  const orderDetails = {
    OrderNo: "232321",
    OrderDate: "19-Oct-2024",
    InvoiceNo: "INV12433124",
    InvoiceDate: "20-Oct-2024",
    Supplier: "Supp Name",
    Buyer: "Buyer Name",
    Incoterms: "Incoterms Name",
  };

  const items = [
    {
      id: 1,
      item: "XXXXXXX",
      description: "Supp A",
      unitPrice: "Consig A",
      ordered: "SHP001",
      transit: "Air",
      closed: "Dubai",
      pending: "London",
    },
    {
      id: 2,
      item: "XXXXXXX",
      description: "Supp B",
      unitPrice: "Consig B",
      ordered: "SHP002",
      transit: "Ocean",
      closed: "New York",
      pending: "Singapore",
    },
    {
      id: 3,
      item: "XXXXXXX",
      description: "Supp C",
      unitPrice: "Consig B",
      ordered: "SHP003",
      transit: "Road",
      closed: "Mumbai",
      pending: "Dubai",
    },
    {
      id: 4,
      item: "XXXXXXX",
      description: "Supp D",
      unitPrice: "Consig C",
      ordered: "SHP004",
      transit: "Air",
      closed: "Dubai",
      pending: "London",
    },
    {
      id: 5,
      item: "XXXXXXX",
      description: "Supp E",
      unitPrice: "Consig D",
      ordered: "SHP005",
      transit: "Ocean",
      closed: "New York",
      pending: "Singapore",
    },
  ];

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const orderEntries = Object.entries(orderDetails);
  const rows = chunkArray(orderEntries, 4); // Split into rows of 4


  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        {/ PO Summary /}
        <IconButton
          style={{ position: "absolute", right: 10, top: 10 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="h6" style={{ fontWeight: 700, fontSize: 15 }}>
              Order Milestones
            </Typography>
           

<Card style={{ padding: 16, marginTop: 16,  overflowY: "auto",height: 520, scrollbarWidth: "none", 
    msOverflowStyle: "none"}}>
  {milestones.map((milestone, index) => (
    <TimelineItem key={index} sx={{ "::before": { display: "none" } }}>
      <TimelineSeparator
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TimelineDot sx={{ backgroundColor: "#F4F4F4", width: 12, height: 12 }} />
        {index !== milestones.length - 1 && (
          <TimelineConnector
            sx={{
              borderStyle: "solid", 
              backgroundColor: "#E7E8F2",
              borderColor: "#E7E8F2",
              borderWidth: "1px",
              height: "10%",
              width: "2px", 
            }}
          />
        )}
      </TimelineSeparator>
      <TimelineContent>
        <Typography
          variant="body1"
          fontWeight={700}
          fontSize={12}
          style={{
            background: "#F4F4F4",
            padding: 5,
            borderRadius: 5,
            width: 215,
            height: 36,
            alignItems: "center",
            display: "flex",
          }}
        >
          {milestone.label}
        </Typography>
        <Typography
          fontWeight={500}
          style={{
            fontSize: "12px", 
            fontStyle: "italic",
            color: "#33343D",
          }}
          variant="body2"
        >
          {milestone.date}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  ))}
</Card>

          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6" style={{ fontWeight: 700, fontSize: 15 }}>
              PO Summary
            </Typography>
            <Card style={{ padding: 10, marginTop: 16 }}>
              <Grid container spacing={1}>
                {rows.map((row, rowIndex) => (
                  <Grid item xs={12} key={rowIndex}>
                    <Card
                      sx={{
                        padding: 2,
                        boxShadow: 0,
                        background: "#F3F5F7",
                        height: 45,
                        display: "flex", 
                        alignItems: "center",
                        border: "none",
                        borderRadius: 2,
                        padding: 5,
                      }}
                    >
                      <CardContent sx={{ width: "100%" }}>
                        <Grid container spacing={2} alignItems="center">
                          {row.map(([key, value], index) => (
                            <Grid item xs={3} key={index}>
                              <Typography
                                variant="subtitle2"
                                style={{
                                  fontWeight: 400,
                                  fontSize: 13,
                                  color: "#67788E",
                                  fontFamily: "Roboto",
                                  bottom: 5,
                                }}
                              >
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </Typography>
                              <Typography
                                style={{
                                  fontWeight: 500,
                                  fontSize: 15,
                                  color: "#384656",
                                  fontFamily: "Roboto",
                                }}
                              >
                                {value}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <TableContainer style={{ marginTop: 10 }}>
                <Table
                  style={{ border: "none", borderRadius: 1, boxShadow: 0 }}
                >
                  <TableHead style={{ background: "#F8FAFC", height: 41 }}>
                    <TableRow
                      style={{
                        fontWeight: 500,
                        fontSize: 14,
                        color: "#181E25",
                        fontFamily: "Roboto",
                        height: 41,
                      }}
                    >
                      <TableCell>#</TableCell>
                      <TableCell>Item</TableCell>
                      <TableCell>Item Description</TableCell>
                      <TableCell>Unit Price</TableCell>
                      <TableCell>Ordered Pcs.</TableCell>
                      <TableCell>In-Transit Pcs.</TableCell>
                      <TableCell>Closed Pcs.</TableCell>
                      <TableCell>Pending Pcs.</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#495A6E",
                      fontFamily: "Roboto",
                      height: 265,
                    }}
                  >
                    {items.map((row) => (
                      <TableRow key={row.id} style={{ color: "#495A6E" }}>
                        <TableCell style={{ color: "#495A6E" }}>
                          {row.id}
                        </TableCell>
                        <TableCell style={{ color: "#495A6E" }}>
                          {row.item}
                        </TableCell>
                        <TableCell style={{ color: "#495A6E" }}>
                          {row.description}
                        </TableCell>
                        <TableCell style={{ color: "#495A6E" }}>
                          {row.unitPrice}
                        </TableCell>
                        <TableCell
                          style={{
                            textDecoration: "underline",
                            color: "#495A6E",
                          }}
                        >
                          {row.ordered}
                        </TableCell>
                        <TableCell style={{ color: "#495A6E" }}>
                          {row.transit}
                        </TableCell>
                        <TableCell style={{ color: "#495A6E" }}>
                          {row.closed}
                        </TableCell>
                        <TableCell style={{ color: "#495A6E" }}>
                          {row.pending}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
 </Card>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSummary;

