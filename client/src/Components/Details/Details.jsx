import React, {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Header from '../Header/Header';
import DogDetail from './DogDetail/DogDetail';
import {callDetails} from '../../Redux/actions/actions';
import Footer from '../Footer/Footer';
import './Details.css';

function Details(props) {

  const dispatch = useDispatch();
  const dog = useSelector(state => state.details);
  const id = props.match.params.id;
  
  useEffect(() => {
    dispatch(callDetails(id))
  },[dispatch, id])

  return(
    <div className='details_component'>
      <Header />
      <DogDetail dog={dog[0]}/>
      <Footer />
    </div>
  )
}

export default Details;