import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callRequired } from "../../../Redux/actions/actions";
import search_icon from "../../../images/search-icon.svg";
import './SearchBar.css';
import {Link } from "react-router-dom";

function SearchBar() {

  const dispatch = useDispatch()

  const [nameDog, setNameDog] = useState('')

  const dogKennel = useSelector(state => state.dogKennel)

  function handleChange(e){
    setNameDog(e.target.value)
    if(nameDog && nameDog) {
      dispatch(callRequired(nameDog))
    }
  }

  function handleClick() {
    setNameDog('')
  }

  return(
    <div className="searchBar_Container">
      <div className="divInput_SearchBar">
        <div className="div_button_search">
          <img className="searchIcon" src={search_icon} alt="serach" />
        </div>
        <input className="searchBar" type="text" placeholder="Buscar" onChange={handleChange} value={nameDog}/>
        <button className={nameDog.length > 0 ? "cleaner active" : "cleaner"} onClick={handleClick} >x</button>
      </div>

      <div className={nameDog.length !== 0 ? "divSearchBar_Results active" : "divSearchBar_Results"}>
        <div className="div_nameResult">
          {nameDog && dogKennel.slice(0).map((d, i) => {
            return (
              <div>
                <Link className="results" to={`/dogDetail/${d.id}`} key={i}>{d.name}</Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchBar;