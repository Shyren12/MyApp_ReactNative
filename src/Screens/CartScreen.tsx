import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  Pressable,
  Dimensions,
  Image,
  StyleSheet
} from "react-native";
import { RootStackScreenProps } from "../Navigation/RootNavigator";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { CartState, ProductListParams } from "../TypesCheck/productCartTypes";
import DisplayMessage from "../Components/ProductDetails/DisplayMessage";
import { HeadersComponent } from "../Components/HeaderComponents/HeaderComponent";
import { UserType } from "../Components/LoginRegisterComponents/UserContext";

const screenWidth = Dimensions.get("window").width;

const CartScreen = ({ navigation }: TabsStackScreenProps<"Cart">) => {
  const { getUserId, setGetUserId } = useContext(UserType);
  const proceed = () => {
    if (getUserId === "") {
      navigation.navigate("UserLogin", { screenTitle: "User Authentication" });
    } else {
      if (cart.length === 0) {
        navigation.navigate("TabsStack", { screen: "Home" });
      }
    }
  };

  const cart = useSelector((state: CartState) => state.cart.cart);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);

  const decreaseItem = (item: ProductListParams) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item));
      setMessage("Product Quantity Updated Successfully");
    } else {
      deleteItem(item); // If quantity <= 1, remove the product
    }
    setDisplayMessage(true);
    setTimeout(() => {
      setDisplayMessage(false);
    }, 3000);
  };

  const deleteItem = (item: ProductListParams) => {
    dispatch(removeFromCart(item._id)); // Only pass the product's ID
    setMessage("Product Removed Successfully");
    setDisplayMessage(true);
    setTimeout(() => {
      setDisplayMessage(false);
    }, 3000);
  };

  const increaceQuantity = (item: ProductListParams) => {
    dispatch(increaseQuantity(item)); // Call action to increase quantity
    setMessage("Product Quantity Updated Successfully");
    setDisplayMessage(true);
    setTimeout(() => {
      setDisplayMessage(false);
    }, 3000);
  };

  useEffect(() => {
    if (cart.length === 0) {
      setMessage("Your cart is Empty. Please add products to continue!");
      setDisplayMessage(true);
      setTimeout(() => {
        setDisplayMessage(false);
        navigation.navigate("TabsStack", { screen: "Home" });
      }, 3000);
    }
  }, [cart.length]);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      {displayMessage && <DisplayMessage message={message} />}

      <HeadersComponent
        gotoCartScreen={() => navigation.navigate("Cart")}
        cartLength={cart.length}
        goToPrevious={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cartListContainer}>
          {cart?.map((item, index) => (
            <View style={styles.cartItemContainer} key={index}>
              <Pressable style={styles.cartItem}>
                <Image style={styles.cartItemImage} source={{ uri: item?.images[0] }} />
                <View style={styles.cartItemDetails}>
                  <Text numberOfLines={2} style={styles.cartItemName}>
                    {item.name}
                  </Text>
                  <Text style={styles.cartItemPrice}>
                    Price: {item.price.toLocaleString("vi-VN")}$ 
                  </Text>
                </View>
              </Pressable>

              <View style={styles.cartItemActions}>
                <View style={styles.quantityControl}>
                  {item?.quantity > 1 ? (
                    <Pressable onPress={() => decreaseItem(item)} style={styles.quantityButton}>
                      <AntDesign name="minus" size={15} color="white" />
                    </Pressable>
                  ) : (
                    <Pressable onPress={() => deleteItem(item)} style={styles.quantityButton}>
                      <AntDesign name="delete" size={15} color="white" />
                    </Pressable>
                  )}
                  <Pressable style={styles.quantityDisplay}>
                    <Text style={styles.quantityText}>{item?.quantity}</Text>
                  </Pressable>
                  <Pressable onPress={() => increaceQuantity(item)} style={styles.quantityButton}>
                    <Feather name="plus" size={20} color="white" />
                  </Pressable>
                </View>

                <Pressable onPress={() => deleteItem(item)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>

                <Text style={styles.cartItemTotal}>
                  {(item.price * item.quantity).toLocaleString("vi-VN")}$ 
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.checkoutContainer}>
          <View style={styles.totalAmountContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>{total.toLocaleString("vi-VN")}$</Text>
          </View>

          <Pressable onPress={proceed} style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Proceed to Buy ({cart.length})</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cartListContainer: {
    marginHorizontal: 10,
  },
  cartItemContainer: {
    backgroundColor: "#fff",
    marginVertical: 15,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cartItem: {
    flexDirection: "row",
    padding: 12,
  },
  cartItemImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 8,
  },
  cartItemDetails: {
    marginLeft: 12,
    justifyContent: "center",
  },
  cartItemName: {
    fontSize: 16,
    width: 250,
    fontWeight: "500",
    color: "#333",
  },
  cartItemPrice: {
    fontSize: 16,
    marginTop: 6,
    fontWeight: "bold",
    color: "#555",
  },
  cartItemActions: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingHorizontal: 15,
  },
  quantityButton: {
    backgroundColor: "#3b82f6",
    padding: 8,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  quantityDisplay: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  quantityText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 12,
    borderRadius: 25,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cartItemTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  checkoutContainer: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    marginTop: 30,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  totalAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#333",
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  checkoutButton: {
    backgroundColor: "#34d399",
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;
