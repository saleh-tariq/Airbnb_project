import "./ConfirmDelete.css";
import { useModal } from "../../context/Modal";

function ConfirmDelete({ message, onDelete }) {
  const { closeModal } = useModal();
  const handleClick = (d) => () => {
    d && onDelete();
    closeModal();
  };
  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>{message}</p>
      <button id="red" onClick={handleClick(true)}>
        yes
      </button>
      <button id="grey" onClick={handleClick(false)}>
        no
      </button>
    </div>
  );
}

export default ConfirmDelete;
