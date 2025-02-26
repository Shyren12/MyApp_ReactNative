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
            console.log("Go back to previous page");
            navigation.goBack();
        } else {
            console.log("Can't go back to previous page, back to Onboardingding.");
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
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 20 : 0, flex: 1, backgroundColor: 'white' }}>
            {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}
            <HeadersComponent gotoCartScreen={gotoCartScreen} goToPrevious={goToPreviousScreen} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'pink' }}>
                <ImageBackground style={{ width, minHeight: height, marginTop: 25 }}>
                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#C6C8C3', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'yellow', fontWeight: '600', fontSize: 12 }}>
                                {oldPrice ? `${((1 - price / oldPrice) * 100).toFixed(1)}% off` : '0% off'}
                            </Text>
                        </View>
                        <MaterialCommunityIcons name="share-variant" size={25} color="green" />
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 400, height: 400, resizeMode: 'contain' }} source={{ uri: images?.[0] || 'https://via.placeholder.com/300' }} />
                    </View>
                </ImageBackground> 

                <View style={{ padding: 20, backgroundColor: 'white' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{name}</Text>
                    <Text style={{ fontSize: 18, color: 'green', marginVertical: 10 }}>{description}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Price: {price} $</Text>
                    {oldPrice && <Text style={{ fontSize: 16, color: 'grey' }}>Old Price: {oldPrice} $</Text>}
                    <Text style={{ fontSize: 16, color: quantity > 0 ? 'blue' : 'red' }}>{quantity > 0 ? `In Stock - Quantity: ${quantity}` : 'Out of Stock'}</Text>
                    <Text style={{ fontSize: 16, color: 'orange' }}>Color: {color}</Text>
                    <Text style={{ fontSize: 16, color: 'red' }}>Size: {size}</Text>
                </View>

                <View style={{ padding: 20, backgroundColor: 'white', marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>Delivery</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Ionicons name="location-sharp" size={25} color="green" />
                        <Text style={{ fontSize: 14, color: 'brown', marginLeft: 5 }}>
                            Delivery to: CAMPUS THANH THAI, 7/1 Thanh Thai, Ward 14, District 10, Ho Chi Minh City
                        </Text>
                    </View>
                </View>

                <View style={{ padding: 20, backgroundColor: 'white', marginBottom: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'purple', marginBottom: 10 }}>Description</Text>
                    <Text style={{ fontSize: 16, color: 'green' }}>
                        Size 7 (24-26kg, 122-130cm){"\n"}
                        Size 8 (27-30kg, 130-137cm){"\n"}
                        Size 9 (31-34kg, 137-145cm){"\n"}
                        Size 10 (35-39kg, 145-150cm)
                    </Text>
                </View>
            </ScrollView>
            <View style={{ backgroundColor: "white", paddingBottom: 0 }}>
                <Pressable
                    style={{ backgroundColor: "green", padding: 15, alignItems: "center", justifyContent: "center", borderRadius: 10, margin: 10 }}
                    onPress={() =>
                        addItemToCart(productItemObj)}>
                    {addedToCart ? (
                        <Text style={{ color: "violet", fontSize: 20, fontWeight: "bold" }}>
                            Add to Cart</Text>
                    ) : (
                        <Text style={{ color: "orange", fontSize: 20, fontWeight: "bold" }}>
                            Add to Cart</Text>
                    )
                    }
                </Pressable>
            </View>

        </SafeAreaView>
    );
};
