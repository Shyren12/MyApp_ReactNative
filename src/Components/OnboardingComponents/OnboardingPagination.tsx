import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { onboardingPaginationParams } from '../../TypesCheck/OnboardingTypesCheck';
import OnboardingDots from './OnboardingDots';

type Props = {}

const OnboardingPagination = ({ item, x }: onboardingPaginationParams) => {
    return (
        <View style={sty.paginationContainer}>
            {item.map((_, index) => {
                return <OnboardingDots index={index} x={x} key={index} />;
            })}
        </View>
    )
}

export default OnboardingPagination

const sty = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    }
})