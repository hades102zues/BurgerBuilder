import React, {Component} from 'react';


import Auxi from '../Auxi/Auxi';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

	constructor(props){
		super(props);
		this.state={
			showSideDrawer: false
		}

	}

    
    sideDrawerClosedHandler = () =>{
       this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () =>{
    	this.setState( (prevState) =>{
               return ( {showSideDrawer: !prevState.showSideDrawer} );
    	     }	
    	);//setState
    }//func

	render(){
	  return (
	   
		   <Auxi>
				   <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
				   <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
				   <main className={styles.Content}>
				        {this.props.children} 
				   </main>
		   </Auxi>
	   );//return

	}//render

}//class

export default Layout;