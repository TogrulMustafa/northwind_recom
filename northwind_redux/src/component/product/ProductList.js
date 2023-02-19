import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Badge, Table, Button} from 'reactstrap'
import { bindActionCreators } from 'redux'
import * as productActions from '../../redux/action/productActions'
import * as cartActions from '../../redux/action/cartActions'
import alertify from 'alertifyjs'
import { Link } from 'react-router-dom'

class ProductList extends Component {

  componentDidMount = _ => {
    this.props.action.getProducts()
  }

  addToCart = product => {
    this.props.action.addToCart({quantity: 1, product})
    alertify.success(product.productName + ' added to cart')
  }

  render() {
    return (
      <div>
        <h3><Badge color='warning'>Products</Badge> - <Badge color='success'>{this.props.currentCategory}</Badge></h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Category ID</th>
              <th>Product Name</th>
              <th>Quantity Per Unit</th>
              <th>Unit Price</th>
              <th>Units In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(product => (
              <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.categoryId}</td>
                  <td><Link to={'/saveproduct/' + product.id}>{product.productName}</Link></td>
                  <td>{product.quantityPerUnit}</td>
                  <td>{product.unitPrice}</td>
                  <td>{product.unitsInStock}</td>
                  <td><Button color='success' onClick={_ => this.addToCart(product)}>Add</Button></td>
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
    currentCategory: state.changeCategoryReducer,
    products: state.getProducts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch)
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ProductList)
