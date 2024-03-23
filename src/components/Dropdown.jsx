/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import Footer from "./Footer";
import { Form } from "react-bootstrap";

const Dropdown = ({ segmentName, handleSaveData, showSidebar }) => {
  const [dropdowns, setDropdowns] = useState([
    {
      id: 1,
      selectedOption: "",
      isNewSegment: true,
    },
  ]);
  const isAddButtonDisabled = dropdowns.some(
    (dropdown) => !dropdown.selectedOption
  );
  const footerStyle = {
    marginTop: "auto",
    display: "flex",
    justifyContent: "left",
    backgroundColor: "#F6F6F6",
    padding: "10px",
    position: "absolute",
    bottom: "1px",
    width: "100%",
  };
  const formSelect = {
    fontFamily: "Lato, sans-serif",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "12px",
    margin: "5px"
  }
  const buttonStyle = {
    backgroundColor: "#F2FBF9",
    color: "#657A93",
    padding: "0px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "32px",
  };
  const addTag = {
    fontFamily: "Lato, sans-serif",
    color: "#46B697",
    fontSize: "12px",
    display: "flex",
    marginLeft: "36px",
    marginTop: "10px",
    pointerEvents: isAddButtonDisabled ? "none" : "unset",
  }

  const options = [
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
    { value: "age", label: "Age" },
    { value: "gender", label: "Gender" },
    { value: "accountName", label: "Account Name" },
    { value: "city", label: "City" },
    { value: "state", label: "State" },
  ];

  const handleDeleteDropdown = (dropdownId) => {
    setDropdowns((prevDropdowns) =>
      prevDropdowns.filter((dropdown) => dropdown.id !== dropdownId)
    );
  };

  const handleAddDropdown = () => {
    const newDropdown = {
      id: Date.now(),
      selectedOption: "",
      isNewSegment: true,
    };
    setDropdowns((prevDropdowns) => [...prevDropdowns, newDropdown]);
  };

  const handleButtonClick = (buttonTitle) => {
    if (buttonTitle === "Cancel") {
      showSidebar();
    } else if (buttonTitle === "Save the Segment") {
      // Initialize the schema array
      const schema = dropdowns
        .filter((dropdown) => dropdown.selectedOption)
        .map((dropdown) => ({
          [dropdown.selectedOption]: dropdown.selectedOption,
        }));

      // Send the segment data to the server
      const dataToSend = {
        segment_name: segmentName,
        schema: schema,
      };
      // Call a function to send data to server
      handleSaveData(dataToSend);
    }
  };


  return (
    <div>
      <div style={{ maxHeight: "250px", overflowY: "auto" }}>
        {dropdowns.map((dropdown) => (
          <div
            key={dropdown.id}
            className="dropdown-container px-3"
            style={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <FaCircle
              style={{
                color: dropdown.isAccountName
                  ? "red"
                  : dropdown.isNewSegment
                  ? "grey"
                  : "green",
                fontFamily: "Lato, sans-serif",
                fontSize: "10px",
                marginRight: "4px",
              }}
            />
            <div className="facircle-icon"></div>
            <Form.Select
              value={dropdown.selectedOption}
              onChange={(e) =>
                setDropdowns((prevDropdowns) =>
                  prevDropdowns.map((d) => {
                    if (d.id === dropdown.id) {
                      const updatedDropdown = {
                        ...d,
                        selectedOption: e.target.value,
                      };
                      const isAccountName = e.target.value === "accountName";
                      return {
                        ...updatedDropdown,
                        isAccountName,
                        isNewSegment: false,
                      };
                    }
                    return d;
                  })
                )
              }
              style={formSelect}
              >
              <option value="" disabled>
                Add schema to segment
              </option>
              {options
                .filter(
                  (option) =>
                    !dropdowns.some(
                      (d) =>
                        d.selectedOption === option.value &&
                        d.id !== dropdown.id
                    )
                )
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </Form.Select>
            <button
              onClick={() => handleDeleteDropdown(dropdown.id)}
              style={buttonStyle}
            >
              -{" "}
            </button>
          </div>
        ))}
      </div>
      <a
        href="#"
        style={addTag}
        onClick={() => (isAddButtonDisabled ? null : handleAddDropdown())}
        disabled={isAddButtonDisabled}
      >
        + Add new schema
      </a>
      <div id="footer" style={footerStyle}>
        <Footer handleButtonClick={handleButtonClick} segmentName={segmentName} />
      </div>
    </div>
  );
};

export default Dropdown;
