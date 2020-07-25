import React from 'react'
import Aux from '../../../hoc/Auxiliary'

const orderSummary =(props)=>{
    const ingredientsSummary = Object.keys(props.ingredients)
    .map(igkey=>{
    return <li key={igkey}>
        <span style={{textTransform:'capitalize'}}>{igkey}</span>: 
         {props.ingredients[igkey]}
         </li>
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to  checkout?</p>
        </Aux>
    )


}


export default orderSummary;