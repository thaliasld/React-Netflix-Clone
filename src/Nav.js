import React, { useEffect, useState } from 'react'
import "./Nav.css";

function Nav() {
    
    const [show, handleShow] = useState(false);
    
    // useEffect(() => {
    //     window.addEventListener("scroll", () => {
    //         if (window.scrollY > 100) {
    //           handleShow(true);
    //         } else handleShow(false);
    //       });
    //     return () => {
    //         window.removeEventListener("scroll");
    //     };
    // }, [])

    useEffect(() => {
        window.addEventListener("scroll", () => {
          if (window.scrollY > 100) {
            handleShow(true);
          } else handleShow(false);
        });
      }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
        <img className='nav__logo'
            src="https://assets.brand.microsites.netflix.io/assets/df87ee0c-c4ea-11e7-8d40-066b49664af6_cm_800w.png?v=16"
            alt="Netflix Logo"
        />
        <img
        className="nav__avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Netflix-avatar.png/640px-Netflix-avatar.png"
        alt="Netflix Avatar"
      />

    </div>
  )
}

export default Nav