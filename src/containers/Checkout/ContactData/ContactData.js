

import React ,{Component} from 'react'
import Button from '../../../components/UI/Button/Button'

import Classes from './ContactData.css'
class ContactData extends Component{

    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:'',

        }

    }
    render(){
        return(
            <div className={Classes.ContactData} >
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={Classes.Input} type="text" name="name" placeholder="Your Name"   />
                    <input className={Classes.Input} type="email" name="email" placeholder="Your Email"   />
                    <input className={Classes.Input} type="text" name="street" placeholder="Sreet"   />
                    <input className={Classes.Input} type="text" name="postal" placeholder="Postal Code"   />
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        )
    }

}

export default ContactData