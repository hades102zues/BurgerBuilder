import React from 'react';

import Auxi from '../../../hoc/Auxi/Auxi';
import Button from '../../../UI/Button/Button'

const OrderSummary = (props) =>{

	const ingredientSummary = Object.keys(props.ingredients)
	      .map( keys =>{
	      	  return ( <li key={keys}>

	      	         <span style={{textTransform: 'capitalize'}}>{keys}</span>: {props.ingredients[keys]}
	      	         </li>
	      	  );
	      });

	return (
          <Auxi>
             <h3>Your Order</h3>
             <p>Your Burger Ingredients:</p>
             <ul>
                {ingredientSummary}
             </ul>
             <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
             <p>Continue to Checkout?</p>
             <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
             <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
          </Auxi>
    );

};


export default OrderSummary;