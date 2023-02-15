import EmployeeForm from "./EmployeeForm";

const People = () => {
  return (
    <div>
      <button>Add New</button>
      <div className="employeeform-container">
        <div className="employeeform-overlay"></div>
        <EmployeeForm />
      </div>
    </div>
  );
};

export default People;
