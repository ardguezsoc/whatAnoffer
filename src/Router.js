import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import ListProduct from './ViewApp/ListProduct';
import CreateOffer from './ViewApp/CreateOffer';
import ProductView from './ViewApp/ProductView';
import PlaceView from './ViewApp/PlaceView';
import FinalViewCreate from './ViewApp/FinalViewCreate';

const RouterComponent = () => {
    
    return (
      <Router>
      <Scene key="root"> 
      <Scene key="home" component = { ListProduct } title="Header" initial />
      <Scene key="createOffer" component = { CreateOffer }  title="Tipo de producto a crear" />
      <Scene key="productView" component = { ProductView } />
      <Scene key="placeChooser" component = { PlaceView } title="Lugar donde está la oferta" />
      <Scene key="finalCreateOffer" component = { FinalViewCreate } title="Finalizar oferta" />
      </Scene>
      </Router>
    );
  };
  
  export default RouterComponent;
  