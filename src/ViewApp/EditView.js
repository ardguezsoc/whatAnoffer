import React,{ Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import _ from 'lodash';
import {  connect  } from 'react-redux';
import ProductForm from "./ProductForm";
import { Button, CardContainer } from '../component';
import { productUpdate } from '../actions';
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";


class EditView extends  Component {

    componentWillMount(){
        _.each(this.props.product, (value, prop) => {
            this.props.productUpdate({ prop, value });
        });
    }

    render(){
        return(
            <View>
                <ProductForm {...this.props.product} />
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
          {this.props.product.urlOfImag ? (
            <Image
              source={ {uri: this.props.product.urlOfImag}}
              style={{ height: 80, width: 80, borderRadius: 40 }}
            />
          ) :  <Image
          source={require('./camera-flat.png')}
          style={{ height: 80, width: 80, borderRadius: 40 }}
        /> }
        </TouchableOpacity>
        </View>
                <CardContainer><Button>Listo</Button></CardContainer>
            </View>
        )
    }
        
    

}

const mapStateToProps = (state) => {
    const {date, description, placeValue, priceNew, priceOld, productKindValue, productValue, urlOfImag  } = state.product

    return { date, description, placeValue, priceNew, priceOld, productKindValue, productValue, urlOfImag  };
}

export default connect(mapStateToProps, { productUpdate })(EditView);