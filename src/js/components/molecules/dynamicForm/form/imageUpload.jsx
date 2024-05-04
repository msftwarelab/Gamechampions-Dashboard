import React, { useState, useRef } from "react";
import { STORAGE_URL } from "~service/constants";

const ImageUpload = ({
  register,
  watch,
  setValue,
  name,
  initialValue,
  fieldProps = {
    title: "",
    label: "",
    alt: "",
    urlPrefix: "",
    defaultImage: "",
    multiple: false,
    className: "",
    imageUploadClassName: "",
    readOnly: false
  },
  readOnly,
  onImageLoad
}) => {
  const {
    title,
    alt,
    // urlPrefix,
    defaultImage,
    multiple,
    className,
    imageUploadClassName
  } = fieldProps;
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const fileUploadRef = useRef(null);
  const currentValue = watch(name) || initialValue || defaultImage;

  return (
    <div className={className ? `${className}` : ""}>
      <div
        title={title}
        className={`image-upload ${
          imageUploadClassName ? `image-upload--${imageUploadClassName}` : ""
        } ${isLoading ? " loading" : ""}
            ${readOnly ? " readonly" : ""}`}
        onClick={() => fileUploadRef.current.click()}
      >
        <input
          name={`${name}_file`}
          id={`${name}_file`}
          type="file"
          readOnly={readOnly}
          ref={fileUploadRef}
          multiple={multiple}
          onChange={e => {
            const files = e.target.files;
            if (files) {
              for (let i = 0; i < files.length; i++) {
                const file = files[i];
                try {
                  setIsLoading(true);
                  if (file.size > 1024 * 1024 * 40) {
                    throw "Error: File size is too large";
                  }

                  // only process image files.
                  if (!file.type.match("image.*")) {
                    throw "Error: Invalid filetype";
                  }

                  const reader = new FileReader();

                  // closure to capture the file information
                  reader.onload = e => {
                    onImageLoad(file, e.target).then(response => {
                      setValue(name, response.fileUrl);
                      setPreview(`${STORAGE_URL}${response.fileUrl}`);
                      setIsLoading(false);
                    });
                  };

                  // read in the image file as a data URL
                  reader.readAsDataURL(file);
                } catch (e) {
                  setIsLoading(false);
                  alert(e);
                }
              }
            }
          }}
        />
        <img
          src={`${preview || currentValue}`}
          alt={alt}
          title={title}
          className={`${className ? `${className}__img` : ""}`}
        />
        <input
          ref={register}
          type="hidden"
          name={name}
          defaultValue={currentValue}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
