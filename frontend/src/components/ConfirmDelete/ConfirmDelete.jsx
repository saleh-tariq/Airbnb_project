import "./ConfirmDelete.css";
import { useModal } from "../../context/Modal";

function ConfirmDelete({ message, onDelete, type }) {
  const { closeModal } = useModal();
  const handleClick = (d) => () => {
    d && onDelete();
    closeModal();
  };
  return (
    <div className="delete-modal">
      <h2>Confirm Delete</h2>
      <div className="ninety">
        <p>{message}</p>
      </div>
      <div className="delete-buttons">
        <button id="red" onClick={handleClick(true)}>
          {`Yes (Delete the ${type})`}
        </button>
        <button id="grey" onClick={handleClick(false)}>
          {`No (Keep the ${type})`}
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
