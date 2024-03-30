import React, { useState, useEffect } from "react";
import EmployeeList from "./EmployeeList";
import EmployeeForm from "./EmployeeForm";

function Employee() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const response = await fetch("http://127.0.0.1:5000/get_employees");

    const data = await response.json();

    setEmployees(data.employees);

    console.log(data.employees);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <EmployeeList employees={employees} />
      <EmployeeForm />
    </>
  );
}

export default Employee;
