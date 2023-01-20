import React, {useEffect} from "react";
import {callTempFilter, callTemperament} from '../../../Redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import "./Options.css"

function TempFilter({currentPage, setCurrentPage}) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(callTemperament())
  }, [dispatch])

  const temp = useSelector(state => state.temperaments)

  function handleFilter(e){
    const value = e.target.value
    setCurrentPage(1)
    dispatch(callTempFilter(value))
  }

  return(
    <div>
      <select onChange={handleFilter}>
        <option selected disabled>Selecciona uno</option>
        <option value="All">All Temperaments</option>
        {temp && temp.map((t, i) => {
          return (
            <option value={t.name} key={i}>{t.name}</option>
          )
        })}
      </select>
    </div>
  )
}

export default TempFilter;