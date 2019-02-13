import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Button, CardContainer } from "../component";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import ProductForm from "./ProductForm";
import { productUpdate, productCreate, today, nowHour } from "../actions";
import { connect } from "react-redux";

const cloudyName = "dfir4b1pq"
const cloudyPreset = "rihdprth"

class FinalViewCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productImage: null,
      uploadingImage: false,
      fileToImage: "",
      secureUrl: ""
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    var options = {
      title: "Selecciona una foto para tu oferta",
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
          uploadingImg: true
        });
        this.setState({
          fileToImage: response,
          productImage: { uri: response.uri },
          uploadingImg: false
        });
      }
     console.log(response);
    });
  }
  onButtonPress() {
    const {
      productValue,
      placeValue,
      productKindValue,
      description,
      date,
      priceOld,
      priceNew
    } = this.props;
    const currentTime = today() + " " + nowHour();
    if(this.state.productImage != null ){
    uploadFile(this.state.fileToImage)
    .then(response => response.json())
    .then(result => {
            
             const urlOfImag = result.secure_url
             
            this.props.productCreate({
              placeValue,
              productValue,
              productKindValue,
              description,
              date,
              priceOld,
              priceNew,
              currentTime,
              urlOfImag
            });
        
      })

    }else{
      const urlOfImag = "noPhoto"
     this.props.productCreate({
       placeValue,
       productValue,
       productKindValue,
       description,
       date,
       priceOld,
       priceNew,
       currentTime,
       urlOfImag
     });
    }
 
  }

  render() {
    return (
      <View>
        <ProductForm {...this.props} />
        <View style={{flexDirection: "row", alignItems:'center', justifyContent:'center'}} >
        <TouchableOpacity
          onPress={this.submit}
          style={{

            height: 80,
            width: 80,
            borderRadius: 40,
            marginBottom: 20
          }}
        >
          {this.state.productImage ? (
            <Image
              source={this.state.productImage}
              style={{ height: 80, width: 80, borderRadius: 40 }}
            />
          ) :  <Image
          source={require('./camera-flat.png')}
          style={{ height: 80, width: 80, borderRadius: 40 }}
        /> }
        </TouchableOpacity>
        </View>
        <CardContainer>
          <Button onPress={this.onButtonPress.bind(this)}>Crear oferta</Button>
        </CardContainer>
      </View>
    );
  }
}

function uploadFile(file) {

  return RNFetchBlob.fetch(
    "POST",
    "https://api.cloudinary.com/v1_1/" +
      cloudyName +
      "/image/upload?upload_preset=" +
      cloudyPreset,
    {
      "Content-Type": "multipart/form-data"
    },
    [
      {
        name: "file",
        filename: file.fileName,
        data: RNFetchBlob.wrap(file.path)
      }
    ]
  );
  }


const mapStateToProps = state => {
  const {
    description,
    date,
    priceOld,
    priceNew,
    address,
    productName
  } = state.productForm;

  return { description, date, priceOld, priceNew, address, productName };
};

export default connect(
  mapStateToProps,
  { productUpdate, productCreate }
)(FinalViewCreate);
