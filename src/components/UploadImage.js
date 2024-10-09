import { useState, useRef } from "react";

export default function UploadImage() {
  const [fileName, setFileName] = useState([]);
  const fileRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const saveFile = (names) => {
    let fileName = [];
    for (let i = 0; i < names.length; i++) {
      fileName.push(URL.createObjectURL(names[i]));
    }
    setFileName(fileName);
    console.log("fileName", fileName);
  };

  const handleChange = (event) => {
    let names = event.target.files;
    saveFile(names);
  };

  const clickFile = () => {
    fileRef.current.click();
  };
  const deleteImage = (i) => {
    setFileName((previousImage) =>
      previousImage.filter((_, index) => index !== i)
    );
    console.log("filename11", fileName);
  };
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    //e.dataTransfer.dropEffects = "copy";
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    console.log("dddd");
    const files = e.dataTransfer.files;
    saveFile(files);
    console.log("files", files);
    //setFileName(files);
  };

  return (
    <>
      <div className="w-4/5 mx-auto">
        <div
          className="box-border p-4 border-4 h-80 content-center border-dashed"
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragLeave={onDragLeave}
        >
          <span
            onClick={clickFile}
            className="text-base font-medium hover:cursor-pointer"
          >
            <span className="text-red-400">Drag & Drop Images</span> OR Browse
          </span>
          <input
            type="file"
            onChange={handleChange}
            id="uplaod"
            name="upload"
            className="hidden"
            ref={fileRef}
            multiple
          />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 p-4 content-center">
        {fileName.length > 0 &&
          fileName.map((file, i) => {
            return (
              <div className="box-border border-2 h-30 content-center">
                <span className="" role="button" onClick={() => deleteImage(i)}>
                  x
                </span>
                <img src={file} width="100" height="100" alt="img" key={i} />
              </div>
            );
          })}
      </div>
    </>
  );
}
