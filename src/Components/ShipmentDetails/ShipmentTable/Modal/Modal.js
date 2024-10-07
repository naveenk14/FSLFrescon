import React from "react";
import './Modal.css'
 
const Modal = ({ isOpen, children,width,height,modalref }) => {
    if(!isOpen){
        return null
    }
  return (
    <div className="modal_background">
            <div className="modal_card" style={{width:`${width}`,height:`${height}`}} ref={modalref}>
                {children}
            </div>
        </div>
  )
}

export default Modal