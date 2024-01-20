import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { IMAGES } from '../../assets/Images/images';
export default function Splash(props: any) {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.replace('TabScreens');
        }, 1000);
    }, [])
    return (
        <View style={styles.splashContainer}>
            <Image source={IMAGES.splashLogo} style={{height:100,width:100}}/>
            <Text style={styles.splashText}>News App</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    splashContainer: { flex: 1, backgroundColor: "#d6f5f9", justifyContent: "center", alignItems: "center" },
    splashText: { fontSize: 20, color: "black", letterSpacing:0.3,fontWeight: "bold",marginTop:10 }
})