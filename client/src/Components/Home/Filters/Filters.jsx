import React, {useState} from "react";
import TempFilter from "./TempFilter";
import CreatedFilter from "./CreatedFilter";
import './Filters.css';
import icon from '../../../images/filter_icon.svg';

function Filters({currentPage, setCurrentPage}) {

  const [open, setOpen] = useState(false)

  function handleClick(){
    setOpen(!open)
  }

  return (
    <div className="filter">
      <div className="div_button_filter">
        <button className="button_filter" onClick={handleClick}><img className="filter_icon" src={icon} alt="filter" />Filtrar</button>
      </div>
      {
        open && 
        <div className="div_filters_relative">  
          <div className="div_filters">
            <div className="div_fil">
              <span className="filtro_name">Creado en</span>
              <CreatedFilter className="options" currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            <div className="div_fil">
              <span className="filtro_name">Temperamentos</span>
              <TempFilter className="options" currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Filters;