import { View, ViewToken } from "react-native";
import React, { useState, useCallback } from "react";
import { RootStackScreenProps } from "../Navigation/RootNavigator";
import { OnboardingPrograms } from "../TypesCheck/OnboardingTypesCheck";
import { OnboardingData } from "../Data/MyAppData";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import OnboardingItems from "../Components/OnboardingComponents/OnboardingItems";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import OnboardingButton from "../Components/OnboardingComponents/OnboardingButton";
import OnboardingPagination from "../Components/OnboardingComponents/OnboardingPagination";

type Props = {}
const OnboardingScreen = ({ navigation, route }: RootStackScreenProps<"OnboardingScreen">) => {
  const [onboardingItems, setOnboardingItems] = useState<OnboardingPrograms[]>(OnboardingData);
  const flatListRef = useAnimatedRef<FlatList<OnboardingPrograms>>(); 
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    }
  });

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0]?.index !== undefined) { 
      flatListIndex.value = viewableItems[0].index ?? 0;
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScrollHandler}
        data={onboardingItems}
        renderItem={({ item, index }) => (
          <OnboardingItems item={item} index={index} x={x} />
        )}
        keyExtractor={item => item._id}
        scrollEventThrottle={17}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 30,
          paddingVertical: 30
        }}
      >
        <OnboardingPagination item={onboardingItems} x={x} />

        <OnboardingButton
          x={x}
          itemLength={onboardingItems.length}
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
        />

      </View>
    </View>
  );
};

export default OnboardingScreen
