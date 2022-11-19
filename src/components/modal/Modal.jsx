/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const RenderModal = (props) => ReactDOM.createPortal(
  <div>
    {props.children}
  </div>,
  document.getElementById('modal-root')
);

export default RenderModal;
