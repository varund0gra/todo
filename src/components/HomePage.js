import React, { useState } from "react";
import moment from "moment";
import Modal from "./Modal";
import Navbar from "./Navbar";
import NoteCard from "./NoteCard";
import { date, time } from "../Constant/Constants";

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

  function handleSubmit() {
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

  function handleCancel() {
    setTile("");
    setBody("");
    setIsOpen(false);
  }

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
  const filter = notepadData.filter((note) => {
    return note.title.toLowerCase().includes(search.toLowerCase());
  });

  function handleDropDown(e) {
    const value = e.target.value;
    setSortOption(value);
    if (value === "None") {
      setNotePadData((prev) => [...prev]);
    } else if (value === "Title") {
      setNotePadData((prev) =>
        [...prev].sort((a, b) => a.title.localeCompare(b.title))
      );
    } else if (value === "dateCreated") {
      setNotePadData((prev) =>
        [...prev].sort((a, b) => moment(a.date).diff(moment(b.date)))
      );
    } else if (value === "dateModified") {
      setNotePadData((prev) =>
        [...prev].sort((a, b) =>
          moment(b.date, "MMMM Do YYYY, h:mm:ss a").diff(
            moment(a.date, "MMMM Do YYYY, h:mm:ss a")
          )
        )
      );
    }
  }

  function handleView(index) {
    setPreviewData(false);
    setBodyPreviewData(notepadData[index]?.body);
    setTitlePreviewData(notepadData[index]?.title);
  }

  return (
    <div>
      <Navbar
        handleDropDown={handleDropDown}
        sortOption={sortOption}
        setSearch={setSearch}
      />
      {previewData ? (
        <div>
          <div className="flexingCard">
            {filter.length > 0 ? (
              filter.map((item, index) => {
                return (
                  <NoteCard
                   previewData={previewData}
                    key={index}
                    item={item}
                    index={index}
                    handleEdit={handleEdit}
                    handleView={handleView}
                    handleDelete={handleDelete}
                  />
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
        <Modal
          isOpen={isOpen}
          edit={edit}
          title={title}
          body={body}
          onCancel={handleCancel}
          onEdit={handleEditBtn}
          onSubmit={handleSubmit}
          onTitleChange={(e) => setTile(e.target.value)}
          onBodyChange={(e) => setBody(e.target.value)}
        />
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
      </div>
      
    </div>
  );
}
export default HomePage;
