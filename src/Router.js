import React from "react";
import { AsyncStorage } from "react-native";
import { Scene, Router, Actions } from "react-native-router-flux";
import ListProduct from "./ViewApp/ListProduct";
import CreateOffer from "./ViewApp/CreateOffer";
import ProductView from "./ViewApp/ProductView";
import PlaceView from "./ViewApp/PlaceView";
import FinalViewCreate from "./ViewApp/FinalViewCreate";
import SearchView from "./ViewApp/SearchView";
import Login from "./ViewApp/Login";
import EditView from "./ViewApp/EditView";
import Icon from "react-native-vector-icons/FontAwesome";
import NewUser from "./ViewApp/NewUser";
import NoRegisterView from "./ViewApp/NoRegisterView";
import KindOfLogin from "./ViewApp/KindOfLogin";
import Profile from "./ViewApp/Profile";
import EditProfile from "./ViewApp/EditProfile";
import ProfileUser from "./ViewApp/ProfileUser";
import SearchPeople from "./ViewApp/SearchPeople";
import MapView from "./ViewApp/MyMap";

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
        <Scene
          key="kindOfLogin"
          title="homie"
          component={KindOfLogin}
          hideNavBar
          initial
        />
        <Scene key="Login" title="login" component={Login} hideNavBar />
        <Scene
          key="newUser"
          title="Crear nueva cuenta"
          component={NewUser}
          hideNavBar
        />
        <Scene
          key="noUserLogin"
          title="WAO!"
          component={NoRegisterView}
          left={() => null}
          headerTitleStyle={{
            textAlign: "center",
            flex: 1,
            color: "white",
            fontFamily: "Pacifico",
            fontWeight: "200",
            fontSize: 25
          }}
          navigationBarStyle={styles.colorBack}
        />
        <Scene
          key="editView"
          component={EditView}
          title="Editar oferta"
          headerTitleStyle={styles.textNavCenter}
          navigationBarStyle={styles.colorBack}
        />
        <Scene
          key="EditProfile"
          title="Editar Perfil"
          back={true}
          component={EditProfile}
          headerTitleStyle={styles.textNavCenter}
          navigationBarStyle={styles.colorBack}
        />

        <Scene
          key="tabsBottom"
          tabs
          hideNavBar
          tabBarStyle={{ backgroundColor: "#FFFFFF" }}
          showLabel={false}
        >
          <Scene key="waoTab" title="Home" iconName={"home"} icon={TabIcon}  initial>
            <Scene
              key="home"
              component={ListProduct}
              title="WAO!"
              headerTitleStyle={styles.textTitle}
              navigationBarStyle={styles.colorBack}
              onRight={() => Actions.ProfileView()}
              rightTitle={<Icon name={"cog"} color="white" size={24} />}
            />
          </Scene>

          <Scene key="MapBox" title="" iconName={"map"} icon={TabIcon}>
            <Scene key="MapView" component={MapView} hideNavBar />
          </Scene>

          <Scene key="SearchPepl" title="" iconName={"users"} icon={TabIcon}>
            <Scene key="SearchPeople" component={SearchPeople} hideNavBar />
          </Scene>

          <Scene key="Search" title="search" iconName={"search"} icon={TabIcon}>
            <Scene key="SearchView" component={SearchView} hideNavBar />
          </Scene>
        </Scene>

        <Scene
          key="createOffer"
          component={CreateOffer}
          title="Tipo de producto"
          headerTitleStyle={styles.textNav}
          barButtonIconStyle={{ tintColor: "red" }}
          navigationBarStyle={styles.colorBack}
        />

        <Scene
          key="ProfileUser"
          component={ProfileUser}
          title="Perfil"
          headerTitleStyle={styles.textNavCenter}
          navigationBarStyle={styles.colorBack}
        />

        <Scene
          key="ProfileView"
          component={Profile}
          title="Perfil"
          headerTitleStyle={styles.textNavCenter}
          navigationBarStyle={styles.colorBack}
          onRight={() =>
            AsyncStorage.removeItem("user").then(Actions.kindOfLogin({type: "reset"}))
          }
          rightTitle={<Icon name={"sign-out"} color="white" size={24} />}
        />

        <Scene
          key="productView"
          component={ProductView}
          title="Oferta"
          headerTitleStyle={styles.textNavCenter}
          navigationBarStyle={styles.colorBack}
        />

        <Scene
          key="placeChooser"
          component={PlaceView}
          title="Lugar de la oferta"
          headerTitleStyle={[styles.textNav, { fontSize: 22 }]}
          navigationBarStyle={styles.colorBack}
        />

        <Scene
          key="finalCreateOffer"
          component={FinalViewCreate}
          title="Crear oferta"
          headerTitleStyle={styles.textNavCenter}
          navigationBarStyle={styles.colorBack}
        />

        <Scene
          key="EdProfile"
          component={EditProfile}
          title="Editar perfil"
          headerTitleStyle={styles.textNavCenter}
          navigationBarStyle={styles.colorBack}
        />
      </Scene>
    </Router>
  );
};

const styles = {
  textNav: {
    textAlign: "center",
    color: "white",
    fontFamily: "Semib",
    fontWeight: "200",
    fontSize: 23
  },
  textNavCenter: {
    textAlign: "center",
    color: "white",
    fontFamily: "Semib",
    fontWeight: "200",
    fontSize: 25,
    width: 280
  },
  textTitle: {
    textAlign: "center",
    flex: 1,
    color: "white",
    fontFamily: "Pacifico",
    fontWeight: "200",
    fontSize: 25
  },
  colorBack: {
    backgroundColor: "#30A66D"
  }
};

export default RouterComponent;
