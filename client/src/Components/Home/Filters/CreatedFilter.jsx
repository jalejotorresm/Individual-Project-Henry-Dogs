import React from "react";
import { callDbFilter } from "../../../Redux/actions/actions";
import {useDispatch} from'react-redux';
import "./Options.css"

function CreatedFilter({currentPage, setCurrentPage}) {
  const dispatch = useDispatch();

  function handleSelect(e){
    const value = e.target.value;
    setCurrentPage(1)
    dispatch(callDbFilter(value))
  }

  return (
    <div>
      <select onChange={handleSelect}>
        <option selected disabled>Selecciona uno</option>
        <option value="All">Todos</option>
        <option value="Api">API</option>
        <option value="Created">Base de datos</option>
      </select>
    </div>
  )
}

export default CreatedFilter;