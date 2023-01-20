import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonCreateDog.css';

function ButtonCreateDog() {
  return (
    <Link to="/new" className='button_create_dog'>
      <p className='text_button'>Crea tu propio &#x1F436;</p>
    </Link>
  )
}

export default ButtonCreateDog;