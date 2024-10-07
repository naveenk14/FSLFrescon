import { Dialog } from "@mui/material";
import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
// import { VscClose } from "react-icons/vsc";
import tickmark from "../../../assets/tickmark.gif";

const SavDoc = ({ open, close }) => {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onClose={close}>
        <div
          className="card m-auto"
          style={{ height: "527.93px", width: "527px" }}
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
            style={{ fontWeight: "500", fontSize: "24px", textAlign: "center" }}
          >
            <div>Thank you for uploading your documents</div>
          </div>
          <p style={{ textAlign: "center", color: "#29333D" }} className="mt-1">
            Our service team will connect you shortly for booking confirmation!
          </p>
          <div className="d-flex justify-content-center mt-5">
            <Button
              type="primary"
              style={{
                backgroundColor: "#D32D2F",
                height: "40px",
                borderRadius: "8px",
              }}
              onClick={() => navigate("/")}
            >
              Continue to Dashboard
              <ArrowCircleRightIcon className="ms-2" />
            </Button>
          </div>
        </div>
      
    </Dialog>
  );
};

export default SavDoc;
