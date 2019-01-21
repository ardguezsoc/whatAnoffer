import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import ListProduct from './ViewApp/ListProduct';
import ProductForm from './ViewApp/ProductForm';

const RouterComponent = () => {
    
    return (
      <Router> 
      <Scene key="listProduct" component={ListProduct} title="main" initial />
      <Scene key="productForm" component={ProductForm}  title="productos" />
      </Router>
    );
  };
  
  export default RouterComponent;
  