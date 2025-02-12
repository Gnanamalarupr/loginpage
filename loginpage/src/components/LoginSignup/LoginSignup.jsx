import React, { useState } from "react";
import "./LoginSignup.css";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [students, setStudents] = useState([
    { subjects: ["", "", "", "", ""], total: 0 },
    { subjects: ["", "", "", "", ""], total: 0 },
    { subjects: ["", "", "", "", ""], total: 0 },
    { subjects: ["", "", "", "", ""], total: 0 },
    { subjects: ["", "", "", "", ""], total: 0 },
  ]);

  const handleInputChange = (studentIndex, subjectIndex, value) => {
    const updatedStudents = [...students];
    updatedStudents[studentIndex].subjects[subjectIndex] = value;
    setStudents(updatedStudents);
  };

  const calculateTotal = () => {
    const updatedStudents = students.map((student) => {
      const total = student.subjects.reduce(
        (acc, mark) => acc + (parseInt(mark) || 0),
        0
      );
      return { ...student, total };
    });
    setStudents(updatedStudents);
  };

  const handleSubmit = () => {
    if (!email || !password || (action === "Sign Up" && !name)) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (email === "student" && password === "9861") {
      setErrorMessage("");
      setIsAuthenticated(true);
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div className="container">
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>

          <div className="inputs">
            {action === "Sign Up" && (
              <div className="input">
                <img src={user_icon} alt="User" />
                <input
                  placeholder="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="input">
              <img src={email_icon} alt="Email" />
              <input
                type="email"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input">
              <img src={password_icon} alt="Password" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="submit-container">
            <button
              className={action === "Login" ? "submit gray" : "submit"}
              onClick={() => setAction("Sign Up")}
              disabled={action === "Login"}
            >
              Sign Up
            </button>
            <button
              className={action === "Sign Up" ? "submit gray" : "submit"}
              onClick={() => setAction("Login")}
              disabled={action === "Sign Up"}
            >
              Login
            </button>
          </div>

          <button className="submit-button" onClick={handleSubmit}>
            {action}
          </button>
        </div>
      ) : (
        <div className="table-container">
          <h2>Student Marks Table</h2>
          <table>
            <thead>
              <tr>
                <th>Subject 1</th>
                <th>Subject 2</th>
                <th>Subject 3</th>
                <th>Subject 4</th>
                <th>Subject 5</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, studentIndex) => (
                <tr key={studentIndex}>
                  {student.subjects.map((mark, subjectIndex) => (
                    <td key={subjectIndex}>
                      <input
                        type="number"
                        value={mark}
                        onChange={(e) =>
                          handleInputChange(studentIndex, subjectIndex, e.target.value)
                        }
                      />
                    </td>
                  ))}
                  <td>{student.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-button" onClick={calculateTotal}>
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
