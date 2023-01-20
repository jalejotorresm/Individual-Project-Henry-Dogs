import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {callPost} from '../../../Redux/actions/actions';
import { callTemperament } from '../../../Redux/actions/actions';
import './Form.css';



function validate(input) {
  //Name
  let errors = {};
  if(!input.name) {
    errors.name = 'Este perrito debe tener un nombre'
  } else if(!/[A-Z]+$/i.test(input.name)) {
    errors.name = 'Unicamente letras'
  } else if(parseInt(input.name.length) >= 25) {
    errors.name= 'Escribe un nombre de 25 letras o menos'
  }

  //Height
  if(!input.maxHeight) {
    errors.maxHeight = "Altura maxima requerida"
  } else if(parseInt(input.maxHeight) > 85) {
    errors.maxHeight = 'Debe ser menor a 85 CM' 
  } else if(!/^[0-9]+$/.test(input.maxHeight)) {
    errors.maxHeight = 'Unicamente numeros'
  }

  if(!input.minHeight) {
    errors.minHeight = 'Altura minima requerida'
  } else if(parseInt(input.minHeight) >= parseInt(input.maxHeight)) {
    errors.minHeight = 'Debe ser menor al maximo'
  } else if(!/^[0-9]+$/.test(input.minHeight)) {
    errors.minHeight = 'Unicamente numeros'
  }

  //Weight  
  if(!input.maxWeight) {
    errors.maxWeight = "Peso maximo requerido"
  } else if(parseInt(input.maxWeight) > 90) {
    errors.maxWeight = 'Debe ser menor a 90 KG'
  } else if(!/^[0-9]+$/.test(input.maxWeight)) {
    errors.maxWeight = 'Unicamente numeros'
  }

  if(!input.minWeight) {
    errors.minWeight = 'Peso minimo requerido'
  } else if(parseInt(input.minWeight) >= parseInt(input.maxWeight)) {
    errors.minWeight= 'Debe ser menor al max'
  } else if(!/^[0-9]+$/.test(input.minWeight)) {
    errors.maxWeight = 'Unicamente numeros'
  }

  //Lifespan
  if(!input.maxLifeSpan) {
    errors.maxLifeSpan = 'Maximo de años requerido'
  } else if(parseInt(input.maxLifeSpan) > 20) {
    errors.maxLifeSpan = 'Debe ser menor a 20 Años'
  } else if(!/^[0-9]+$/.test(input.maxLifeSpan)) {
    errors.maxLifeSpan = 'Unicamente numeros'
  }
  
  if(!input.minLifeSpan) {
    errors.minLifeSpan = 'Minimo de años requerido'
  } else if(parseInt(input.minLifeSpan) >= parseInt(input.maxLifeSpan)) {
    errors.minLifeSpan = 'Debe ser menor al max'
  } else if(!/^[0-9]+$/.test(input.minLifeSpan)) {
    errors.minLifeSpan = 'Unicamente numeros'
  }

  return errors;
}


function Form() {

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(callTemperament())
  }, [dispatch])

  const temperaments = useSelector(state => state.temperaments)


  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    image:"",
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minLifeSpan: "",
    maxLifeSpan: "",
    temperament: []
  });

  const [selectNameState, setSelectNameState] = useState([])
  
  function handleChange(e){
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSelect(e){

    if(input.temperament.includes(e.target.value)) return

    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value]
    })

    const selectName = e.target.value;
    if(selectName === "default") return;
    setInput({...input , temperament:[...input.temperament, selectName]})
    setSelectNameState([...selectNameState, temperaments.find(e => e.id === parseInt(selectName))])
  }

  function handleSubmit(e){
    e.preventDefault();
    if(!errors.name && !errors.minHeight && !errors.maxHeight &&!errors.minWeight && !errors.maxWeight) {
      try {
        dispatch(callPost(input))
        setInput({
          image:"",
          name: "",
          minHeight: "",
          maxHeight: "",
          minWeight: "",
          maxWeight: "",
          minLifeSpan: "",
          maxLifeSpan: "",
          temperament: []
        })
        setSelectNameState([])
      } catch (error) {
        console.log(error)
      }
    } 
  }


  function handleDelete(e){
    setInput({...input, temperament : input.temperament.filter(t => t !== e.target.value)})
    setSelectNameState(selectNameState.filter(t => t.id !== parseInt(e.target.value)))
  }


  return(
    <div className='form_container'>
      <h2 className='form_title'>Por favor ingresa los datos de tu peludito:</h2>
      <p className='mandatory_data'>Datos marcados con * son obligatorios</p>

      <form className='form' action="" onSubmit={handleSubmit}>
        {/* ---- Name Field ---- */}
        <div>
          <div>
            <label>Nombre *</label>
            <div className={errors.name ? "div_input error" : "div_input"}>
              <input className='form_input' placeholder='Ej: Firulais' onChange={handleChange} name="name" value={input.name}/>
            </div>
            {errors.name && (<span className='wrong_data'>{errors.name}</span>)}
          </div>
        </div>

        {/* ---- Image Field ---- */}
        <div>
          <label>Imagen</label>
          <div className= "div_input">
            <input className='form_input' placeholder='Url de la imagen' onChange={handleChange} name="image" value={input.image}/>
          </div>
        </div>

        {/* ---- Height Field ---- */}
        <div className='div_double_input'>
          <div className='min'>
            <label>Altura (en cm)*</label>
            <div className={errors.minHeight ? "div_input error" : "div_input"}>
              <input className='form_input max' placeholder='Min' onChange={handleChange} name="minHeight" value={input.minHeight}/>
            </div>
            {errors.minHeight && (<span className='wrong_data'>{errors.minHeight}</span>)}
          </div>

          <div className='max'>
            <label className='label_min'>Filler Label</label>
            <div className={errors.maxHeight ? "div_input error" : "div_input"}>
              <input className='form_input min' placeholder='Max' onChange={handleChange} name="maxHeight" value={input.maxHeight}/>
            </div>
            {errors.maxHeight && (<span className='wrong_data'>{errors.maxHeight}</span>)}
          </div>
        </div>

        {/* ---- Weight Field ---- */}
        <div className='div_double_input'>
          <div className='min'>
            <label>Peso (en kg)*</label>
            <div className={errors.minWeight ? "div_input error" : "div_input"}>
              <input className='form_input max' placeholder='Min' onChange={handleChange} name="minWeight" value={input.minWeight}/>
            </div>
            {errors.minWeight && (<span className='wrong_data'>{errors.minWeight}</span>)}
          </div>

          <div className='max'>
            <label className='label_min'>Filler Label</label>
            <div className={errors.maxWeight ? "div_input error" : "div_input"}>
              <input className='form_input min' placeholder='Max' onChange={handleChange} name="maxWeight" value={input.maxWeight}/>
            </div>
            {errors.maxWeight && (<span className='wrong_data'>{errors.maxWeight}</span>)}
          </div>
        </div>

        {/* ---- Lifespan Field ---- */}
        <div className='div_double_input'>
          <div className='min'>
            <label>Años de vida*</label>
            <div className={errors.minLifeSpan ? "div_input error" : "div_input"}>
              <input className='form_input max_years' placeholder='Min' onChange={handleChange} name="minLifeSpan" value={input.minLifeSpan}/>
            </div>
            {errors.minLifeSpan && (<span className='wrong_data'>{errors.minLifeSpan}</span>)}
          </div>

          <div className='max'>
            <label className='label_min'>Filler Label</label>
            <div className={errors.maxLifeSpan ? "div_input error" : "div_input"}>
              <input className='form_input min_years' placeholder='Max' onChange={handleChange} name="maxLifeSpan" value={input.maxLifeSpan}/>
            </div>
            {errors.maxLifeSpan && (<span className='wrong_data'>{errors.maxLifeSpan}</span>)}
          </div>
        </div>
        
        {/* ---- Temperament Field ---- */}
        <div>
          <label>Temperamentos</label>
          <div className="div_input">
            <select className='select_form' name="temperaments" onChange={handleSelect}>
              {temperaments.map((t, i) => {
                return(
                  <option className='option_form' key={i} value={t.id}>{t.name}</option>
                )
              })}
            </select>
          </div>
          <div className='div_form_final_temps'>
            <ul className='ul_temp'>
              {selectNameState.map((e, i) => {
                return(
                <li className='li_temp' key={i}>
                  {e.name}
                  <button className='delete_temp' type='button' value={e.id} onClick={handleDelete}>x</button>
                </li>
                )
              })}
            </ul>
          </div>
        </div>
        
        {/* ---- Create Button ---- */}
        <input className={errors.name || errors.minHeight || errors.maxHeight || errors.minWeight || errors.maxWeight ? "submit none" : "submit"} type="submit" value="Crear Perro"/>

      </form>
    </div>
  )
}

export default Form