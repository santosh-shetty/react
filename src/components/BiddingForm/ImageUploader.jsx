import React, { useState, useRef } from "react";
import { toast } from "react-toastify";

function ImageUploader(props) {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  const [imageName, setImageName] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  // Max image size
  const MAX_SIZE = 1024 * 1024;

  // Drag and upload
  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = [...files];
    const droppedFiles = [...event.dataTransfer.files];

    // Filter out non-image files
    const imageFiles = droppedFiles.filter(
      (file) => file.type.startsWith("image/") || file.type === "application/pdf"
    );

    // Check file size

    if (imageFiles[0]?.size > MAX_SIZE) {
      toast.error("Upload image less than 1MB ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        handleRemove(props.index);
      }, 2000);
      return;
    }

    props.handleImageUpload(props.index, imageFiles);

    // Add image files to the list of files
    newFiles.splice(props.index, imageFiles.length, ...imageFiles);
    setFiles(newFiles);
    if (imageFiles.length > 0) {
      setImageName(imageFiles[0].name);
      setFileUrl(URL.createObjectURL(imageFiles[0]));
    }
  };

  // Input Image
  const handleFileInput = (event) => {
    const newFiles = [...files];
    const selectedFiles = [...event.target.files];

    // Filter out non-image files
    const imageFiles = selectedFiles.filter(
      (file) => file.type.startsWith("image/") || file.type === "application/pdf"
    );

    // Check file size for each image file
    imageFiles.forEach((file) => {
      if (file.size > MAX_SIZE) {
        toast.error("Upload image less than 1MB", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          handleRemove(props.index);
        }, 2000);
        return;
      }
    });

    props.handleImageUpload(props.index, imageFiles);

    // Add image files to the list of files
    newFiles.splice(props.index, imageFiles.length, ...imageFiles);
    setFiles(newFiles);

    if (imageFiles.length > 0) {
      setImageName(imageFiles[0].name);
      setFileUrl(URL.createObjectURL(imageFiles[0]));
    }
  };

  // remove image
  const handleRemove = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    setImageName("");
    setFileUrl(""); // add this line to reset the fileUrl state
    props.handleImageUpload(props.index, newFiles);
  };

  // Remove Component
  const renderImage = (file, index) => (
    <div key={index}>
      <p onClick={() => handleRemove(index)} className="removeBtn">
        Remove
      </p>
    </div>
  );

  // Onclick area
  const handleClick = () => {
    if (imageName === "") {
      inputRef.current.click();
    }
  };

  return (
    <div className="image-uploader">
      <div onClick={handleClick}>
        <div
          className={`image-dropzone ${imageName !== "" ? "disabled" : ""}`}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          {imageName === "" ? (
            <p className="dragTitle">
              Drag & Drop or <span className="browse">Browse</span>
            </p>
          ) : (
            <p className="imageName">
              <a href={fileUrl} target="_blank">
                {imageName}
              </a>
            </p>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*, application/pdf"
        onChange={handleFileInput}
        style={{ display: "none" }}
        multiple={false}
        key={files.length}
      />
      <div className="image-previews">{files.map(renderImage)}</div>
    </div>
  );
}

export default ImageUploader;
