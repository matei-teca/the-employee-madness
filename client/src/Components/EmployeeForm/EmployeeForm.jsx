import "./EmployeeForm.css";
import { useAtom } from "jotai";
import state from "../../AtomStates";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(employee);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

        {employee ? 
         <div className="control">
         <label htmlFor="position">Equipment:</label>
          <ul>
          {employee.equipment?.map(item => {
            return(
              <li>{item.name}</li>
            )
          })}

          <li>ttest</li>
          <li>ttest</li>
          <li>ttest</li>
         
          </ul>

          <div className="control">
            <input
              defaultValue={null}
              name="equipment"
              id="equipment"
              list = "equipmentDataList"
              style ={{width: "200px"}}
            />
            <datalist id = "equipmentDataList">
              <option value="test"/>
              <option value="test"/>
              <option value="test"/>
            </datalist>
            {/* <div className="add-equipment--btnn">Add Equipment</div> */}
            <button type="button" className="add-equipment--button">Add Equipment</button>
        </div>

        </div>
        : 
        <div className="control">
          <label htmlFor="equipment">Equipment:</label>
          <input
          defaultValue={null}
          name="equipment"
          id="equipment"
          />
        </div>
      }



      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
