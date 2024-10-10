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
    const files = e.dataTransfer.files;
    saveFile(files);
  };

  const clearAllImages = () => {
    setFileName([]);
  };

  return (
    <>
      <div className="w-4/5 mx-auto">
        <div
          className="box-border p-4 border-4 h-80 content-center border-dashed border-black"
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

      <div className="grid grid-cols-7 gap-4 p-4 content-center mx-auto w-4/5">
        {fileName.length > 0 &&
          fileName.map((file, i) => {
            return (
              <div
                className="relative box-border border-2 border-black flex justify-center items-center w-32 h-32"
                key={i}
              >
                <span
                  className="absolute top-0 right-0 m-1 cursor-pointer"
                  role="button"
                  onClick={() => deleteImage(i)}
                >
                  x
                </span>
                <img
                  src={file}
                  className="w-full h-full object-cover"
                  alt="img"
                  key={i}
                />
              </div>
            );
          })}
      </div>

      {fileName.length > 0 && (
        <div className="w-4/5 mx-auto mt-4 text-center">
          <button
            onClick={clearAllImages}
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
            Clear All
          </button>
        </div>
      )}
    </>
  );
}
