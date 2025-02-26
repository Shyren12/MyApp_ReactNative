import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Entypo, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { GoBack } from './GoBackButton';

interface IHeaderParams {
    goToPrevious?: () => void;
    search?: () => void;
    cartLength?: number;
    gotoCartScreen?: () => void;
}

const styles = StyleSheet.create({
    cartNum: {
        position: 'absolute',
        top: -10,
        right: -10,
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const HeadersComponent = ({ goToPrevious, search, cartLength, gotoCartScreen } : IHeaderParams) => {
    const [searchInput, setSearchInput] = useState("")
    return (
        <View style={{ backgroundColor: 'white', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <GoBack onPress={goToPrevious} />
            <Pressable style={{  
                flexDirection: 'row', alignItems: 'center', marginHorizontal: 7,
                gap: 10, backgroundColor: 'rgba(240, 239, 239, 0.87)', borderRadius: 10, height: 40, flex: 1
            }}>
                <Pressable style={{ padding: 10, borderRadius: 10, backgroundColor: 'rgba(76, 231, 81, 0.66)'}} onPress={search}>
                    <AntDesign name="search1" size={22} color="blue" />
                </Pressable>
                <TextInput value = {searchInput} onChangeText={setSearchInput} placeholder="search Items ..."  />
            </Pressable>
            <Pressable onPress={gotoCartScreen}>
                <View style={styles.cartNum}>
                    {/*<AntDesign name="shoppingcart" size={30} color="black" /> */}
                    <Text style={{ color: "pink" }}>
                        {cartLength}
                    </Text>
                </View>
                <MaterialIcons name="shopping-cart" size={24} color="grey" style={{ padding: 5, marginTop: 3 }} />
            </Pressable>
        </View>
    )
}