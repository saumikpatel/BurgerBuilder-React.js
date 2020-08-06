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
import * as actionType from '../../Store/actions'


class BurgerBuilder extends Component{
    
    state ={
      
        
       
        purchasing:false,
        loading:false,
        error:false

    }

    componentDidMount(){
        // axios.get('https://react-my-burger-acb29.firebaseio.com/ingredients.json')
        // .then(response =>{
        //     this.setState({ingredients:response.data})

        // }).catch(error=>{
        //     this.setState({error:true})

        // })
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
         return sum>0;
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler =()=>{
    
            
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

        
        if(this.state.loading){
            orderSummary= <Spinner/>
        }
        let burger=this.state.error?<p>Ingredients can not be loaded</p>:<Spinner/>
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
        ings:state.ingredients,
        price:state.totalPrice
    }
}
const mapDsipatchToProps= dispatch=>{
    return{
        onIngredientAdded:(ingName)=> dispatch({type:actionType.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemoved:(ingName)=> dispatch({type:actionType.REMOVE_INGREDIENT, ingredientName:ingName})
    }
}

export default connect(mapStateToProps, mapDsipatchToProps) (withErrorHandler( BurgerBuilder,axios));