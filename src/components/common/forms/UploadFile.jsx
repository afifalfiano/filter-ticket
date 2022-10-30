/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
/* eslint-disable import/named */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { formatBytes } from '../../../utils/helper';

function UploadFile({ uploaded = false }) {
  const [file, setFile] = useState([]);

  const onHandleFileUpload = ($event) => {
    const data = $event.target.files;
    data.length > 0 ? setFile(data[0]) : setFile([]);
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
                className="hidden"
                onChange={onHandleFileUpload}
              />
            </label>
          </div>
          <div className="mt-2 font-semibold">
            File Upload: {file.name} - {formatBytes(file.size)}
          </div>
        </div>
      )}
      {uploaded && (
        <div className="mt-2 font-semibold">
          File Upload: {detailComplain?.lampiran || '-'}
        </div>
      )}
    </>
  );
}

UploadFile.propTypes = {
  uploaded: PropTypes.bool,
};

export default UploadFile;
