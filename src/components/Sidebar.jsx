import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import Dropdown from "./Dropdown";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Sidebar.css'

const Sidebar = (props) => {
  const showSidebar = props.showSidebar
  const [segmentName, setSegmentName] = useState("");
  const saveSegment = {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    background: "#39AEBC",
    color: "#fff",
  }
  const pointer = {
    PointerEvent: "none"
  }
  const [dropdowns, setDropdowns] = useState([
    {
      id: 1,
      selectedOption: "",
      isNewSegment: true,
    },
  ]);

  const handleSegmentNameChange = (e) => {
    setSegmentName(e.target.value);
  };

  const handleSaveData = (data) => {
    axios.post('https://webhook.site/ae01c031-2ae6-49f1-8d28-59d7c139a169', data )
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    console.log("Data to be saved:", data);
  };

  const handleDropdownChange = (id, selectedOption) => {
    setDropdowns((prevDropdowns) =>
      prevDropdowns.map((dropdown) => {
        if (dropdown.id === id) {
          return { ...dropdown, selectedOption: selectedOption };
        }
        return dropdown;
      })
    );
  };

  const handleDeleteDropdown = (dropdownId) => {
    setDropdowns((prevDropdowns) =>
      prevDropdowns.filter((dropdown) => dropdown.id !== dropdownId)
    );
  };

  return (
    <div id="sidebar">
      <div className="sidebar-content">
        <div style={saveSegment}>
          <span className="save-segment-text" onClick={showSidebar}>&lt;</span>
          <p className="m-0" style={pointer}>Saving Segment</p>
        </div>
        <div style={{ padding: "15px" }}>
          <div style={{ marginTop: "20px", color: "black", textAlign: "left" }}>
            <label className="text-label" htmlFor="segmentName">
              Enter the name of the segment
            </label>
            <InputGroup className="mb-3">
              <Form.Control
                required
                id="segmentName"
                placeholder="Name of the segment"
                value={segmentName}
                onChange={handleSegmentNameChange}
              />
            </InputGroup>
            <div style={{ marginBottom: "5px", fontFamily: "Lato, sans-serif", textAlign: "left" }}>
              <p style={{ fontSize: "14px" }}>
                To save your segment, you need to add the schemas to build the
                query
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginRight: "16px" }}>
              <p style={{ fontFamily: "Lato, sans-serif", fontSize: "12px", marginRight: "20px" }}>
                <FaCircle style={{ color: "green", fontFamily: "Lato, sans-serif", fontSize: "10px", marginRight: "4px" }} />
                - User Traits
              </p>
              <p style={{ fontFamily: "Lato, sans-serif", fontSize: "12px" }}>
                <FaCircle style={{ color: "red", fontFamily: "Lato, sans-serif", fontSize: "10px", marginRight: "4px" }} />
                - Group Traits
              </p>
            </div>
          </div>
        </div>
        <div id="dropdown">
          <Dropdown
            segmentName={segmentName}
            dropdowns={dropdowns}
            handleDropdownChange={handleDropdownChange}
            handleDeleteDropdown={handleDeleteDropdown}
            handleSaveData={handleSaveData}
            showSidebar={showSidebar}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
