import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
const INGREDIENT_PRICES={

    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.6
}

class BurgerBuilder extends Component{
    
    state ={
        ingredients:null,
        totalPrice: 2,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false

    }

    componentDidMount(){
        axios.get('https://react-my-burger-acb29.firebaseio.com/ingredients.json')
        .then(response =>{
            this.setState({ingredients:response.data})

        }).catch(error=>{
            this.setState({error:true})

        })
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
        this.setState({loading:true})
        const order ={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'saumik patel',
                address:{
                    street:'rue mackay',
                    zipCode:'h3g2h9',
                    country:'India'
                },
                email:'saumikpatel32@gmail.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders.json',order)
        .then(response =>{
            this.setState({loading:true, purchasing:false})
        }).catch(error=>{
            this.setState({loading:true, purchasing:false})
        })
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
        let orderSummary= null;

        
        if(this.state.loading){
            orderSummary= <Spinner/>
        }
        let burger=this.state.error?<p>Ingredients can not be loaded</p>:<Spinner/>
        if(this.state.ingredients){
            burger=(
                <Aux>
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
            )
        orderSummary= <OrderSummary 
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} 
        price={this.state.totalPrice}/>

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

export default withErrorHandler( BurgerBuilder,axios);