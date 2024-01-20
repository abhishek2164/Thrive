import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
function Header(props:any){
return(
    <View style={styles.container}>
        <Text style={styles.textStyle}>{props?.title}</Text>
    </View>
)
}
const styles=StyleSheet.create({
    container:{backgroundColor:"#d6f5f9",justifyContent:"center",alignItems:"center",height:60},
    textStyle:{color:"black",fontSize:24,fontWeight:"bold"}
})
export default Header