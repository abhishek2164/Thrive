import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IMAGES } from '../../assets/Images/images';
import { getNewsFeed, showLoader, updateShowNews } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
function Timer(props: any) {
    const [timerText, setTimertext] = useState(10);
    const [myInterval, setMyInterval] = useState(undefined);
    const { newsViewed,page,newsFeed,pinnedList} = useSelector((state: any) => state.feedReducer);
    const dispatch: Function = useDispatch()
    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(myInterval);
        }
    }, [])

    useEffect(() => {
        if (timerText == 0) {
            resetTimer()
        }
    }, [timerText])
    function resetTimer() {
        clearInterval(myInterval);
        if(!!newsFeed && newsFeed.length > 4){
            dispatch(updateShowNews());
        }else{
                dispatch(showLoader())
                dispatch(getNewsFeed(page))
        }
        setTimeout(() => {
            setTimertext(10);
            startTimer()
        }, 100)
      
    }
    function startTimer() {
        setMyInterval(setInterval(() => { setTimertext(prev => prev - 1) }, 1000))
    }
    function renderRefresh() {
        return (
            <View style={{flexDirection:"row",alignItems:"center"}}>
                   <Text style={[styles.textStyle,{marginRight:5}]}>{timerText == 10 ? `00:${timerText}` : `00:0${timerText}`}</Text>
           
            <TouchableOpacity 
            onPress={() => {
                resetTimer()
            }} 
            style={styles.refreshContainer}>
                <Text style={styles.refreshText}>Refresh</Text>
                <Image source={IMAGES.refresh} style={styles.refreshIconStyle} />
            </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
            <Text  style={[styles.textStyle,{marginRight:5}]}>{`News Viewed: ${newsViewed},`}</Text>
            <Text  style={styles.textStyle}>{`Pinned News: ${pinnedList.length}`}</Text>
            </View>
            {renderRefresh()}
        </View>
    )
}
const styles = StyleSheet.create({
    container: { backgroundColor: "white", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%", paddingHorizontal: 16, borderWidth: 0.5, borderColor: "grey" },
    textStyle: { color: "black", fontWeight: "700", fontSize: 14 },
    refreshContainer: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
    refreshText: { color: "black", fontSize: 14, fontWeight: "700", marginRight: 5 },
    refreshIconStyle: { height: 20, width: 20 }
})
export default Timer