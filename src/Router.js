import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import ListProduct from './ViewApp/ListProduct';
import CreateOffer from './ViewApp/CreateOffer';
import ProductView from './ViewApp/ProductView';

const RouterComponent = () => {
    
    return (
      <Router>
      <Scene key="root"> 
      <Scene key="home" component = { ListProduct } title="Header" initial />
      <Scene key="createOffer" component = { CreateOffer }  title="Crear Oferta" />
      <Scene key="productView" component = { ProductView } />
      </Scene>
      </Router>
    );
  };
  
  export default RouterComponent;
  