import "./EmployeeForm.css";
import React, {useState, useEffect, useRef} from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, currEmployeeId }) => {

  const [equipment, setEquipment] = useState(null);
  const equipmentInputRef = useRef(null);
  const [currEmployeeEquipment, setCurrEmployeeEquipment] = useState([]);
  const [count, setcount] = useState(0);
  const levelInputRef = useRef(null)

  useEffect(() => {

    (async () => {
      try {
        const getResponse = await fetch("http://localhost:8080/api/equipment");
        const getData = await getResponse.json();
        setEquipment(await getData);

        const getCurrEquipment = await fetch(`/api/employee/${currEmployeeId}/equipment`);
        const currEquipmentData = await getCurrEquipment.json();
        setCurrEmployeeEquipment(currEquipmentData.currEquipmentResponse);
  
      } catch (e) {
        console.log(e);
      }
    })()

  }, [count])  

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

  const handleAddEquipment = (e) => {
    const inputValue = equipmentInputRef.current.value;

    let selectedEquipmentId;
    equipment.forEach(item => {
      if(item.name === inputValue){
        selectedEquipmentId = item._id;
      }
    })

    let currEmployeeEquipmentIds =[];
    currEmployeeEquipment.map(equipmentItem => {
      currEmployeeEquipmentIds.push(equipmentItem._id);
    })
    
    if (currEmployeeEquipmentIds.includes(selectedEquipmentId) === false)
    {
      fetch(`/api/equip/employees/${currEmployeeId}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({selectedEquipmentId})
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  
      setcount(count + 1);
    } else {
      alert("This equipment is already assigned to the employee")
    }
  }

  const handleSalaryToLevel = (e) => {
    if(e.target.value <= 100){
      levelInputRef.current.value = "Junior";
    } else if (e.target.value > 100 && e.target.value <= 300){
      levelInputRef.current.value = "Medior"
    } else if (e.target.value > 300 && e.target.value <= 400){
      levelInputRef.current.value = "Senior"
    } else if (e.target.value > 400 && e.target.value <= 800){
      levelInputRef.current.value = "Expert"
    } else if (e.target.value > 800){
      levelInputRef.current.value = "Godlike"
    }
  }

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
          value=
          {
            // employee && employee.salary ?  employee.level : null
            (() => {
              if(employee && employee.salary){
                if(employee.salary <= 100){
                  return "Junior"
                } else if (employee.salary > 100 && employee.salary <= 300){
                  return "Medior"
                } else if (employee.salary > 300 && employee.salary <= 400){
                  return "Senior"
                } else if (employee.salary > 400 && employee.salary <= 800){
                  return "Expert"
                } else if (employee.salary > 800){
                  return "Godlike"
                }
              } else {
                return null
              }
            })()
            
          }

          name="level"
          id="level"
          readOnly
          ref={levelInputRef}
          style = {{borderColor: "white"}}
        />
      </div>

      <div className="control">
        <label htmlFor="salary">Salary:</label>
        <input
          defaultValue={employee ? employee.salary : null}
          name="salary"
          id="salary"
          type="number"
          onChange={handleSalaryToLevel}
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
      <div>
        {employee ?
        <div className="control">
          <label htmlFor="readBooks.name">Add a book name: </label>
          <input
            defaultValue={null}
            name="readBooks.name"
            id="readBooks.name"
          />
          <label htmlFor="readBooks.author">Add the author: </label>
          <input
            defaultValue={null}
            name="readBooks.author"
            id="readBooks.author"
          />
          <div>
            {employee && employee.readBooks.length > 0 ? 
          employee.readBooks.map(book => <div>Books read: <div>{book.name}</div></div>) 
          : "No read books yet."}</div>
        </div>
        :
        <div className="control">
          <div>{employee && employee.readBooks.length > 0 ? employee.readBooks : "No read books yet."}</div>
        </div>
        }

      </div>

        {employee ? 
         <div className="control">
         <label htmlFor="position">Equipment:</label>
          <ul>

          {currEmployeeEquipment.length > 0 ? currEmployeeEquipment?.map((item, index) => {
            return(
              <li key={index}>{item.name}</li>
            )
          }) : <div>No equipment yet</div>}
{/* 
          <li>ttest</li>
          <li>ttest</li>
          <li>ttest</li> */}
         
          </ul>

          <div className="control">
            <input
              defaultValue={null}
              name="equipment"
              ref={equipmentInputRef}
              list = "equipmentDataList"
              style ={{width: "200px"}}
            />
            <datalist id = "equipmentDataList">
              {equipment?.map(item => {
                return <option key={item._id} value={item.name}/>
              })}
            </datalist>
            {/* <div className="add-equipment--btnn">Add Equipment</div> */}
            <button type="button" className="add-equipment--button" onClick={handleAddEquipment}>Add Equipment</button>
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
