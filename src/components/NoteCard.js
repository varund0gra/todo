import React from "react";
function NoteCard({ item, index, handleEdit, handleView, handleDelete,previewData }) {
  
  return (
    <div className="profile-card">
      <div className="profile-info">
        <h2 className="name">{item.title}</h2>
        <p className="description">{item.body}</p>
        <div className="social-links">
          <a href="#" className="social-icon">
            <i
              className="fa-regular fa-pen-to-square"
              onClick={() => handleEdit(index)}
            ></i>
          </a>
          <a href="#" className="social-icon">
            <i
              className="fa-regular fa-eye"
              onClick={() => handleView(index)}
            ></i>
          </a>
          <a href="#" className="social-icon">
            <i
              className="fa-solid fa-trash"
              onClick={() => handleDelete(index)}
            ></i>
          </a>
        </div>
        <br />
        <div className="card-date">{item.date}</div>
      </div>
    </div>
  );
}

export default NoteCard;
