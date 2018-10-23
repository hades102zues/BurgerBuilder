import React from 'react';
import styles from './SideDrawerToggle.module.css';

const SideDrawerToggle = (props) =>(
     <div className={styles.DrawerToggle} onClick={props.clicked}>
       <div></div>
       <div></div>
       <div></div>
     </div>
);

export default SideDrawerToggle;