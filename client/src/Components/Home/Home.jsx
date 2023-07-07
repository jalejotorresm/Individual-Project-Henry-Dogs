import React, {useState} from 'react';
import Header from '../Header/Header';
import AllCards from './AllCards/AllCards';
import ButtonCreateDog from './ButtonCreateDog/ButtonCreateDog';
import Filters from './Filters/Filters'
import Footer from '../Footer/Footer';
import { useDispatch } from 'react-redux';
import { callNameSort, callWeightSort } from '../../Redux/actions/actions';
import './Home.css';

function Home() {

  const dispatch = useDispatch();

  function handleChange(e){
    const value = e.target.value;
    if(value === "name_asc" || value === "name_des") {
      dispatch(callNameSort(value))
    } 
    if(value === "weight_asc" || value === "peso_des") {
      dispatch(callWeightSort(value))
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  

  return (
    <div className="home">
      <Header />
      <div className='home_options'>
        <ButtonCreateDog />
        <div className='div_filtro_ordernamineto'>
          <Filters currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <div className='div_ordernamiento'>
            <span className='ordenar_text'>Ordernar por :</span>
            <select className='select_ordernamiento' onChange={handleChange}>
              <option className='option_name' value="name_asc">Nombre (asc)</option>
              <option className='option_name' value="name_des">Nombre (des)</option>
              <option className='option_name' value="weight_asc">Peso (asc)</option>
              <option className='option_name' value="peso_des">Peso (des)</option>
            </select>
          </div>
        </div>
      </div>
      <AllCards 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        dogsPerPage={dogsPerPage} 
        indexOfFirstDog={indexOfFirstDog} 
        indexOfLastDog={indexOfLastDog}
      />
      <Footer />
    </div>
  )
}

export default Home;