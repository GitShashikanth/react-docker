import React, { useState } from "react";
import axios from "axios";
import "../instructor-css/CreateCourseForm.css";

const CreateCourseForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description) {
      setMessage("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    const courseData = {
      id: Date.now(), // Unique ID for the course
      title,
      description,
      instructorId: 101, // Hardcoded instructor ID for now
      published: true, // Course is published
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/publishedCourses",
        courseData
      );
      setMessage("Course created successfully!");
      console.log("Course created successfully:", response.data);
    } catch (error) {
      setMessage("Failed to create course. Please try again.");
      console.error("Error creating course:", error);
    } finally {
      setLoading(false);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="create-course-form">
      <h3>Create New Course</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="course-title">Course Title</label>
          <input
            type="text"
            id="course-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter course title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="course-description">Course Description</label>
          <textarea
            id="course-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter course description"
          />
        </div>

        <div className="form-group">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Publishing..." : "Publish Course"}
          </button>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateCourseForm;
