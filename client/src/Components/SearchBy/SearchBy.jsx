import React, {useRef, useEffect} from 'react';
import { useAtom } from "jotai";
import state from "../../AtomStates";

export default function SearchBy({handleTenEmployees}) {

    const [employees, setEmployees] = useAtom(state.employees);
    const inputRef = useRef(null);
    const [page, setPage] = useAtom(state.pagination); 

    const handleByPosition = () => {

        fetch("/api/employees").then((res) => res.json())
            .then((employees) => {
                setEmployees(employees);
                
                setEmployees((employees) => {
                    return employees.filter((employee) => employee.position.toUpperCase() === inputRef.current.value.toUpperCase());
                })
                handleTenEmployees(page)
        })
    }

    const handleByLevel = () => {

        fetch("/api/employees").then((res) => res.json())
            .then((employees) => {
                setEmployees(employees);
                setEmployees((employees) => {
                    return employees.filter((employee) => employee.level.toUpperCase() === inputRef.current.value.toUpperCase());
                })
                handleTenEmployees(page)

        })
    }

  return (
    <div style={{display:"flex", marginInline: "10%", marginBlock: "3%"}}>
        <div>SearchBy: </div>
        <input ref = {inputRef} type="text" placeholder="Level / Position" className='input'/>
        <button onClick={handleByLevel}>Filter by Level</button>
        <button onClick={handleByPosition}>Filter by Position</button>
    </div>
  )
}
