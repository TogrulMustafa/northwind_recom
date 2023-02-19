import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as categoryAction from '../../redux/action/categoryActions'
import * as productAction from '../../redux/action/productActions'
import { ListGroup, ListGroupItem, Badge } from 'reactstrap'

class CategoryList extends Component {

  componentDidMount = _ => {
    this.props.actions.getCategories()
  }

  selectCategory = category => {
    this.props.actions.changeCategory(category.categoryName)
    this.props.actions.getProducts(category.id)
  }

  render() {
    return (
      <div>
        <h3><Badge color='warning'>Categories</Badge></h3>
        <ListGroup>
            {this.props.categories.map(category => (
              <ListGroupItem active={category.categoryName===this.props.currentCategory} key={category.id} onClick={_ => this.selectCategory(category)}>{category.categoryName}</ListGroupItem>
            ))}
        </ListGroup>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.getCategories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(categoryAction.getCategories, dispatch),
      getProducts: bindActionCreators(productAction.getProducts, dispatch),
      changeCategory: bindActionCreators(categoryAction.changeCategory, dispatch)
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)
