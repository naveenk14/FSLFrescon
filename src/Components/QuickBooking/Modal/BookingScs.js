import { Dialog } from "@mui/material";
import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Button } from "antd";
// import { useNavigate } from "react-router-dom";
import tickmark from "../../../assets/tickmark.gif";

const BookingSuccess = ({ open, close }) => {

  return (
    <Dialog open={open} onClose={close} fullScreen>
      <div
        style={{
          backgroundColor: "black",
          height: "100vh",
          alignContent: "center",
        }}
      >
        
        <div
          className="card m-auto"
          style={{ height: "513.93px", width: "527px" }}
        >
          <div className="align-self-center my-5">
            <img
             src={tickmark}
              alt="check"
              width="179.93px"
              height="179.93px"
            />
          </div>
          <div
            style={{
              fontWeight: "500",
              fontSize: "24px",
              width: "411px",
              alignSelf: "center",
              lineHeight: "34px",
              letterSpacing: "1%",
            }}
          >
            <div className="text-center">
              Your Booking Created Successfully!
            </div>
            <div className="text-center">Your Booking # 12169300432</div>
          </div>
          <p style={{ textAlign: "center", color: "#384656" }} className="mt-1">
            Kindly click on Continue to view your booking!{" "}
          </p>
          <div className="d-flex justify-content-center mt-4">
            <Button
              type="primary"
              style={{
                backgroundColor: "#D32D2F",
                height: "40px",
                borderRadius: "8px",
                lineHeight: "24px",
              }}
              onClick={close}
            >
              Continue to Booking
              <ArrowCircleRightIcon className="ms-2" />
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default BookingSuccess;
