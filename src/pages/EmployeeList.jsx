const EmployeeList = ({ employees, updateEmployee, updateCallback }) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_employee/${id}`,
        options
      );

      if (response.status === 200) {
        updateCallback();
      } else {
        console.log("Failed to delete");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.designation}</td>
              <td>
                <button onClick={() => updateEmployee(employee)}>Update</button>
                <button onClick={() => onDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
