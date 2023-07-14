import React from "react";
import { Modal } from "react-bootstrap";

const SubmitBidModal = ({ setModalShow, onSubmit, modalShow }) => {
  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="text-center">
        <p className="modalText">Are you sure?</p>
        <div>
          <button
            className="whiteShadeBtn w-auto"
            style={{ display: "inline-block", marginRight: "10px" }}
            onClick={() => setModalShow(false)}
          >
            Cancel
          </button>
          <button className="btnDark w-auto" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SubmitBidModal;
