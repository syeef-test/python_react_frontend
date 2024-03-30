import { useState } from "react";

const EmployeeForm = ({ existingEmployee = {}, updateCallback }) => {
  const [name, setName] = useState(existingEmployee.name || "");
  const [email, setEmail] = useState(existingEmployee.email || "");
  const [designation, setDesignation] = useState(
    existingEmployee.designation || ""
  );

  const updating = Object.entries(existingEmployee).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      designation,
    };

    const url =
      `http://127.0.0.1:5000/` +
      (updating ? `update_employee/${existingEmployee.id}` : `create_employee`);
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      // alert("Employee added");
      // setName("");
      // setEmail("");
      // setDesignation("");
      updateCallback();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="designation">Designation:</label>
        <input
          type="text"
          id="designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
      </div>
      <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
  );
};

export default EmployeeForm;
