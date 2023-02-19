import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../../redux/action/categoryActions'
import { getProducts } from '../../redux/action/productActions'
import { saveProduct } from '../../redux/action/productActions'
import ProductDetail from './ProductDetail'

const AddOrUpdateProduct = ({
    products,
    categories,
    getProducts,
    getCategories,
    saveProduct,
    history,
    productItem
}) => {

    const [product, setProduct] = useState({...productItem}) 
    const [errors, setErrors] = useState({}) 

    useEffect(_ => {
        if (categories.length === 0) {
            getCategories()
        }
        if (products.length === 0) {
            getProducts()
        }
        setProduct({...productItem})

    },[productItem])

    // useEffect olan hisse mene qaranliq qaldi?


    
    function handleChange(event) {
        const {name, value} = event.target
        setProduct(previousProduct => ({
            ...previousProduct,
            [name]: name === 'categoryId' ? parseInt(value, 10) : value
        }))

        validate(name, value)
    }


    function validate(name,value) {
        if (value==='') {
            setErrors(previousError => ({...previousError, [name]: 'Xanani doldurmadiniz!'}))
        } 
        else {
            setErrors(previousError => ({...previousError, [name]: ''}))
        }
    }


    function handleSave(event) {
        event.preventDefault()
        saveProduct(product)
        .then(_ => {
            history.push('/')
        })
        .catch(error => console.log(error.name))
    }



    return (
        <ProductDetail product={product} categories={categories} onChange={handleChange} onSave={handleSave} errors={errors}/>
    )
}

function getProductById(products, productId) {
    let productItem = products.find(product => product.id == productId) || null
    return productItem
}

function mapStateToProps(state, ownProps) {
    const productId = ownProps.match.params.productId

    const productItem = productId && state.getProducts.length > 0
    ? getProductById(state.getProducts, productId)
    : {}

    return {
        productItem,
        products: state.getProducts,
        categories: state.getCategories
    }

    /* 
        mapStateToProps daxilinde yerlesen return'in icindekileri mapStateToProps daxilinde istifade etmeli olsaq,:-den sonrakilari,
        xaricinde istifade etmeli olsaq, :-den oncekileri goturmeliyik.Bu qayda mapDispatchToProps ucun de gecerlidir.
    */
}

const  mapDispatchToProps = {
    getProducts,
    getCategories,
    saveProduct 
}

export default connect(mapStateToProps,mapDispatchToProps)(AddOrUpdateProduct)

