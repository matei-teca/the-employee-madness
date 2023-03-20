import { Link } from "react-router-dom";

const EquipmentTable = () => (

  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th />
        </tr>
      </thead>
      <tbody>

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
);

export default EquipmentTable;
