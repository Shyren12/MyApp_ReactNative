// import {View, Text, Platform, ScrollView, SectionList, Pressable, Alert,} from "react-native";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { HeadersComponent } from "./../Components/HeaderComponents/HeaderComponent";
// import ImageSlider from "../Components/HomeScreenComponents/ImageSlider";
// import { ProductListParams, FetchProductsParam } from "../TypesCheck/HomeProps";
// import { CategoryCard } from "../Components/HomeScreenComponents/CategoryCard";
// import {fetchCategories,fetchProductsByCatID,fetchTrendingProducts,} from "../MiddleWares/HomeMiddleWares";
// import { useFocusEffect } from "@react-navigation/native";
// import { getProductByCatID } from "../../apiMongoDB/Controllers";
// import { ProductCard } from "../Components/HomeScreenComponents/ProductCard";
// import { useSelector } from "react-redux";
// import { CartState } from "../TypesCheck/productCartTypes";
// import DisplayMessage from "../Components/ProductDetails/DisplayMessage";

// type Props = {};
// const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
//   const sectionListRef = useRef<SectionList>(null);
//   //const sectionListRef = useRef<SectionList<ProductListParams>>(null);

//   const cart = useSelector((state: CartState) => state.cart.cart);
//   const gotoCartScreen = () => {
//     if (cart.length === 0) {
//       setMessage("Cart is empty. Please add products to cart.");
//       setDisplayMessage(true);
//       setTimeout(() => { setDisplayMessage(false); }, 3000);
//     } else {
//       navigation.navigate("TabsStack", { screen: "Cart" });
//     }
//   };

//   const goToPreviousScreen = () => {
//     if (navigation.canGoBack()) {
//       console.log("Chuyển về trang trước.");
//       navigation.goBack();
//     } else {
//       console.log("Không thể quay lại, chuyển về trang Onboarding.");
//       navigation.navigate("OnboardingScreen"); // Điều hướng fallback
//     }
//   };

//   const sliderImages = [
//     "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/10/MOTORSHOW-KV-2.jpg",
//     "https://tiki.vn/blog/wp-content/uploads/2023/01/xe-may-re-2-696x499.png",
//     "https://hondamotophattien.com/uploads/scale1.1-posterfb_16.08.jpg",
//   ];

//   const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
//   const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
//   const [activeCat, setActiveCat] = useState<string>("");
//   const bgImg = require("../pictures/MenCategory.jpg");
//   const [trendingProducts, setTrendingProducts] = useState<ProductListParams[]>( []);
//   const productWidth = 120; // Define productWidth with a suitable value

//   useEffect(() => {
//     fetchCategories({ setGetCategory });
//     fetchTrendingProducts({ setTrendingProducts });
//   }, []);

//   useEffect(() => {
//     console.log("fetchProductsByCatID", fetchProductsByCatID);
//     if (activeCat) {
//       fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
//     }
//   }, [activeCat]);

//   useFocusEffect(
//     useCallback(() => {
//       fetchCategories({ setGetCategory });
//       if (activeCat) {
//         fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
//       }
//     }, [activeCat])
//   );

//   const [message, setMessage] = React.useState("");
//   const [displayMessage, setDisplayMessage] = React.useState<boolean>(false);
//   return (
//     <SafeAreaView
//       style={{
//         paddingTop: Platform.OS === "android" ? 1 : 0,
//         flex: 1,
//         backgroundColor: "violet",
//       }}
//     >
//       {displayMessage && (
//         <DisplayMessage
//           message={message}
//           visible={() => setDisplayMessage(!displayMessage)}
//         />
//       )}
//       <HeadersComponent
//         gotoCartScreen={gotoCartScreen}
//         cartLength={cart.length}
//         goToPrevious={goToPreviousScreen}
//       />
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={{
//           backgroundColor: "#efefef",
//           flexDirection: "row",
//           padding: 10,
//           marginVertical: 10,
//         }}
//       >
//         <ImageSlider images={sliderImages} />
//       </ScrollView>
//       <View style={{ backgroundColor: "yellow", flex: 2 }}>
//         <Text>Categories</Text>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 15 }}
//           style={{ marginTop: 4 }}
//         >
//           {getCategory.map((item, index) => (
//             <CategoryCard
//               key={item._id}
//               item={{ name: item.name, images: item.images, _id: item._id }}
//               catStyleProps={{
//                 height: 50,
//                 width: 55,
//                 radius: 20,
//                 resizeMode: "contain",
//                 // imageBgHt: 150,
//               }}
//               catProps={{
//                 activeCat: activeCat,
//                 onPress: () => setActiveCat(item._id),
//               }}
//             />
//           ))}
//         </ScrollView>
//       </View>
//       <View
//         style={{ backgroundColor: "red", flexDirection: "row", justifyContent: "space-between", marginTop: 10,}}>
//         <Text style={{ fontSize: 15, fontWeight: "bold", padding: 10 }}> Products from Selected Category</Text>
//         <Pressable>
//           <Text style={{ fontSize: 10, fontWeight: "bold", padding: 10 }}> View All</Text>
//         </Pressable>
//       </View>
//       <View
//         style={{
//           backgroundColor: "#fff ",
//           borderWidth: 7,
//           borderColor: "green",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexWrap: "wrap",
//         }}
//       >
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {getProductsByCatID?.length > 0 ? (
//             getProductsByCatID.map((item, index) => (
//               <CategoryCard
//                 key={index}
//                 item={{ name: item.name, images: item.images, _id: item._id }}
//                 catStyleProps={{
//                   height: 100,
//                   width: 100,
//                   radius: 10,
//                   resizeMode: "contain",
//                   // imageBgHt: 150,
//                 }}
//                 catProps={{
//                   onPress: () => navigation.navigate("productDetails", item),
//                   imageBg: bgImg,
//                 }}
//               />
//             ))
//           ) : (
//             <Text style={{ padding: 10 }}> No products found </Text>
//           )}
//         </ScrollView>
//       </View>
//       <View
//         style={{
//           backgroundColor: "red",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           marginTop: 10,
//         }}
//       >
//         <Text
//           style={{
//             color: "yellow",
//             fontSize: 14,
//             fontWeight: "bold",
//             padding: 10,
//           }}
//         >
//           Trending Products of the Week
//         </Text>
//       </View>
//       <View
//         style={{
//           backgroundColor: "#fff",
//           borderWidth: 7,
//           borderColor: "green",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexWrap: "wrap",
//         }}
//       >
//         {trendingProducts.map((item, index) => (
//           <ProductCard
//             item={{
//               _id: item?._id || index.toString(),
//               name: item?.name || "Product Name",
//               images: item?.images || [""],
//               price: item?.price || 0,
//               oldPrice: item?.oldPrice || item?.price || 0,
//               description: item?.description || "Product Description",
//               quantity: item?.quantity ?? 1,
//               inStock: item?.inStock ?? true,
//               isFeatured: Boolean(item?.isFeatured),
//               category: item?.category?.toString || "Product Category",
//             }}
//             key={index}
//             pStyleProps={{
//               resizeMode: "contain",
//               width: productWidth,
//               height: 10,
//               marginBottom: 5,
//             }}
//             productProps={{
//               imageBg: bgImg,
//               onPress: () => {
//                 navigation.navigate("productDetails", item);
//               },
//             }}
//           ></ProductCard>
//         ))}
//       </View>
//     </SafeAreaView> // ✅ Properly closed SafeAreaView
//   );
// };

// export default HomeScreen;
import { View, Text, Platform, ScrollView, Pressable, StyleSheet, Image, SectionList,  } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeadersComponent } from "./../Components/HeaderComponents/HeaderComponent";
import ImageSlider from "../Components/HomeScreenComponents/ImageSlider";
import { ProductListParams } from "../TypesCheck/HomeProps";
import { CategoryCard } from "../Components/HomeScreenComponents/CategoryCard";
import { fetchCategories, fetchProductsByCatID, fetchTrendingProducts } from "../MiddleWares/HomeMiddleWares";
import { useFocusEffect } from "@react-navigation/native";
import { ProductCard } from "../Components/HomeScreenComponents/ProductCard";
import { useSelector } from "react-redux";
import { CartState } from "../TypesCheck/productCartTypes";
import DisplayMessage from "../Components/ProductDetails/DisplayMessage";

const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  const sectionListRef = useRef<SectionList>(null);
  const cart = useSelector((state: CartState) => state.cart.cart);
  
  const gotoCartScreen = () => {
    if (cart.length === 0) {
      setMessage("Cart is empty. Please add products to cart.");
      setDisplayMessage(true);
      setTimeout(() => { setDisplayMessage(false); }, 3000);
    } else {
      navigation.navigate("TabsStack", { screen: "Cart" });
    }
  };

  const goToPreviousScreen = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("OnboardingScreen");
    }
  };

  const sliderImages = [
    "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/10/MOTORSHOW-KV-2.jpg",
    "https://tiki.vn/blog/wp-content/uploads/2023/01/xe-may-re-2-696x499.png",
    "https://hondamotophattien.com/uploads/scale1.1-posterfb_16.08.jpg",
  ];

  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
  const [activeCat, setActiveCat] = useState<string>("");
  const bgImg = require("../pictures/MenCategory.jpg");
  const [trendingProducts, setTrendingProducts] = useState<ProductListParams[]>([]);

  useEffect(() => {
    fetchCategories({ setGetCategory });
    fetchTrendingProducts({ setTrendingProducts });
  }, []);

  useEffect(() => {
    if (activeCat) {
      fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
    }
  }, [activeCat]);

  useFocusEffect(
    useCallback(() => {
      fetchCategories({ setGetCategory });
      if (activeCat) {
        fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
      }
    }, [activeCat])
  );

  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}
      <HeadersComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} goToPrevious={goToPreviousScreen} />

      {/* Image Slider Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sliderContainer}>
        <ImageSlider images={sliderImages} />
      </ScrollView>

      {/* Categories Section */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
          {getCategory.map((item, index) => (
            <CategoryCard
              key={item._id}
              item={{ name: item.name, images: item.images, _id: item._id }}
              catStyleProps={styles.categoryCardStyle}
              catProps={{
                activeCat: activeCat,
                onPress: () => setActiveCat(item._id),
              }}
            />
          ))}
        </ScrollView>
      </View>

      {/* Selected Category Products Section */}
      <View style={styles.selectedCategoryContainer}>
        <Text style={styles.selectedCategoryTitle}>Products from Selected Category</Text>
        <Pressable onPress={() => {}} style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </Pressable>
      </View>
      <View style={styles.productListContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {getProductsByCatID.length > 0 ? (
            getProductsByCatID.map((item, index) => (
              <CategoryCard
                key={index}
                item={{ name: item.name, images: item.images, _id: item._id }}
                catStyleProps={styles.categoryCardStyle}
                catProps={{
                  onPress: () => navigation.navigate("productDetails", item),
                  imageBg: bgImg,
                }}
              />
            ))
          ) : (
            <Text style={styles.noProductsText}>No products found</Text>
          )}
        </ScrollView>
      </View>

      {/* Trending Products Section */}
      <View style={styles.trendingProductsContainer}>
        <Text style={styles.trendingTitle}>Trending Products of the Week</Text>
      </View>
      <View style={styles.productListContainer}>
        {trendingProducts.map((item, index) => (
          <ProductCard
            item={{
              _id: item?._id || index.toString(),
              name: item?.name || "Product Name",
              images: item?.images || [""],
              price: item?.price || 0,
              oldPrice: item?.oldPrice || item?.price || 0,
              description: item?.description || "Product Description",
              quantity: item?.quantity ?? 1,
              inStock: item?.inStock ?? true,
              isFeatured: Boolean(item?.isFeatured),
              category: item?.category?.toString || "Product Category",
            }}
            key={index}
            pStyleProps={styles.productCardStyle}
            productProps={{
              imageBg: bgImg,
              onPress: () => navigation.navigate("productDetails", item),
            }}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: Platform.OS === "android" ? 1 : 0,
  },
  sliderContainer: {
    marginVertical: 10,
  },
  categoriesContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  categoryList: {
    paddingHorizontal: 5,
  },
  categoryCardStyle: {
    height: 70,
    width: 70,
    borderRadius: 15,
    resizeMode: "contain", // Ensuring image fits fully
  },
  selectedCategoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginTop: 10,
  },
  selectedCategoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  viewAllText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  productListContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  noProductsText: {
    padding: 10,
    color: "#999",
  },
  trendingProductsContainer: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productCardStyle: {
    width: 250,  // Increased width to fit the image properly
    height: 250,  // Adjusted height to ensure no image cropping
    margin: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
