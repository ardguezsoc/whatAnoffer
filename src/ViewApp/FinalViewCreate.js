import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Button, CardContainer, Spinner } from "../component";
import ImagePicker from "react-native-image-picker";
import ProductForm from "./ProductForm";
import { productUpdate, productCreate, today, nowHour } from "../actions";
import { connect } from "react-redux";
import { uploadFile } from "../actions";

class FinalViewCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productImage: null,
      fileToImage: "",
      secureUrl: "",
      buttonStatus: true
      
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
          fileToImage: response,
          productImage: { uri: response.uri },
        });
      }
    });
  }

  
  onButtonPress() {
    this.setState({buttonStatus : false})
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
            this.setState({buttonStatus : true})
        
      })

    }else{
      const urlOfImag = "https://res.cloudinary.com/dfir4b1pq/image/upload/q_auto:good/v1550940285/nophoto.jpg"
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
     this.setState({buttonStatus : true})
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
        {this.state.buttonStatus ?
        <CardContainer>
           <Button onPress={this.onButtonPress.bind(this)}>Listo</Button> 
        </CardContainer>
        : <Spinner styleSpin={{ marginTop:15 }} /> }
      </View>
    );
  }
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
