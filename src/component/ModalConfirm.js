import React from 'react';
import { View, Text, Modal } from 'react-native';
import { Button } from '../component';
import { CardContainer } from '../component';


const ModalConfirm = ({ children, visible, onAccept, onCancel }) => {
    
    return(
       
        <Modal
        visible={ visible } 
        transparent
        onRequestClose
        animationType="fade"
        onRequestClose={() => {}}
        > 
        
        <View style={styles.containerStyle}>
         <CardContainer style={styles.cardSectionStyle}><Text style={styles.textStyle} >{children}</Text></CardContainer>
         <CardContainer>
            <Button onPress={onAccept}>Aceptar</Button> 
            <Button onPress={onCancel}>Cancelar</Button> 
         </CardContainer>
        </View>
        </Modal>
       
    );

}

const styles = {
    containerStyle: {
        backgroundColor: "rgba(0,0,0,0.75)",
        flex: 1,
        justifyContent: "center",
      },

      cardSectionStyle: {
        justifyContent: "center"
      },
    
      textStyle: {
        flex: 1,
        fontSize: 16,
        textAlign: "center",
        lineHeight: 40
      },
}

export { ModalConfirm };