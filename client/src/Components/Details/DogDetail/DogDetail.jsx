import React from "react";
import './DogDetail.css';

function DogDetail({dog}){

  return(
    <div className="dogDetail">

      <div className="left">
        <div className="profile">
          <div className="div_dog_name">
            <h2 className="name_dog">{dog?.name}</h2>
            <span className="about_dog">Sobre este amiguito:</span>
          </div>
        </div>

        <div className="table_container">
          <table>
            <tr>
              <th className="table_header">Caracteristicas</th>
              <th className="table_header">Minimo</th>
              <th className="table_header">Maximo</th>
            </tr>
            <tr>
              <td className="table_features">Altura (en cm)</td>
              <td className="table_data">{dog?.minHeight}</td>
              <td className="table_data">{dog?.maxHeight}</td>
            </tr>
            <tr>
              <td className="table_features">Peso (en kg)</td>
              <td className="table_data">{dog?.minWeight}</td>
              <td className="table_data">{dog?.maxWeight}</td>
            </tr>
            <tr>
              <td className="table_features">Años de vida</td>
              <td className="table_data">{dog?.minLifeSpan}</td>
              <td className="table_data">{dog?.maxLifeSpan}</td>
            </tr>
            <tr>
              <td className="table_features">Temperamento</td>
              <td colSpan="2" className="table_data temp">{dog?.temperament}</td>
            </tr>
          </table>
        </div>
      </div>

      <div className="right">
        <div className="div_banner">
          <img className="banner" src={dog?.image} alt="banner" />
        </div>
      </div>
    </div>
  )
}

export default DogDetail;