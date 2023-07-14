import React from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AuctionOverModal = ({ auctionOverModal, setAuctionOverModal }) => {
  const navigate = useNavigate();
  return (
    <Modal
      show={auctionOverModal}
      onHide={() => setAuctionOverModal(false)}
      size="md"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="text-center">
        <p className="modalText">Auction is over.</p>
        <button
          className="btnDark w-auto"
          onClick={() => {
            setAuctionOverModal(false);
            navigate("/my-auctions");
          }}
        >
          Okay
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default AuctionOverModal;
