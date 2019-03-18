import React from "react";
import { Scene, Router } from "react-native-router-flux";
import ListProduct from "./ViewApp/ListProduct";
import CreateOffer from "./ViewApp/CreateOffer";
import ProductView from "./ViewApp/ProductView";
import PlaceView from "./ViewApp/PlaceView";
import FinalViewCreate from "./ViewApp/FinalViewCreate";
import EditView from "./ViewApp/EditView";
import SearchView from "./ViewApp/SearchView";
import Login from "./ViewApp/Login"
import Icon from "react-native-vector-icons/FontAwesome";
import NewUser from "./ViewApp/NewUser";

class TabIcon extends React.Component {
  render() {
    if (this.props.iconName == "search") {
      return (
        <Icon
          name={this.props.iconName}
          color={this.props.focused ? "#109C59" : "#808080"}
          size={22}
        />
      );
    } else {
      return (
        <Icon
          name={this.props.iconName}
          color={this.props.focused ? "#109C59" : "#808080"}
          size={26}
        />
      );
    }
  }
}

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="Login" title="login" component={Login} hideNavBar initial  />
        <Scene key="newUser" title="Crear nueva cuenta" component={NewUser} hideNavBar   />
        <Scene
          key="tabsBottom"
          tabs
          hideNavBar
          tabBarStyle={{ backgroundColor: "#FFFFFF" }}
          showLabel={false}
        >
          <Scene key="waoTab" title="Home" iconName={"home"} icon={TabIcon}>
            <Scene
              key="home"
              component={ListProduct}
              title="WAO!"
              headerTitleStyle={{
                textAlign: "center",
                flex: 1,
                color: "white",
                fontFamily: "Pacifico",
                fontWeight: "200",
                fontSize: 25
              }}
              navigationBarStyle={{ backgroundColor: "#30A66D" }}
            />
          </Scene>
          <Scene key="Search" title="search" iconName={"search"} icon={TabIcon}>
            <Scene key="SearchView" component={SearchView} hideNavBar />
          </Scene> 
        </Scene>

        <Scene
          key="createOffer"
          component={CreateOffer}
          title="Tipo de producto a crear"
          headerTitleStyle={styles.textNav}
          barButtonIconStyle={{ tintColor: 'red' }}
          navigationBarStyle={{ backgroundColor: "#30A66D" }}
        />
        <Scene key="productView" component={ProductView} title="Oferta" 
        headerTitleStyle={styles.textNavCenter}
        navigationBarStyle={{ backgroundColor: "#30A66D" }}
        />
        <Scene
          key="placeChooser"
          component={PlaceView}
          title="Supermercados sugeridos"
          headerTitleStyle={styles.textNav}
          navigationBarStyle={{ backgroundColor: "#30A66D" }}
        />
        <Scene
          key="finalCreateOffer"
          component={FinalViewCreate}
          title="Crear oferta"
          headerTitleStyle={styles.textNavCenter}
          navigationBarStyle={{ backgroundColor: "#30A66D" }}
        />
        <Scene key="editView" component={EditView} title="Editar oferta" 
        headerTitleStyle={styles.textNavCenter}
        navigationBarStyle={{ backgroundColor: "#30A66D" }}
        />
      </Scene>
    </Router>
  );
};

const styles= {
  textNav: {
    textAlign: "center",
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "200",
    fontSize: 23
  },
  textNavCenter: {
    textAlign: "center",
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "200",
    fontSize: 25,
    width: 280
  }
}

export default RouterComponent;
