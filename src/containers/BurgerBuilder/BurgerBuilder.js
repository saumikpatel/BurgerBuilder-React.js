import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.6
}

class BurgerBuilder extends Component{
    
    state ={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0

        },
        totalPrice: 2,
        purchasable:false,
        purchasing:false,

    }

    purchaseHandler = () =>{
        this.setState({purchasing:true})
    }

    updatePurchaseState (ingredients){
        
        const sum = Object.keys(ingredients).map(igkey =>{
            return ingredients[igkey]
        }).reduce((sum, el)=>{
            return sum+el;
        }, 0);
        this.setState({purchasable:sum>0})
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler =()=>{
        alert('You Continue')
    }

    addIngredientHandler =(type)=>{
        const oldCount= this.state.ingredients[type]
        const updatedCounted =oldCount+1;
        const updatedIngredient ={
            ...this.state.ingredients
        };
        updatedIngredient[type]=updatedCounted;
        const priceAddition =INGREDIENT_PRICES[type];
        const oldPrice =this.state.totalPrice;
        const newPrice = oldPrice+priceAddition;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredient})
        this.updatePurchaseState(updatedIngredient);


    }

    removeIngredientHandler=(type)=>{
        const oldCount= this.state.ingredients[type]
        if(oldCount<=0){
            return;
        }
        const updatedCounted =oldCount-1;
        const updatedIngredient ={
            ...this.state.ingredients
        };
        updatedIngredient[type]=updatedCounted;
        const priceDeletion =INGREDIENT_PRICES[type];
        const oldPrice =this.state.totalPrice;
        const newPrice = oldPrice-priceDeletion;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredient})
        this.updatePurchaseState(updatedIngredient);

    }

    render(){
        const disabledInfo={
            ...this.state.ingredients

        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} 
                        price={this.state.totalPrice}/>
                </Modal>            
                <Burger  ingredients={this.state.ingredients} />
                <BuildControls
                 ingredients={this.state.ingredients}
                 ingredientAdded={this.addIngredientHandler}
                 ingredientRemoved={this.removeIngredientHandler}
                 disabled={disabledInfo}
                 price={this.state.totalPrice}
                 ordered={this.purchaseHandler}
                 purchasable={this.state.purchasable}/>
            </Aux>
            
        );
    }
}

export default BurgerBuilder;