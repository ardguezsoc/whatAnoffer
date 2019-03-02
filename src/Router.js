import React from "react";
import { Text } from "react-native";
import { Scene, Router } from "react-native-router-flux";
import ListProduct from "./ViewApp/ListProduct";
import CreateOffer from "./ViewApp/CreateOffer";
import ProductView from "./ViewApp/ProductView";
import PlaceView from "./ViewApp/PlaceView";
import FinalViewCreate from "./ViewApp/FinalViewCreate";
import EditView from './ViewApp/EditView';
import SearchView from './ViewApp/SearchView';


const TabIcon = ({ selected, title }) => {
  return (<Text style={{ color: selected ? "red" : "black" }}> {title} </Text>);
};

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="tabsBottom" tabs hideNavBar tabBarStyle={{ backgroundColor: "#FFFFFF" }}>
          <Scene key="osu" title="Co"  icon={TabIcon}>
            <Scene key="home" component={ListProduct} title="WAO!" />
          </Scene>
          <Scene key="Search" title="Buscar"  icon={TabIcon}>
            <Scene key="SearchView" component={SearchView} hideNavBar />
          </Scene>
          
        </Scene>
        
        <Scene
              key="createOffer"
              component={CreateOffer}
              title="Tipo de producto a crear"
            />
            <Scene key="productView" component={ProductView} title="Oferta" />
            <Scene
              key="placeChooser"
              component={PlaceView}
              title="Supermercados sugeridos"
            />
            <Scene
              key="finalCreateOffer"
              component={FinalViewCreate}
              title="Crear oferta"
            />
            <Scene 
            key="editView"
            component = { EditView }
            title="Editar oferta"
            />
      </Scene>

    </Router>
  );
};

export default RouterComponent;
