import React, { Component } from 'react';
import Button from '../../../UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../UI/Spinner/Spinner';
class ContactData extends Component{
	constructor(props){
		super(props);
		this.state={
			name:'',
			email:'',
			address: {
				street:'',
				postalCode:''
			},
      loading: false
		}
	}

     orderHandler = (event) =>{
       event.preventDefault();
       
      this.setState({loading:true});
      const orders={
           ingredients:this.props.ingredients,
           price:this.props.price,
           customer: {
              name:'Joshu',
              address:{
                street : 'Empty Street',
                zipcode: '5424',
              },
              email:'eg@hotmail.com',
              deliveryMethod: 'fastest'
           }
      };

      axios.post('/orders.json', orders)
        .then(response => { 
               this.setState({loading: false});
               this.props.history.push('/'); 
         })
        .catch(error => {
               this.setState({loading: false});
               console.log('ContactData','Error post');
        })
      ;
       console.log(this.props.ingredients);
     }

	render(){
    let form=(<form> 
            <input type="text" name="name" placeholder="...name" className={styles.Input} />
            <input type="email" name="email" placeholder="...email" className={styles.Input}/>
            <input type="text" name="street" placeholder="..street" className={styles.Input}/>
            <input type="text" name="postal" placeholder="...postal code" className={styles.Input}/>
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
          </form>);

    if(this.state.loading){
       form=<Spinner />
    }

		return(
 		 <div className={styles.ContactData}>

 		   <h4>Enter Contact Data</h4>
   		 {form}
 		 </div>

		);
	}
}

export default ContactData;