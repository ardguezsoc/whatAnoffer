import React, {Component} from 'react';
import { Provider } from "react-redux";
import { Actions, Router, Scene } from 'react-native-router-flux';
import ListProduct from './src/ViewApp/ListProduct'
import ProductForm from './src/ViewApp/ProductForm';


const App = () => {
  
    return(
      <Router>
      <Scene key="root"> 
      <Scene key="listProduct" component={ListProduct} title="Header" initial />
      <Scene key="productForm" component={ProductForm}  title="Crear Oferta" />
      </Scene>
      </Router>

    );
  };



const styles = {
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
};

export default App;