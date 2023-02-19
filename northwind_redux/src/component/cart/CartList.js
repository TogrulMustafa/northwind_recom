import React, { Component } from 'react'
import {Table, Button} from 'reactstrap'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cartActions from '../../redux/action/cartActions'
import alertify from 'alertifyjs'

class CartList extends Component {

    removeFromCart = item => {
        this.props.action.removeFromCart(item)
        alertify.error(item.product.productName + ' removed from cart')
    }


    render() {
        return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Quantity Per Unit</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cart.map(item => (
                        <tr key={item.product.id}>
                            <td>{item.product.id}</td>
                            <td>{item.product.productName}</td>
                            <td>{item.product.quantityPerUnit}</td>
                            <td>{item.product.unitPrice}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <Button color='danger' onClick={_ => this.removeFromCart(item)}>Remove</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        cart: state.addToCart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: {
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(CartList)