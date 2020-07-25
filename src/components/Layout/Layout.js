import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
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
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showsideDrawer}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Aux>
        )
    }
        

}
   



export default Layout;