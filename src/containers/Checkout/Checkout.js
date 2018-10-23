import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
class Checkout extends Component{
     

     constructor(props){
     	super(props);
     	this.state={
     		ingredients: null,
               price:0
     	};
     }

     componentWillMount(){
          const query = new URLSearchParams(this.props.location.search);
          const ingredients = {};
          let price=0;

          for (let param of query.entries() ){
               if (param[0] === 'price'){
                    price=param[1]; 
                    continue;           
               }
               //['salad', '1']
               ingredients[param[0]]= parseInt(param[1]); //'salad' : 1
          }
          
          this.setState({ingredients:ingredients, totalPrice:price});

     }

     onCheckoutCancelledHandler = () =>{
         this.props.history.goBack();
     }

      onCheckoutContinuedHandler = () =>{
          this.props.history.replace('/checkout/contact-data');
     }

     render(){
     	return(
     		<div>
                   
     			<CheckoutSummary 
                        ingredients={this.state.ingredients}
                        onCheckoutCancelled = {this.onCheckoutCancelledHandler}
                        onCheckoutContinued= {this.onCheckoutContinuedHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                         render={(props)=>(<ContactData ingredients={this.state.ingredients}  
                                           price={this.state.totalPrice }
                                           {...this.props}/>
                                          )
                                } 
                    />
     		</div>
     	);
     }
}


export default Checkout;