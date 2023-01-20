import React from 'react';
import Header from '../Header/Header';
import Form from './Form/Form';
import Footer from '../Footer/Footer';
import './DogForm.css';

function DogForm() {
  return(
    <div className='dog_form'>
      <Header />
      <Form />
      <Footer />
    </div>
  )
}

export default DogForm