import "./EmployeeForm.css";
import React, {useState, useEffect, useRef} from "react";


const EmployeeForm = ({ onSave, disabled, employee, onCancel, currEmployeeId }) => {

  const [equipments, setEquipments] = useState(null);
  const equipmentInputRef = useRef(null);
  const [currEmployeeEquipment, setCurrEmployeeEquipment] = useState([]);

  //add to currEq
  //display currEq

  //fetch currEq in Update component

  useEffect(() => {

    (async () => {
      try {
        const getResponse = await fetch("http://localhost:8080/api/equipments");
        const getData = await getResponse.json();
        setEquipments(await getData);

        const getCurrEquipment = await fetch(`/api/employee/${currEmployeeId}/equipment`);
        const currEquipmentData = await getCurrEquipment.json();
        setCurrEmployeeEquipment(currEquipmentData.currEquipmentResponse);
  
      } catch (e) {
        console.log(e);
      }
    })()

  }, [])  

  console.log(currEmployeeEquipment);

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
    equipments.forEach(item => {
      if(item.name === inputValue){
        selectedEquipmentId = item._id;
      }
    })

    // console.log(selectedEquipmentId);

    // setCurrEmployeeEquipment(prev => [...prev, selectedEquipmentId])
    // console.log(currEmployeeEquipment);

    fetch(`/api/equip/employees/${currEmployeeId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({selectedEquipmentId})
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
      
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
          {currEmployeeEquipment?.map((item, index) => {
            return(
              <li key={index}>{item.name}</li>
            )
          })}
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
              {equipments?.map(item => {
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
