import React, {Component} from 'react';
import Modal from '../../UI/Modal/Modal';
import Auxi from '../Auxi/Auxi';

const withErrorHandler = (WrappedCompnent, axios) =>{
    return class extends Component{

        constructor(props){
        	super(props);
        	this.state={error:null}
        }

        componentWillMount(){

        	//The following functions DEMAND tht u supply a 
        	// req/res function
        	
        	this.intReq = axios.interceptors.request
        	 .use(req =>{
                    this.setState({error:null});
                    return req;
        	     }
        	 );
   
             //In this case we dont care about the response
             //But we supply a simple req function because we r expected to
        	this.intRes = axios.interceptors.response
        	 .use(res => res, error =>{
        	 			this.setState({error:error});
        	          }
        	 );
        }

       //this is to prevent the interceptors of an umounted component from
       //living on and possibly running in the background
        componentWillUnmount (){
        	axios.interceptors.request.eject(this.intReq);
        	axios.interceptors.response.eject(this.intRes);
        }

    errorConfirmed = () =>{this.setState({error:null})}

    	render(){
    		return (
			  	<Auxi>
				  	<Modal 
				  	  show={this.state.error}
				  	  modalClosed={this.errorConfirmed}
				  	> 
				  	   {this.state.error ? this.state.error.message : null}
				  	 </Modal>
				  	<WrappedCompnent {...this.props} />
			  	</Auxi>
		    );
    	}
    }
};


export default withErrorHandler;