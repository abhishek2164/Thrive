import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Timer from '../../Feed/Timer';
import Header from '../../CommonComponents/Header';
import NewsList from '../../Feed/NewsList';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsFeed, setLocalData } from '../../../redux/actions';
import { getCachedProductData } from '../../../localStorage/Storage';
function NewsFeed(props:any){
  const { page,loader} = useSelector((state: any) => state.feedReducer);
  const dispatch=useDispatch();
  async function readData(){
    try {
      const data = await getCachedProductData()
      if (data !== null) {
        console.log("locally storage")
        dispatch(setLocalData(data))
      }else{
        console.log("not locally storage")
        dispatch(getNewsFeed(page))
      }
    } catch (e) {
      Alert.alert('Failed to load name.')
    }
  }
    useEffect(() => {
      readData()
  }, []);

  function renderLoader(){
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color="blue" size={"large"}/>
        <Text style={styles.loaderText}>Loading News...</Text>
        </View>
    )
  }
return(
    <View style={styles.container}>
      <Header title={'NEWS'}/>
      { !loader ?
      <>
        <Timer/>
       <NewsList/>
       </>
        : renderLoader() }
    </View>
)
}
const styles=StyleSheet.create({
    container:{flex:1,backgroundColor:"white"},
    textStyle:{color:"black",fontWeight:"700"},
    loaderText:{marginTop:8,fontSize:14,color:"blue",fontWeight:"500",letterSpacing:0.1},
    loaderContainer:{flex:1,justifyContent:"center",alignItems:"center"}
})
export default NewsFeed