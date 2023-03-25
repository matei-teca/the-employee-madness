import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import { useAtom } from "jotai";
import state from "../../AtomStates";

const EquipmentTable = () => {

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  const [equipment, setEquipment] = useAtom(state.equipment);

  useEffect(() => {

    (async () => {
      try {
        const getResponse = await fetch("http://localhost:8080/api/equipment");
        const getData = await getResponse.json();
        setEquipment(await getData);
  
      } catch (e) {
        console.log(e);
      }
    })()

  }, [])

  const handleNameInput = (e) => {
    setName(e.target.value);
  }

  const handleTypeInput = (e) => {
    setType(e.target.value);
  }

  const handleAmountInput = (e) => {
    setAmount(e.target.value);
  }

  const handleAddEquipment = async () => {
    const data = {name, type, amount};

      try {
        const postResponse = await fetch("http://localhost:8080/api/equipment", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(data)
        });
  
        const postData = await postResponse.json();
        console.log(postData);

        const getResponse = await fetch("http://localhost:8080/api/equipment");
        const getData = await getResponse.json();
        setEquipment(await getData);

        console.log(equipment);

      } catch (e) {
        console.log(e);
      }
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
            <td><input type = "number" placeholder = "Amount" onChange={handleAmountInput}/></td>
            <td>
              <button type="button" onClick={handleAddEquipment}>
                Add equipment
              </button>
            </td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
            </td>
          </tr>

          {equipment?.map(equipment => {
            return(
            <tr key = {equipment._id}>
              <td>{equipment.name}</td>
              <td>{equipment.type}</td>
              <td>{equipment.amount}</td>
              <td>
                {/* <button type="button" onClick={() => alert("nothing yet")}>
                  Delete
                </button> */}
              </td>
            </tr>
            )

          })}

      </tbody>
    </table>
  </div>
  )
}


export default EquipmentTable;
