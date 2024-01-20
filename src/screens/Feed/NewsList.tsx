import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable
} from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNews, pinnedNews } from '../../redux/actions';
import CardLayout from './CardLayout';

function NewsList(props: any) {
  const swipeActivation = (Dimensions.get("window").width - 32) / 2;
  const { showList, pinnedList } = useSelector((state: any) => state.feedReducer);
  const dispatch: Function = useDispatch();
  const listRef=useRef();
  const onPressFunction = () => {
    listRef?.current?.scrollToOffset({ animated: true, offset: 0 });
  };
  function renderSwipeText(text: any, color: any) {
    return (
      <View style={styles.pinContainer}>
        <Text style={{ ...styles.swipeText, color: color }}>{text}</Text>
      </View>
    )
  }
  function renderSwipeView() {
    return (<View style={styles.swipeContainer}>
      {renderSwipeText("PIN", "green")}
      {renderSwipeText("DELETE", "red")}
    </View>)
  }
  function renderRow({ item, index }: any) {
    return (
      <SwipeRow 
       onLeftAction={() => 
      dispatch(pinnedNews(index))
      } onRightAction={() => dispatch(deleteNews(index))} leftActivationValue={swipeActivation} rightActivationValue={swipeActivation}>
        {renderSwipeView()}
        <CardLayout item={item} index={index} />
      </SwipeRow>

    )
  }
  function renderListHeader() {
    return (
      <>
        {!!pinnedList && pinnedList.length > 0 &&
          pinnedList.map((item: any, index: any) => <CardLayout item={item} index={index} pinned={true} key={index} />)
        }
      </>)
  }
  function renderSeparator() {
    return (<View style={styles.separatorStyle}></View>)
  }
  function renderList() {
    return (
      <SwipeListView
        data={showList}
        listViewRef={listRef}
        disableVirtualization
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => renderListHeader()}
        style={styles.listContainer}
        ItemSeparatorComponent={() => renderSeparator()}
        contentContainerStyle={styles.contentListContainer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRow}
      />
    )
  }
  return (
    <View style={styles.container}>
      {renderList()}
      <Pressable style={styles.button} onPress={onPressFunction}>
        <Text style={styles.arrow}>^</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  textStyle: { color: "black", fontWeight: "700" },
  listContainer: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
  contentListContainer: { paddingBottom: 70},
  swipeContainer: { flex: 1, flexDirection: "row" },
  pinContainer: { height: "auto", width: "50%", justifyContent: "center", alignItems: "center" },
  swipeText: { fontSize: 20, fontWeight: "900" },
  separatorStyle: { height: 20, backgroundColor: "white" },
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  arrow: {
    fontSize: 48,
  },
})
export default React.memo(NewsList)