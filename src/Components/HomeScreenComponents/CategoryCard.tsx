import { View, Text, Pressable, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { ICatProps } from '../../TypesCheck/CategoryTypes';

export const CategoryCard = ({ item, catProps, catStyleProps }: ICatProps) => {
    let isActive = item._id == catProps.activeCat;
    let activeButtonClass = isActive ? "blue" : "white";

    return (
        <View>
            {catProps.imageBg !== undefined ? (
                <View style={{  alignItems: 'center', justifyContent: 'center' }}>
                    <Pressable style={st.imageContainer} key={item._id} onPress={catProps.onPress}>
                        <ImageBackground source={{ uri: catProps?.imageBg }} style={styl(catStyleProps.imageBgHt).
                        imageBg}>
                            <Image source={{ uri: item?.images[0] }}
                                style={sty(catStyleProps.width, catStyleProps.height, catStyleProps.radius).
                                imgStyleProps} 
                                resizeMode = {catStyleProps?.resizeMode} 
                            />
                        </ImageBackground>
                    </Pressable>        
                    <Text style={st.catName}>{item?.name}</Text>
                </View>
            ) : (
                <TouchableOpacity style={[st.touchableStyle, { backgroundColor: activeButtonClass }]} key={item.
                _id} onPress={catProps.onPress}>
                    <View style={st.imageContainer}>
                        <Image source={{ uri: item?.images[0] }} 
                            style={sty(catStyleProps.width, catStyleProps.height, catStyleProps.radius).
                            imgStyleProps} 
                            resizeMode = {catStyleProps?.resizeMode} 
                        >

                        </Image>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    )
}

const st = StyleSheet.create({
    imageContainer: {
        borderRadius: 50,
        padding: 3
        // width: '100%',
        // height: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    catName: {
        fontSize: 8,
        fontWeight: 'bold',
        // textAlign: 'center',
        // marginTop: 5,
    },
    touchableStyle: {
        alignItems: 'center',
        padding: 5,
        borderRadius: 20,        
        margin: 3,
        //justifyContent: 'center',
        // width: 100,
        // height: 100,
    }
})

const styl = (height?: number) => ({
    imageBg: {
        height,
        borderRadius: 11
    }
})

const sty = (width?: number, height?: number, radius?: number) => ({
    imgStyleProps: {    
        width,
        height,
        borderRadius: radius,
    }
})