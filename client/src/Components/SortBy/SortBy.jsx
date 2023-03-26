import React from 'react';
import { useAtom } from "jotai";
import state from '../../AtomStates';

import NavDropdown from "react-bootstrap/NavDropdown";

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
        // handleTenEmployees(page)
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
                  <NavDropdown
                title="Sort by"
                id="basic-nav-dropdown"
                style={{ width: "17vw", marginLeft: "7vw" }}
              >
    <div style={{display:"flex", flexDirection:"column", marginInline: "10%", marginBlock: "3%", width: "200px"}}>
        <button onClick={() => handleSortByName("fname")} style={{width:"80%"}}>First name</button>
        <button onClick={() => handleSortByName("lname")} style={{width:"80%"}}>Last name</button>
        <button onClick={() => handleSortByName("mdlname")} style={{width:"80%"}}>Middle name</button>
        <button onClick={() => handleSortByStatus("level")} style={{width:"80%"}}>Level</button>
        <button onClick={() => handleSortByStatus("position")} style={{width:"80%"}}>Position</button>
    </div>
    </NavDropdown>

  )
}
