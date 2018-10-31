import React, {Component} from 'react';
import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad : 0.2 ,
    cheese: 0.5 ,
    meat: 1.3,
    bacon:0.7
};
 class BurgerBuilder extends Component{

    constructor(props){
    	super(props);
    	this.state = {
             
             ingredients: null,
             totalPrice: 1.5,
             buyable: false,
             purchasing: false,
             loading: false,
             error: false

    	};

    }//constr

  componentDidMount(){
     axios.get('Ingredients.json')
       .then( response =>{
           // console.log('Server',response.data);
           this.setState({ingredients:response.data});
         })
       .catch(err => {
           this.setState({error:true})
       });
  }

  updatePurchaseState = (ingredients) =>{

    const sum = Object.keys(ingredients)
                .map(key => {
                   return ingredients[key];
                })
                .reduce( (sum,el) =>{
                  return sum+el;
                }, 0);

    this.setState({buyable: sum>0});

  }
  addIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    const updatedCount= oldCount + 1;

    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice =  this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients);

  }

  removeIngredientHandler = (type) =>{

    const oldCount = this.state.ingredients[type];

    if(oldCount<=0){
      return;
    }
    const updatedCount= oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice =  this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
   
  }

  purchaseHandler = () =>{
    this.setState({purchasing:true});
  }
  
  
  purchaseCancelHandler = () =>{
    this.setState({purchasing:false});
  }

  purchaseContinueHandler = () =>{
      

      let queryParams = [];

      //each i will be a propertyname/key
      for(let i in this.state.ingredients){
        queryParams.push( encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]) );

      }
      
      queryParams.push('price=' + this.state.totalPrice);
      const queryString = queryParams.join('&');

      this.props.history.push({
        pathname:'/checkout',
        search:`?${queryString}`
      });
  }

  render(){

    const disabledInfo ={
      ...this.state.ingredients
    };

    for( let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <=0;
    }
  	
   let orderSummary= null;
   let burger = this.state.error ? <p>error fetching ingredients</p> : <Spinner /> 

   if(this.state.ingredients){
             burger = (
                  <Auxi>
                     <Burger ingredients={this.state.ingredients} />
                     <BuildControls 
                         ingredientAdded={this.addIngredientHandler}
                         ingredientRemoved={this.removeIngredientHandler}
                         disabled={disabledInfo}
                         buyable={this.state.buyable}
                         price={this.state.totalPrice}
                         ordered={this.purchaseHandler}
                     />
                  </Auxi>
              );

             orderSummary = <OrderSummary 
               ingredients={this.state.ingredients}
               purchaseCanceled={this.purchaseCancelHandler}
               purchaseContinued={this.purchaseContinueHandler}
               price={this.state.totalPrice}
            />;
    }


    if(this.state.loading){
      orderSummary= <Spinner />;
    }


  	return (
  		 <Auxi>
           <Modal 
             show={this.state.purchasing}
             modalClosed={this.purchaseCancelHandler}
           >
            {orderSummary}
           </Modal>
             {burger}
        	 

       </Auxi>
  	);
  }

}


export default withErrorHandler(BurgerBuilder, axios);