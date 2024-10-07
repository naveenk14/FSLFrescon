import { Dialog } from "@mui/material";
import React, { useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
// import { CloseOutlined } from "@ant-design/icons";
import UploadDoc from "./UploadDoc";
import tickmark from "../../../assets/tickmark.gif";

const CreateNewBooking = ({ open, close }) => {
  const [uploadDoc, setUploadDoc] = useState(false);
  const navigate = useNavigate();

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
          className="card m-auto "
          style={{ height: "589.93px", width: "527px" }}
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
              textAlign: "center",
              color: "#29333D",
            }}
          >
            <div>Thanks for your booking request</div>
            <div>
              Our service team will connect you <br /> shortly!
            </div>
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: 400,
              color: "#29333D",
              lineHeight: "20px",
            }}
            className="mt-2"
          >
            Please select your "Upload Documents" to submit your <br />
            shipment documents for booking processing
          </p>
          <div
            className="d-flex justify-content-center mt-5"
            style={{ gap: "40px" }}
          >
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
            <Button
              type="primary"
              style={{
                backgroundColor: "#D32D2F",
                height: "40px",
                borderRadius: "8px",
              }}
              onClick={() => setUploadDoc(true)}
            >
              Upload Documents
              <ArrowCircleRightIcon className="ms-2" />
            </Button>
          </div>
        </div>
        {/* <div style={{position:"absolute",top:"90px",left:"935px"}}>
          <IconButton style={{color:"white"}}>
            <CloseOutlined />
          </IconButton>
        </div> */}
      </div>
      <UploadDoc open={uploadDoc} close={() => setUploadDoc(false)} />
    </Dialog>
  );
};

export default CreateNewBooking;
