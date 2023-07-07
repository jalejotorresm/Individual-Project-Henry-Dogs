import React from "react";
import "./Landing.css";
import {Link} from "react-router-dom";
import logo_base from "../../images/logo_base.png";
import logo_resp from "../../images/logo_resp.png";
import logo_mobile from "../../images/logo_mobile.png";

function Landing() {
  return(
    <div className="wrapper">
      <main>
        <div className="main_left">
          <div className="div_hero">
            <img className="hero" src={logo_base} alt="hero" />
            <img className="logo_resp" src={logo_resp} alt="hero" />
            <img className="logo_mobile" src={logo_mobile} alt="hero" />
          </div>
        </div>

        
        <div className="main_right">
          <h1 className="title">Una aplicacion dedicada a todos los perritos del &#x1F30E;!</h1>
          <Link to="/home" className="access_button">Entrar</Link>
        </div>
      </main>
    </div>
  )
}

export default Landing;