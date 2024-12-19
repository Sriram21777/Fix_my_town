import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


function ModalView(props) {
  useEffect(() => {
    console.log(props);
  });
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h4 className="text-center p-3">Report Details</h4>
        <div className="grid no-gutter">
          <div
            className="col-6 md-col-12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <img src="../images/pothole.png" style={{ height: "20vh" }} />
          </div>
          <div className="col-6  ms-col-12">
            <p className="text-center">Date - {new Intl.DateTimeFormat('en-GB').format(new Date(props.date))}</p>
            <h5 className="text-center">----- Description ------</h5>
            <p className="text-center">
              {props.description
                ? props.description
                : "Cras mattis consectetur purus sit amet fermentum. Cras justo odio dapibus ac facilisis in, egestas eget quam. Morbi leo risus, portaac consectetur ac, vestibulum at eros."}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalView;
