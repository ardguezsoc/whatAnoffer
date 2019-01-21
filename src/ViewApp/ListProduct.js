import React, {Component } from 'react';
import {Text, ScrollView, View, TouchableHighlight} from 'react-native';
import { CardItem } from '../component';
import { Actions } from 'react-native-router-flux';
import {Button} from '../component';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/Ionicons';


class ListProduct extends Component {
    render(){
        return( 
            <View>
                <ScrollView>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                    <CardItem/>
                </ScrollView>
                 <FAB buttonColor="green" iconTextColor="#FFFFFF" onClickAction={() => Actions.productForm()} visible={true} iconTextComponent={<Icon name="md-pricetags"/>}> </FAB> 
                 </View>

        );
    }
}

export default ListProduct;