import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

function Footer() {
  return (
    <div className="Footer_component">
      <footer>
      <Link to="/" className="restart"><h6>Regresar al inicio</h6></Link>
        <span className="text_footer">Hecho con &#x1F4AA; y con &#x1F5A4; para el Henry Bootcamp</span>
      </footer>
    </div>
  )
}

export default Footer