import React from 'react';
import { useAtom } from "jotai";
import state from '../../AtomStates';

export default function SortBy() {

    const [employees, setEmployees] = useAtom(state.employees);

    const handleSortByName = (sorter) => {

        fetch("/api/employees").then((res) => res.json())
            .then((employees) => {
                setEmployees(employees);
                
                setEmployees(employees => {
        
                    const newArr = [...employees].sort((a,b) => { 
                        let nameA = a.name.toUpperCase().split(" ");
                        let nameB = b.name.toUpperCase().split(" "); 

                            if (sorter === "fname"){
                                nameA = nameA[0];
                                nameB = nameB[0];
                            }
            
                            if (sorter === "lname"){
                                nameA = nameA[nameA.length-1];
                                nameB = nameB[nameB.length-1];
                            }

                            if (sorter === "mdlname"){
                                nameA = nameA[1];
                                nameB = nameB[1];
                            }
            
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
            
                            // names must be equal
                            return 0; 

                    })
                    
                    return newArr
                })
        })
    }

    


  return (
    <div>
        <div>SortBy</div>
        <button onClick={() => handleSortByName("fname")}>First name</button>
        <button onClick={() => handleSortByName("lname")}>Last name</button>
        <button onClick={() => handleSortByName("mdlname")}>Middle name</button>
        <button>Position</button>
        <button>Level</button>
    </div>

  )
}
