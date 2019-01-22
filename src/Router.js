import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import ListProduct from './ViewApp/ListProduct';
import ProductForm from './ViewApp/ProductForm';

const RouterComponent = () => {
    
    return (
      <Router>
      <Scene key="root"> 
      <Scene key="listProduct" component={ListProduct} title="Header" initial />
      <Scene key="productForm" component={ProductForm}  title="Crear Oferta" />
      </Scene>
      </Router>
    );
  };
  
  export default RouterComponent;
  