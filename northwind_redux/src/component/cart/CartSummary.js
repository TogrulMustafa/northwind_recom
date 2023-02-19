import React, { Component } from "react";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge,
    NavItem,
    NavLink,
} from "reactstrap";
import { connect } from "react-redux";
import alertify from 'alertifyjs'
import { bindActionCreators } from "redux";
import *  as cartActions from '../../redux/action/cartActions'
import { Link } from "react-router-dom";



class CartSummary extends Component {

    removeFromCart = item => {
        this.props.action.removeFromCart(item)
        alertify.error(item.product.productName + ' removed from cart')
    }

    renderSummary() {
        return (
        <div>
            <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                Your Cart
            </DropdownToggle>
            <DropdownMenu end>
                {this.props.cart.map(item => (
                <DropdownItem key={item.product.id}>
                    <Badge color="danger" onClick={_ => this.removeFromCart(item)}>X</Badge> - 
                    {item.product.productName}
                    - <Badge color="success">{item.quantity}</Badge>
                </DropdownItem>
                ))}
                <DropdownItem divider />
                <DropdownItem>
                    <Link to='cart'>Go to cart</Link>
                </DropdownItem>
            </DropdownMenu>
            </UncontrolledDropdown>
        </div>
        );
    }

    renderEmpty() {
        return (
        <NavItem>
            <NavLink>Empty Cart</NavLink>
        </NavItem>
        );
    }

    render() {
        return (
        <div>
            {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
        </div>
        );
    }
}



function mapDispatchToProps(dispatch) {
    return {
        action: {
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }
}

function mapStateToProps(state) {
    return {
        cart: state.addToCart
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
