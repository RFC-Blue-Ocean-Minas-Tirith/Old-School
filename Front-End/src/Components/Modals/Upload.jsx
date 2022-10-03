import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LargeButton } from './Modals.styled';
import Theme from './Theme';
import UploadBlog from './UploadBlog';
import UploadVideo from './UploadVideo';

function Upload(props) {
  const [videoModalShow, setVideoModalShow] = useState(false);
  const [blogModalShow, setBlogModalShow] = useState(false);

  const handleClose = () => props.setModalShow(false);

  return (
    <Theme>
      <Modal
        show={props.modalShow}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LargeButton onClick={() => setVideoModalShow(true)}>Video</LargeButton>
          <LargeButton onClick={() => setBlogModalShow(true)}>Blog</LargeButton>
          <LargeButton>Livestream</LargeButton>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <UploadVideo
        videoModalShow={videoModalShow}
        setVideoModalShow={setVideoModalShow}
        setModalShow={props.setModalShow} username={props.username} />
      <UploadBlog
        blogModalShow={blogModalShow}
        setBlogModalShow={setBlogModalShow}
        setModalShow={props.setModalShow} username={props.username} />
      {/* <Button variant="primary" onClick={() => setModalShow(true)}>Upload</Button> */}
    </Theme>
  );
}

export default Upload;
