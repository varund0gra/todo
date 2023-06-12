import React from "react";

function Modal({
  edit,
  title,
  body,
  onCancel,
  onEdit,
  onSubmit,
  onTitleChange,
  onBodyChange,
  isOpen,
}) {
  if (!isOpen) return;
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-content">
          <i
            className="fa-sharp fa-regular fa-circle-xmark"
            style={{ textAlign: "end", fontSize: 20 }}
            onClick={onCancel}
          ></i>
          {edit ? <h2>Edit Note</h2> : <h2>Add note</h2>}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={onTitleChange}
          />
          <textarea
            className="textarea"
            cols="40"
            rows="10"
            placeholder="Write Content here...."
            value={body}
            onChange={onBodyChange}
          ></textarea>
          <div className="modal-buttons">
            <button onClick={onCancel}>Cancel</button>
            {edit === true ? (
              <button onClick={onEdit}>Edit</button>
            ) : (
              <button onClick={onSubmit}>Submit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
