import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import CreateCourseForm from "./CreateCourseForm"; // CreateCourseForm component
import MyCoursesList from "./MyCoursesList"; // MyCoursesList component
import "../instructor-css/InsDashboard.css"; // Import CSS for styling

function InsDashboard() {
  const loggedInInstructorId = 101; // Dynamically set the logged-in instructor's ID

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="ins-dashboard">
      <h2 className="dashboard-title">Instructor Dashboard</h2>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Instructor Dashboard Tabs"
          centered
          className="tabs"
        >
          <Tab label="Create Course" className="tab" />
          <Tab label="My Courses" className="tab" />
        </Tabs>

        {selectedTab === 0 && <CreateCourseForm />}
        {selectedTab === 1 && (
          <MyCoursesList loggedInInstructorId={loggedInInstructorId} />
        )}
      </Box>
    </div>
  );
}

export default InsDashboard;
