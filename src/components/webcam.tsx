import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react"; // import useCallback

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  return (
    <div className="webcam webcamContainer">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} mirrored />
      )}
      <div className="btn-container">
        <button className="webcamButton" onClick={capture}>
          <b>SNAP</b>
        </button>
      </div>
    </div>
  );
};

export default CustomWebcam;
