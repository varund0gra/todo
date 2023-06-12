import React from "react";
function Navbar({ handleDropDown, sortOption, setSearch }) {
  return (
    <nav className="navbar">
      <div className="navbar-start">
        <i class="fa-solid fa-book fa-bounce main_icon"></i>
        <label>NOTIFY</label>
      </div>
      <div className="navbar-end">
        <>
          <span style={{ color: "white", fontSize: "16px", fontWeight: "500" }}>
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
              setSearch(e.target.value);
            }}
          />{" "}
          <i
            class="fas fa-search"
            style={{ color: "white", fontSize: "18px", padding: "6px" }}
          ></i>
        </>
      </div>
    </nav>
  );
}
export default Navbar;
