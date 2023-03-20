import React, {useRef, useEffect} from 'react';
import { useAtom } from "jotai";
import state from "../../AtomStates";

export default function SearchBy() {

    const [employees, setEmployees] = useAtom(state.employees);
    const inputRef = useRef(null);

    const handleByPosition = () => {

        fetch("/api/employees").then((res) => res.json())
            .then((employees) => {
                setEmployees(employees);
                setEmployees((employees) => {
                    return employees.filter((employee) => employee.position.toUpperCase() === inputRef.current.value.toUpperCase());
                })
        })
    }

    const handleByLevel = () => {

        fetch("/api/employees").then((res) => res.json())
            .then((employees) => {
                setEmployees(employees);
                setEmployees((employees) => {
                    return employees.filter((employee) => employee.level.toUpperCase() === inputRef.current.value.toUpperCase());
                })
        })
    }

  return (
    <div>
        {/* <div>SearchBy</div> */}
        <input ref = {inputRef} type="text" placeholder="choose a Position or Level" className='input'/>
        <button onClick={handleByPosition}>Filter by Position</button>
        <button onClick={handleByLevel}>Filter by Level</button>
    </div>
  )
}
