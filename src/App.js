import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Button from './components/Button';
import Sidebar from './components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [overlay, setoverlay] = useState(false)

  const handleButtonClick = () => {
    handleCloseSidebar()
  };

  const handleCloseSidebar = () => {
    setoverlay(!overlay);
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Navbar />
      <Button title="Save Segment" onClick={handleButtonClick} disabled={showSidebar} />
      {overlay && <div className="overlay" onClick={handleCloseSidebar} />}
      {showSidebar && <Sidebar showSidebar={handleCloseSidebar} /> }
    </>
  );
};

export default App;
