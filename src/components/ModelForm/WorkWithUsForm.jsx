import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./style.css";
import "./responsive.css";
import Form from "react-bootstrap/Form";

function WorkWithUsForm(props) {
  console.log(props.openForm);
  const [auctionOverModal, setAuctionOverModal] = useState(props.openForm);
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };
  const closeForm = () => {
    setAuctionOverModal(false);
  };

  return (
    <>
      <Modal
        show={auctionOverModal}
        onHide={() => closeForm}
        size="md"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="">
          <div className="col-md-12 col-lg-12 col-xl-12">
            <div className="modelFormSection">
              <form className="modelForm">
                <h2 className="form-title">Work With Us</h2>
                <button className="formCloseBtn" onClick={closeForm}>
                  Close
                </button>
                <label className="authFormLabel">Name</label>
                <input type="text" placeholder="Name" />

                <div className="padding-12"></div>

                <div className="twoCol">
                  <div>
                    <label className="authFormLabel">Email Address</label>
                    <input type="email" placeholder="Email Address" />
                  </div>
                  <div>
                    <label className="authFormLabel">Phone Number</label>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="padding-12"></div>

                <label className="authFormLabel">Position</label>
                <br></br>
                <select className="form-select" aria-label="Default select">
                  <option value="DEFAULT">Full Stack Developer</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>                       

                <div className="padding-12"></div>
                <label className="authFormLabel">
                  Why do you think you are perfect for this role?
                </label>
                <br></br>
                <textarea
                  placeholder="Type here"
                  rows="5"
                  //   {...register("message")}
                ></textarea>
                {/* Resume */}
                <label className="authFormLabel">Resume</label>
                <br></br>
                <div className="dragAndDrop">
                  <input type="file" multiple />
                  <p className="dragPara">
                    Drag & Drop or <span className="browseText">Browse</span>{" "}
                  </p>
                </div>

                <button className="btnDark workBtn" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* <button variant="success" onClick={initModal}>
        Open Modal
      </button> */}
      {/* <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>React Modal Popover Example</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
        <p className="modalText">Auction is over.</p>
        <button
          className="btnDark w-auto"
        >
          Okay
        </button>
        </Modal.Body>
        <Modal.Footer>
          <button variant="danger" className="btn" onClick={initModal}>
            Close
          </button>
          <button variant="dark" onClick={initModal}>
            Store
          </button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default WorkWithUsForm;
