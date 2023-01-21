import ReactDOM from 'react-dom';

const Modal = (props) => ReactDOM.createPortal(
  <div>
    {props.children}
  </div>,
  document.getElementById('modal-root')
);

export default Modal;
