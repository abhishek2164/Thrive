import moment from 'moment';
import React from 'react';
import {
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';
import { IMAGES } from '../../assets/Images/images';
import { useDispatch } from 'react-redux';
import { unPinnedNews } from '../../redux/actions';
const {width}=Dimensions.get("window")
function CardLayout({ item, index, pinned }: any) {
    const dispatch=useDispatch()
    function renderImage() {
        return (
            <View style={styles.imageContainer}>
                {!!item.urlToImage ?
                    <Image source={{ uri: item.urlToImage, cache: "only-if-cached" }} style={styles.imageStyle} /> : <Image source={IMAGES.teslaLogo} style={styles.demoImageStyle} />}
            </View>
        )
    }
    function renderUnpin(){
        return(
            <TouchableOpacity onPress={()=>dispatch(unPinnedNews(index))} style={styles.unPinButton}>
                <Text style={styles.unpinText}>Unpin</Text>
            </TouchableOpacity>
        )
    }
    function renderPinContainer() {
        return (
            <View style={styles.pinContainer}>
                <View style={styles.pinImageContainer}>
                <Image source={IMAGES.pin} style={styles.pinImage} />
                <Text style={styles.pinText}>PINNED</Text>
                </View>
                {renderUnpin()}
            </View>
        )
    }
    function renderBottomContainer() {
        return (
            <>
                <View style={styles.byContainer}>
                    <Text style={styles.byText} numberOfLines={1}>By: <Text style={styles.authorText} >{item?.author}</Text></Text>
                    <Text style={styles.dateText}>{moment(item?.publishedAt).format("MMM DD, YYYY")}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.sourceText}>Source: </Text>
                    <Text onPress={()=>Linking.openURL(item?.url)} style={styles.sourceName}>{item?.source?.name}</Text>
                </View>
            </>
        )
    }
    function renderInfo() {
        return (
            <>
                <Text style={styles.titleText} numberOfLines={2}>{item?.title}</Text>
                <Text style={styles.descriptionText} numberOfLines={4}>{item.description}</Text>
            </>
        )
    }
    function renderTopContainer() {
        return (
            <>
                {!!pinned && renderPinContainer()}
                {renderInfo()}
            </>
        )
    }
    function renderContent() {
        return (
            <View style={styles.contentContainer}>
                {renderTopContainer()}
                {renderBottomContainer()}
            </View>
        )
    }
    return (
        <View style={{ ...styles.container, marginBottom: !!pinned ? 20 : 0 }} key={index}>
            {renderImage()}
            {renderContent()}
        </View>
    )
}
const styles = StyleSheet.create({
    container: { width: width-32, borderWidth: 0.5, borderRadius: 10, overflow: "hidden" },
    textStyle: { color: "black", fontWeight: "700" },
    contentContainer: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: "#ffe8e3" },
    titleText: { marginBottom: 4, textTransform: "uppercase", fontWeight: "700", fontSize: 19, letterSpacing: 0.3, color: "black" },
    descriptionText: { marginBottom: 10, fontSize: 14, letterSpacing: 0.2, color: "grey" },
    byContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5, alignItems: "center" },
    byText: { fontSize: 14, fontWeight: '400', color: "grey", letterSpacing: 0.1,flex:1,paddingRight:5 },
    authorText: { fontWeight: "600", color: "black", fontSize: 15 },
    dateText: { color: "#fc0a05", fontSize: 15, fontWeight: "500", letterSpacing: 0.2 },
    sourceText: { marginBottom: 5, fontSize: 14, fontWeight: '400', color: "grey" },
    sourceName: { color: "#fc0a05", textDecorationLine: "underline", fontSize: 15, fontWeight: '500', letterSpacing: 0.2 },
    pinContainer: { flexDirection: "row", alignItems: "center", marginBottom: 5,justifyContent:"space-between" },
    pinImageContainer:{flexDirection:"row",alignItems:"center"},
    unPinButton:{height:20,justifyContent:"center",width:"20%",alignItems:"flex-end"},
    unpinText:{textDecorationLine:"underline",color: "grey", fontSize: 14, letterSpacing: 0.1, fontWeight: "600" },
    pinImage: { height: 20, width: 20, marginRight: 4 },
    pinText: { color: "#2021ce", fontSize: 14, letterSpacing: 0.1, fontWeight: "600" },
    imageContainer: { height: 200, width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "#d6f5f9" },
    imageStyle: { height: 200, width: "100%", resizeMode: "cover" },
    demoImageStyle: { height: 50, width: "50%", resizeMode: "stretch" }
})
export default CardLayout