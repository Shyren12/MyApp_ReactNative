import { View, Image, Text, Platform, ScrollView, Dimensions, Pressable, Alert, SafeAreaView, ImageBackground } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../Navigation/RootNavigator';
import { HeadersComponent } from '../Components/HeaderComponents/HeaderComponent';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { CartState } from '../TypesCheck/productCartTypes';
import { ProductListParams } from '../TypesCheck/HomeProps';
import { addToCart } from '../redux/CartReducer';
import DisplayMessage from '../Components/ProductDetails/DisplayMessage';

const { width, height } = Dimensions.get('window');

export const ProductDetails = ({ route, navigation }: RootStackScreenProps<'productDetails'>) => {
    const { _id, images, name, price, oldPrice, inStock, color, size, description, quantity } = route.params;
    const productItemObj: ProductListParams = route.params as ProductListParams;

    const gotoCartScreen = () => {
        if (cart.length === 0) {
            setMessage("Cart is empty. Please add products to cart.");
            setDisplayMessage(true);
            setTimeout(() => {  
                setDisplayMessage(false);
            }, 3000);
        } else 
            navigation.navigate("TabsStack", { screen: "Cart"});
    }

    const goToPreviousScreen = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('OnboardingScreen');
        }
    };

    const cart = useSelector((state: CartState) => state.cart.cart);
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [displayMessage, setDisplayMessage] = React.useState<boolean>(false);

    const addItemToCart = (ProductItemObj: ProductListParams) => {
        if (ProductItemObj.quantity <= 0) {
            setMessage("Product is out of stock.");
            setDisplayMessage(true);
            setTimeout(() => {
                setDisplayMessage(false);
            }, 3000);
        } else {
            const findItem = cart.find((product) => product._id === _id);
            if (findItem) {
                setMessage("Product is already in cart.");
                setDisplayMessage(true);
                setTimeout(() => {
                    setDisplayMessage(false);
                }, 3000);
            } else {
                setAddedToCart(!addedToCart);
                dispatch(addToCart(ProductItemObj));
                setMessage("Product added to cart successfully.");
                setDisplayMessage(true);
                setTimeout(() => {
                    setDisplayMessage(false);
                }, 3000);
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
            {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}
            <HeadersComponent gotoCartScreen={gotoCartScreen} goToPrevious={goToPreviousScreen} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
                <ImageBackground style={{ width, minHeight: height * 0.45 }} imageStyle={{ borderRadius: 20 }}>
                    <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, backgroundColor: '#E3F2FD' }}>
                            <Text style={{ color: '#29B6F6', fontWeight: 'bold', fontSize: 12 }}>
                                {oldPrice ? `${((1 - price / oldPrice) * 100).toFixed(1)}% OFF` : '0% OFF'}
                            </Text>
                        </View>
                        <MaterialCommunityIcons name="share-variant" size={25} color="#4CAF50" />
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 350, height: 350, resizeMode: 'contain', borderRadius: 15 }} source={{ uri: images?.[0] || 'https://via.placeholder.com/300' }} />
                    </View>
                </ImageBackground>

                <View style={{ padding: 20, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#212121' }}>{name}</Text>
                    <Text style={{ fontSize: 16, color: '#757575', marginVertical: 10 }}>{description}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#388E3C' }}>${price}</Text>
                    {oldPrice && <Text style={{ fontSize: 16, color: '#B0BEC5', textDecorationLine: 'line-through' }}>${oldPrice}</Text>}
                    <Text style={{ fontSize: 16, color: quantity > 0 ? '#388E3C' : '#D32F2F' }}>{quantity > 0 ? `In Stock (${quantity} items)` : 'Out of Stock'}</Text>
                </View>

                <View style={{ padding: 20, backgroundColor: 'white', marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1E88E5' }}>Delivery Information</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Ionicons name="location-sharp" size={25} color="#388E3C" />
                        <Text style={{ fontSize: 14, color: '#616161', marginLeft: 5 }}>
                            Delivery to: CAMPUS THANH THAI, 7/1 Thanh Thai, Ward 14, District 10, Ho Chi Minh City
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={{ backgroundColor: 'white', paddingVertical: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <Pressable
                    style={{
                        backgroundColor: '#4CAF50',
                        padding: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        marginHorizontal: 20,
                    }}
                    onPress={() => addItemToCart(productItemObj)}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                        {addedToCart ? 'Added to Cart' : 'Add to Cart'}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};
