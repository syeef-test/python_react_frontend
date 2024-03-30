import React, { useState, useEffect } from "react";

function Employee() {
  const [employee, setEmployee] = useState([]);

  const fetchEmployees = async () => {
    const response = await fetch("http://127.0.0.1:5000/get_employees");

    const data = await response.json();

    setEmployee(data.employees);

    console.log(data.employees);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return <div>Employee</div>;
}

export default Employee;
