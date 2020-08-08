import React, {Component} from 'react'
import Aux from '../Auxiliary/Auxiliary'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
class Layout extends Component{
    state={
        showsideDrawer:false
    }
    sideDrawerClosedHandler=()=>{
        this.setState({showsideDrawer:false})

    }

    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return{
            showsideDrawer: !prevState.showsideDrawer
        }})
    }
    render(){
        return(
        <Aux>
        <Toolbar 
        isAuth={this.props.isAuthenticated}
        drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer 
         isAuth={this.props.isAuthenticated}
        closed={this.sideDrawerClosedHandler} open={this.state.showsideDrawer}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Aux>
        )
    }
        

}
   
const mapStataeToProps = state =>{
    return{
        isAuthenticated:state.auth.token!==null
    }
}


export default connect (mapStataeToProps)(Layout);