import React from 'react';
import { useAtom } from "jotai";
import state from '../../AtomStates';

export default function SortBy({handleTenEmployees}) {

    const [employees, setEmployees] = useAtom(state.employees);
    const [currTenEmployees, setCurrTenEmployees] = useAtom(state.currTenEmployees); 
    const [page, setPage] = useAtom(state.pagination); 

    const handleSortByName = (criteria) => {

        fetch("/api/employees").then((res) => res.json())
            .then((employees) => {
                setEmployees(employees);
                
                setEmployees(employees => {
        
                    const newArr = [...employees].sort((a,b) => { 
                        let nameA = a.name.toUpperCase().split(" ");
                        let nameB = b.name.toUpperCase().split(" "); 

                            if (criteria === "fname"){
                                nameA = nameA[0];
                                nameB = nameB[0];
                            }
            
                            if (criteria === "lname"){
                                nameA = nameA[nameA.length-1];
                                nameB = nameB[nameB.length-1];
                            }

                            if (criteria === "mdlname"){
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
        handleTenEmployees(page)
    }

    const handleSortByStatus = (criteria) => {
        fetch("/api/employees").then((res) => res.json())
            .then((employees) => {
                setEmployees(employees);
                
                setEmployees(employees => {
        
                    const newArr = [...employees].sort((a,b) => { 

                            if (a[criteria] < b[criteria]) {
                                return -1;
                            }
                            if (a[criteria] > b[criteria]) {
                                return 1;
                            }
            
                            // names must be equal
                            return 0; 

                    })
                    
                    return newArr
                })
        })
        handleTenEmployees(page);
    }

  return (
    <div style={{display:"flex", marginInline: "10%", marginBlock: "3%"}}>
        <div>SortBy: </div>
        <button onClick={() => handleSortByName("fname")}>First name</button>
        <button onClick={() => handleSortByName("lname")}>Last name</button>
        <button onClick={() => handleSortByName("mdlname")}>Middle name</button>
        <button onClick={() => handleSortByStatus("level")}>Level</button>
        <button onClick={() => handleSortByStatus("position")}>Position</button>
    </div>

  )
}
