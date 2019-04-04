import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import _ from "lodash";
import { connect } from "react-redux";
import ProductForm from "./ProductForm";
import { ButtonOwn, CardContainer, Spinner, MyModal } from "../component";
import { productUpdate, productEdit } from "../actions";
import ImagePicker from "react-native-image-picker";
import { uploadFile } from "../actions";

class EditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productImage: this.props.product.urlOfImag,
      fileToImage: "",
      secureUrl: "",
      buttonStatus: true,
      modalStatus: false
    };
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    _.each(this.props.product, (value, prop) => {
      this.props.productUpdate({ prop, value });
    });
  }

  submit() {
    var options = {
      title: "Seleccione la nueva foto",
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({
          fileToImage: response,
          productImage: { uri: response.uri }
        });
      }
    });
  }

  onAccept() {
    this.setState({ modalStatus: false, buttonStatus: false });
    this.onButtonPress();
  }
  onDecline() {
    this.setState({ modalStatus: false });
  }

  onButtonPress() {
    this.setState({ buttonStatus: false });
    const { uid, description, date, priceOld, priceNew } = this.props;

    const {
      productValue,
      placeValue,
      productKindValue,
    } = this.props.product;

    if (this.state.productImage != this.props.product.urlOfImag) {
      uploadFile(this.state.fileToImage)
        .then(response => response.json())
        .then(result => {
          const urlOfImag = result.secure_url;

          this.props.productEdit({
            uid,
            placeValue,
            productValue,
            productKindValue,
            description,
            date,
            priceOld,
            priceNew,
            urlOfImag
          });
        });
    } else {
      const urlOfImag = this.props.product.urlOfImag;
      this.props.productEdit({
        uid,
        placeValue,
        productValue,
        productKindValue,
        description,
        date,
        priceOld,
        priceNew,
        urlOfImag
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ProductForm {...this.props.product} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={this.submit}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 15,
              marginTop: 15
            }}
          >
            {this.state.productImage != this.props.product.urlOfImag ? (
              <Image
                source={this.state.productImage}
                style={{ height: 80, width: 80, borderRadius: 40 }}
              />
            ) : (
              <Image
                source={{ uri: this.state.productImage }}
                style={{ height: 80, width: 80, borderRadius: 40 }}
              />
            )}
          </TouchableOpacity>
        </View>
        {this.state.buttonStatus ? (
          <CardContainer>
            <ButtonOwn
              onPress={() =>
                this.setState({ modalStatus: !this.state.modalStatus })
              }
            >
              Listo
            </ButtonOwn>
          </CardContainer>
        ) : (
          <Spinner styleSpin={{ marginTop: 15 }} />
        )}

        <MyModal
          modalStatus={this.state.modalStatus}
          Decline={() => this.onDecline()}
          title="¿Seguro?"
          subTitle="¿Quieres guardar los cambios realizados?"
          Accept={() => this.onAccept()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    uid,
    date,
    description,
    priceNew,
    priceOld,
    urlOfImag
  } = state.productForm;

  return {
    uid,
    date,
    description,
    priceNew,
    priceOld,
    urlOfImag
  };
};

export default connect(
  mapStateToProps,
  { productUpdate, productEdit }
)(EditView);
