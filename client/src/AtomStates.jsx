import {atom} from "jotai";

const state = {
    employees: atom(null),
    equipment: atom(null),
    pagination: atom(0),
    currTenEmployees: atom(null),
    paginationRows: atom(10)
}

export default state;