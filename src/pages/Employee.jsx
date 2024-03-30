import React, { useState, useEffect } from "react";
import EmployeeList from "./EmployeeList";
import EmployeeForm from "./EmployeeForm";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});

  const fetchEmployees = async () => {
    const response = await fetch("http://127.0.0.1:5000/get_employees");

    const data = await response.json();

    setEmployees(data.employees);

    console.log(data.employees);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEmployee({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const openEditModal = (employee) => {
    if (isModalOpen) return;
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchEmployees();
  };

  return (
    <>
      <EmployeeList
        employees={employees}
        updateEmployee={openEditModal}
        updateCallback={onUpdate}
      />
      <button onClick={openCreateModal}>Create New Employee</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="clos" onClick={closeModal}>
              &times;
            </span>
            <EmployeeForm
              existingEmployee={currentEmployee}
              updateCallback={onUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Employee;
