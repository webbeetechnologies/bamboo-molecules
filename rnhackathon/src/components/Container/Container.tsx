import { useComponentStyles } from 'bamboo-molecules';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

const Container = ({ children }: { children: React.ReactNode }) => {
    const ContainerStyle = useComponentStyles('Container');

    return (
        <SafeAreaView style={ContainerStyle.style}>
            <ScrollView contentContainerStyle={ContainerStyle.scrollViewStyle}>
                {children}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Container;
