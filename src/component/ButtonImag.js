import React from 'react';
import { Text, TouchableOpacity, Image, View} from 'react-native';

const ButtonImag = ({ onPress, children, style, iconUri }) => {
    const {buttonStyle, textStyle} = styles; 
    return (
        <TouchableOpacity onPress={ onPress } style={ [buttonStyle, style ]}>
            <View style={{marginTop:4, justifyContent:"center", alignItems:"center"}}>
            <Image source={{uri: iconUri }} style={{height: 50, width: 50}} />
            </View>
            <Text style={ textStyle }>{ children }</Text> 

        </TouchableOpacity>
        
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop : 10,
        paddingBottom: 10
    },

    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: "center",
        justifyContent:"center",
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    }
}

 export { ButtonImag };