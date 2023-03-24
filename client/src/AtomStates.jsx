import {atom} from "jotai";

const state = {
    employees: atom(null),
    equipment: atom(null),
    pagination: atom(1),
    currTenEmployees: atom(null)
}

export default state;