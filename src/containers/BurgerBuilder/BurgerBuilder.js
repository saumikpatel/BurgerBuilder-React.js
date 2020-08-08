import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import {connect} from 'react-redux'
import * as burgerBuilderActions from '../../Store/actions/index'


class BurgerBuilder extends Component{
    
    state ={
      
        
       
        purchasing:false,
       

    }

    componentDidMount(){
       this.props.onInitIngredients()
    }

    purchaseHandler = () =>{
        if(this.props.isAuthenticated){
        this.setState({purchasing:true})
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    updatePurchaseState (ingredients){
        
        const sum = Object.keys(ingredients).map(igkey =>{
            return ingredients[igkey]
        }).reduce((sum, el)=>{
            return sum+el;
        }, 0);
         return sum>0;
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler =()=>{
    
            this.props.onInitPurchase()
            this.props.history.push({
                pathname:'/checkout'
            })
        }

    // addIngredientHandler =(type)=>{
    //     const oldCount= this.state.ingredients[type]
    //     const updatedCounted =oldCount+1;
    //     const updatedIngredient ={
    //         ...this.state.ingredients
    //     };
    //     updatedIngredient[type]=updatedCounted;
    //     const priceAddition =INGREDIENT_PRICES[type];
    //     const oldPrice =this.state.totalPrice;
    //     const newPrice = oldPrice+priceAddition;
    //     this.setState({totalPrice:newPrice, ingredients:updatedIngredient})
    //     this.updatePurchaseState(updatedIngredient);


    // }

    // removeIngredientHandler=(type)=>{
    //     const oldCount= this.state.ingredients[type]
    //     if(oldCount<=0){
    //         return;
    //     }
    //     const updatedCounted =oldCount-1;
    //     const updatedIngredient ={
    //         ...this.state.ingredients
    //     };
    //     updatedIngredient[type]=updatedCounted;
    //     const priceDeletion =INGREDIENT_PRICES[type];
    //     const oldPrice =this.state.totalPrice;
    //     const newPrice = oldPrice-priceDeletion;
    //     this.setState({totalPrice:newPrice, ingredients:updatedIngredient})
    //     this.updatePurchaseState(updatedIngredient);

    // }

    render(){
        const disabledInfo={
            ...this.props.ings

        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let orderSummary= null;

        
        
        let burger=this.props.error?<p>Ingredients can not be loaded</p>:<Spinner/>
        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger  ingredients={this.props.ings} />
                    <BuildControls
                     ingredients={this.props.ings}
                     ingredientAdded={this.props.onIngredientAdded}
                     ingredientRemoved={this.props.onIngredientRemoved}
                     disabled={disabledInfo}
                     price={this.props.price}
                     ordered={this.purchaseHandler}
                     isAuth={this.props.isAuthenticated}
                     purchasable={this.updatePurchaseState(this.props.ings)}/>
    
                </Aux>
            )
        orderSummary= <OrderSummary 
        ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} 
        price={this.props.price}/>

        }
        if(this.state.loading){
            orderSummary= <Spinner/>
        }

         

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>  
                {burger}          
                
            </Aux>
            
        );
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error.error,
        isAuthenticated: state.auth.token!=null
    }
}
const mapDsipatchToProps= dispatch=>{
    return{
        onIngredientAdded:(ingName)=> dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDsipatchToProps) (withErrorHandler( BurgerBuilder,axios));