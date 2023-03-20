import { Link } from "react-router-dom";
import React, {useState} from "react"

const EquipmentTable = () => {

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  const handleNameInput = (e) => {
    setName(e.target.value);
  }

  const handleTypeInput = (e) => {
    setType(e.target.value);
  }

  const handleAmountInput = (e) => {
    setAmount(e.target.value);
  }


  return (
    <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Amount</th>
          <th />
        </tr>
      </thead>
      <tbody>

          <tr>
            <td><input type = "text" placeholder = "Name" onChange={handleNameInput}/></td>
            <td><input type = "text" placeholder = "Type" onChange={handleTypeInput}/></td>
            <td><input type = "text" placeholder = "Amount" onChange={handleAmountInput}/></td>
            <td>
              <button type="button" onClick={() => alert("nothing yet")}>
                Add equipment
              </button>
            </td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button type="button" onClick={() => alert("nothing yet")}>
                Delete
              </button>
            </td>
          </tr>

      </tbody>
    </table>
  </div>
  )
}


export default EquipmentTable;
