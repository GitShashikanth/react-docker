import React, { useEffect, useState } from "react";
import axios from "axios";
import "../instructor-css/MyCoursesList.css";

const MyCoursesList = ({ loggedInInstructorId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/publishedCourses"
      );

      const filteredCourses = response.data.filter(
        (course) => course.instructorId === loggedInInstructorId
      );

      console.log("Filtered courses:", filteredCourses);

      setCourses(filteredCourses);
    } catch (err) {
      setError("Failed to fetch courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [loggedInInstructorId]);

  return (
    <div className="my-courses-list">
      <h3>My Published Courses</h3>

      {loading && <p>Loading courses...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && courses.length === 0 && (
        <p>No courses published yet. Create a course to get started!</p>
      )}

      {!loading && !error && courses.length > 0 && (
        <ul className="courses-list">
          {courses.map((course) => (
            <li key={course.id} className="course-item">
              <h4>{course.title}</h4>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCoursesList;
