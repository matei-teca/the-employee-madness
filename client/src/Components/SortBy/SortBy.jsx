import React from 'react';
import { useAtom } from "jotai";
import state from '../../AtomStates';

export default function SortBy() {

    const [employees, setEmployees] = useAtom(state.employees);

    const handleSort = (sorter) => {
        console.log("works");

        setEmployees(employees => {
            // return employees.sort((a,b) => a.name.split(" ")[0].localeCompare(b.name.split(" ")[0]))

            // return employees.sort((a,b) => {
            //         if(a.firstname < b.firstname) { return -1; }
            //         if(a.firstname > b.firstname) { return 1; }
            //         return 0;
            //     }
            // )

            return employees.sort((a,b) => { 
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0; 
            })
        })

    }

  return (
    <div>
        <div>SortBy</div>
        <button onClick={() => handleSort("name")}>First name</button>
        <button>Last name</button>
        <button>Middle name</button>
        <button>Position</button>
        <button>Level</button>
    </div>

  )
}
