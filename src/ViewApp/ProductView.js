import React, { Component } from "react";
import { View, Text } from "react-native";
import { CardProductView, CardText } from "../component";
import { productUpdate, productDelete } from "../actions";
import _ from "lodash";
import { connect } from "react-redux";
import { Button, ModalConfirm } from "../component";

class ProductView extends Component {
  state = { modalStatus: false}

  onAccept(){
    const { uid } = this.props.product;
    this.props.productDelete({ uid });

}

onDecline(){
    this.setState({modalStatus: false})
}
  render(props) {
    return (
      <View>
        <View style={{ height: "30%", width: "100%" }}>
          <CardProductView />
        </View>
        <View style={{ backgroundColor: "white", height: "70%" }}>
          <View style={{ flexDirection: "row", marginTop: 3, marginBottom: 3 }}>
            <Button style={{ borderColor: "#086BC5"  }} ><Text style={{ color: "#086BC5"}}>Editar</Text> </Button>
            <Button 
            onPress={() => this.setState({modalStatus: !this.state.modalStatus})}
            style={{ borderColor: "#E31616"  }} >
             
            <Text style={{ color: "#E31616"}} > Eliminar </Text> 
           
            </Button>
          </View>
          <View style={{marginTop: '4%'}}>
          <CardText style={{justifyContent:'center', alignSelf:'center'}} value={this.props.product.title}/>
          <CardText text="Precio:" value={this.props.product.price} />
          <CardText
            text="Consumir pref antes del:"
            value={this.props.product.date}
          />
          <CardText text="Tipo:" value={this.props.product.kind} />
          <CardText value={this.props.product.description} />

          </View>
        </View>
        <ModalConfirm
        visible={this.state.modalStatus}
        onAccept={this.onAccept.bind(this)}
        onCancel={this.onDecline.bind(this)}
        >
        <Text style={{textAlign:'center', flex: 1}}>¿Estás seguro de que quieres eliminar esta oferta?</Text>
        </ModalConfirm>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { title, price } = state.product;

  return { title, price };
};

export default connect(mapStateToProps,{ productUpdate, productDelete })(ProductView);
