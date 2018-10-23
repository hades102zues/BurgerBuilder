import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const Burger = (props) =>{

    let transformedIngredients = Object.keys(props.ingredients)
    .map( idkey => {
    	return [...Array(props.ingredients[idkey])]
    	       .map( (_,i) =>{
                     return <BurgerIngredient key={idkey + i} type={idkey} />;
    	       });
    } )
    .reduce((arr, el) => {
    	return arr.concat(el);
    }, []);


    if(transformedIngredients.length === 0){
      transformedIngredients = <p>Add some ingredients!</p>;
    }

	return (
	     <div className ={styles.Burger}>

	        <BurgerIngredient type="bread-top" />
            {transformedIngredients}
	        <BurgerIngredient type="bread-bottom" />

	     </div>
	);

};





export default withRouter(Burger);