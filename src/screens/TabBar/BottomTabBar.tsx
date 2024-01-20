import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import { createBottomTabNavigator ,BottomTabBar} from '@react-navigation/bottom-tabs';
import SearchScreen from './TabScreens/SearchScreen';
import NewsFeed from './TabScreens/NewsFeed';
import { IMAGES } from '../../assets/Images/images';

const Tab = createBottomTabNavigator();
export default function BottomTabNavigator(props:any){
    const renderIcon = (focused: any,activeIcon:any,inActiveIcon:any) => {
        return (
            <>
        <Image source={focused ? activeIcon:inActiveIcon} style={{height:25,width:25}}/>
        </>
        )
    }
    const renderLabel = (focused: any, label:any) => {
        return (
            <Text style={{fontSize:10,fontWeight:focused ? "bold":"normal",color:focused ? "black":"grey" ,marginBottom:10}}>
               {label}
            </Text>
        )
    }
    return(
        <Tab.Navigator
        initialRouteName={'Feed'}
        backBehavior="history"
        tabBarOptions={{
            style:{height:60},
            keyboardHidesTabBar:true
        }}
        >
               <Tab.Screen
                name={'Feed'}
                component={NewsFeed}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => renderIcon(focused,IMAGES.activeFeed,IMAGES.feed),
                    tabBarLabel:({ focused }) => renderLabel(focused, "Feed"),
                })}
            />
            <Tab.Screen
                name={'Search'}
                component={SearchScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => renderIcon(focused,IMAGES.activeSearch,IMAGES.search),
                    tabBarLabel:({ focused }) => renderLabel(focused, "Search"),
                })}
            />
            </Tab.Navigator>
    )
}
const styles=StyleSheet.create({

})
