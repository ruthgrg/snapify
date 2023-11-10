import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const [file, setFile] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });
  return (
    <div
      {...getRootProps()}
      className="flex flex-col justify-center items-center"
    >
      <input {...getInputProps()} />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img
              src={fileUrl}
              alt="image"
              className="h-80 lg:h-[480px] w-full rounded-[24px] object-cover object-top"
            />
          </div>
          <p className="text-light-4 text-center text-[14px] font-normal leading-[140%]">
            Click or drag photo to replace
          </p>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center p-7 h-80 lg:h-[612px]">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
            width={96}
            height={77}
          />
          <h3 className="text-[16px] font-medium leading-[140%] mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 text-[14px] font-normal leading-[140%]">
            SVG, PNG, JPEG
          </p>
          <Button
            type="button"
            className="h-12 bg-dark-4 px-5 text-light-1 flex gap-2"
          >
            Select from the computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
