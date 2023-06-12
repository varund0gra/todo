import React, { useState } from "react";
import moment from "moment";

function HomePage() {
  // states
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTile] = useState("");
  const [body, setBody] = useState("");
  const [notepadData, setNotePadData] = useState([]);
  const [previewData, setPreviewData] = useState(true);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [indexValue, setIndexValue] = useState(0);
  const [sortOption, setSortOption] = useState("None");
  const [bodyPreviewData, setBodyPreviewData] = useState("");
  const [titlePreviewData, setTitlePreviewData] = useState("");

  // functions
  function handleSubmit() {
    const date = moment().format("MMMM Do YYYY, h:mm:ss a");
    const time = moment().format(" h:mm:ss a");
    setNotePadData((prev) => [
      ...prev,
      {
        title,
        body,
        date,
        time,
      },
    ]);

    setIsOpen(false);

    setTile("");
    setBody("");
  }

  // cancel
  function handleCancel() {
    setTile("");
    setBody("");
    setIsOpen(false);
  }

  // delete
  function handleDelete(index) {
    setNotePadData((prev) => {
      const newData = [...prev];
      newData.splice(index, 1);
      return newData;
    });
  }

  function handleEdit(index) {
    setIndexValue(index);
    setIsOpen(true);
    setEdit(true);
    setTile(notepadData[index]?.title);
    setBody(notepadData[index]?.body);
  }

  const filteredNotes = notepadData.filter((note) => {
    return note.title.toLowerCase().includes(search.toLowerCase());
  });

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleEditBtn() {
    const index = indexValue;
    const date = moment().format("MMMM Do YYYY, h:mm:ss a");
    notepadData[index] = {
      title,
      body,
      date,
    };
    setIsOpen(false);
  }

  function handleDropDown(e) {
    const value = e.target.value;
    setSortOption(value);
    if (value === "Title") {
      setNotePadData((prev) =>
        [...prev].sort((a, b) => a.title.localeCompare(b.title))
      );
    } else if (value === "dateCreated") {
      setNotePadData((prev) =>
        [...prev].sort((a, b) => moment(a.date).diff(moment(b.date)))
      );
    }
     else if (value === "dateModified") {
      setNotePadData((prev) =>
        [...prev].sort((a, b) => moment(a.date ,"MM-DD-YYYY a").diff(moment(b.time ,"MM-DD-YYYY a")))
      );
    }
  }
  function handleView(index) {
    setPreviewData(false);
    setBodyPreviewData(notepadData[index]?.body);
    setTitlePreviewData(notepadData[index]?.title);
  }
  console.log(notepadData);
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-start">
          <i class="fa-solid fa-book fa-bounce main_icon"></i>
          <label>NOTIFY</label>
        </div>
        <div className="navbar-end">
          <>
            <span
              style={{ color: "white", fontSize: "16px", fontWeight: "500" }}
            >
              Sort By:
            </span>
            <select
              onChange={handleDropDown}
              value={sortOption}
              className="selectopt"
            >
              <option value="None" key="">
                None
              </option>
              <option value="Title" key="">
                Title
              </option>
              <option value="dateCreated" key="">
                Date Created
              </option>
              <option value="dateModified" key="">
                Date Modified
              </option>
             
            </select>
            <input
              type="search"
              className="search_bar"
              placeholder="Search..."
              onChange={(e) => {
                handleSearch(e);
              }}
            />{" "}
            <i
              class="fas fa-search"
              style={{ color: "white", fontSize: "18px", padding: "6px" }}
            ></i>
          </>
        </div>
      </nav>
      {previewData == true ? (
        <div>
          {!isOpen && (
            <div className="flexingCard">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((item, index) => {
                  return (
                    <div className="profile-card">
                      <div className="profile-info">
                        <h2 className="name">{item.title}</h2>
                        <p className="description">{item.body}</p>
                        <div class="social-links">
                          <a href="#" className="social-icon">
                            <i
                              class="fa-regular fa-pen-to-square"
                              onClick={() => handleEdit(index)}
                            ></i>
                          </a>
                          <a href="#" className="social-icon">
                            <i
                              class="fa-regular fa-eye"
                              onClick={() => handleView(index)}
                            ></i>
                          </a>
                          <a href="#" className="social-icon">
                            <i
                              class="fa-solid fa-trash"
                              onClick={() => handleDelete(index)}
                            ></i>
                          </a>
                        </div>
                        <br />
                        <div className="card-date">{item.date}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="main_Back">
                  <img
                    src="https://t4.ftcdn.net/jpg/05/33/54/55/360_F_533545570_M0xIF8ZO6lN5XKgDLug2MFLhhLOwaAYq.jpg"
                    className="data_image"
                  />
                  <p className="notes_data animate-charcter">Add Some Notes!</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="cardg">
          <div className="handleflex">
            <div>
              <h1 className="cardtitle">{titlePreviewData}</h1>
            </div>
            <div>
              <i
                class="fa-solid fa-xmark closeIcon"
                onClick={() => setPreviewData(true)}
              ></i>
            </div>
          </div>
          <p className="carddata">{bodyPreviewData}</p>
        </div>
      )}

      {/* modal */}
      <div className="overlay">
        {isOpen === true ? (
          <div className="modal-container">
            <div className="modal">
              <div className="modal-content">
                <i
                  class="fa-sharp fa-regular fa-circle-xmark"
                  style={{ textAlign: "end", fontSize: 20 }}
                  onClick={() => {
                    handleCancel();
                  }}
                ></i>
                {edit === true ? <h2>Edit Note</h2> : <h2>Add note</h2>}
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    setTile(e.target.value);
                  }}
                />
                <textarea
                  className="textarea"
                  cols="40"
                  rows="10"
                  placeholder="Write Content here...."
                  value={body}
                  onChange={(e) => [setBody(e.target.value)]}
                ></textarea>
                <div className="modal-buttons">
                  <button
                    onClick={() => {
                      handleCancel();
                    }}
                  >
                    Cancel
                  </button>
                  {edit === true ? (
                    <button onClick={handleEditBtn}>Edit</button>
                  ) : (
                    <button onClick={() => handleSubmit()}>Submit</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                setIsOpen(true);
                setEdit(false);
              }}
              className="addbtn"
            >
              +
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default HomePage;
