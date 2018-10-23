import React from 'react';
import logo from '../../assests/images/burger-logo.png';
import styles from './Logo.module.css';


const Logo = () =>(
  <div className={styles.Logo}>
    <img src={logo} alt='The Burger'/>
  </div>
  
);

export default Logo;