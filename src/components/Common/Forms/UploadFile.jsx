/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
/* eslint-disable import/named */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { formatBytes } from '../../../utils/helper';

function UploadFile({ uploaded = false, getFile }) {
  const [file, setFile] = useState([]);

  const onHandleFileUpload = ($event) => {
    const data = $event.target.files;
    data.length > 0 ? setFile(data) : setFile([]);
    getFile(data);
  };
  return (
    <>
      {!uploaded && (
        <div className="form-control">
          <label htmlFor="lampiran" className="label">
            <span className="label-text"> Unggah Lampiran:</span>
          </label>

          <div className="flex justify-center items-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer "
            >
              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <HiOutlineCloudUpload size={28} />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF, WORD, JPG, JPEG
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept=".doc,.pdf,.docx,.zip,.jpeg,.jpg,.png,.mp4"
                className="hidden"
                multiple
                onChange={onHandleFileUpload}
              />
            </label>
          </div>
          <div className="mt-2 font-semibold">
            {new Array(file.length).fill(null)?.map((item, index) => (
              <p key={index}>
                File Upload {index + 1}: {file[index].name} -
                {formatBytes(file[index].size)}
              </p>
            ))}
          </div>
        </div>
      )}
      {uploaded && (
        <div className="mt-2 font-semibold">
          {/* File Upload: {detailComplain?.lampiran || '-'} */}
          File Upload: -
        </div>
      )}
    </>
  );
}

UploadFile.propTypes = {
  uploaded: PropTypes.bool,
};

export default UploadFile;
