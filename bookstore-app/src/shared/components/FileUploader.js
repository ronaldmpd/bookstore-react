import { func } from 'prop-types';
import { useRef } from 'react';
import { FormGroup } from 'reactstrap';

const FileUploader = ({ onFileSelectSuccess, onFileSelectError }) => {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (fileInput.size > 1024) {
      onFileSelectError({ error: 'Tamaño maximo de 1 MB' });
    } else {
      onFileSelectSuccess(file);
    }
  };

  const uploadImage = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    fileInput.current && fileInput.current.click();
  };

  return (
    <>
      <FormGroup>
        <input type="file" ref={fileInput} onChange={handleFileInput} hidden />
        <button type="button" onClick={uploadImage} className="btn btn-primary">
          Upload Image
        </button>
      </FormGroup>
    </>
  );
};

FileUploader.propTypes = {
  onFileSelectSuccess: func,
  onFileSelectError: func,
};
export default FileUploader;
