import React, { useState } from 'react'
import { Dimensions, FlatList, Image, ImageBackground, StatusBar, StyleSheet, Text, TextComponent, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import Slides from "../../consts/Slides";
import COLORS from '../../consts/Colors';


const { width, height } = Dimensions.get("window");

const Slide = ({ item }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image source={require('../../assets/logo.png')} 
               style={{height:'15%', width, 
               resizeMode:'cover'}}
            />
            <Image source={item.image}
                style={{ height: '50%', width, resizeMode: 'contain' }}
            />
            <Text style={styles.title}>
                {item.title}
            </Text>
            <Text style={styles.subtitle}>
                {item.description}
            </Text>
        </View>
    )
}


const OnboardScreen = ({ navigation }) => {

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = React.useRef(null);

    const Footer = () => {
        return (
            <View style={{
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                height: height * 0.25,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                    {Slides.map((_, index) => (
                        <View key={index} style={[styles.indicator,
                        currentSlideIndex == index && {
                            backgroundColor: COLORS.white,
                            width: 25,
                        },
                        ]} />
                    ))
                    }
                </View>
                <View style={{ marginBottom: 20, }}>
                    {
                        currentSlideIndex == Slides.length - 1 ? (<View style={{ height: 50 }}>
                            <TouchableOpacity style={styles.btn} onPress={GetStarted}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', }}>Get Started</Text>
                            </TouchableOpacity>
                        </View>) : (
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={Skip}
                                    style={[styles.btn, { backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.pink }]}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.pink }}>Skip</Text>
                                </TouchableOpacity>
                                <View style={{ width: 15 }} />
                                <TouchableOpacity style={styles.btn} onPress={NextSlide}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', }}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }

                </View>
            </View>
        )
    }


    const UpdateCurrentSlidesIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        // console.log(contentOffsetX)
        const currentIndex = Math.round(contentOffsetX / width);
        // console.log(currentIndex)
        setCurrentSlideIndex(currentIndex)
    }
    const NextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != Slides.length) {
            const offset = nextSlideIndex * width;
            ref?.current?.scrollToOffset({ offset });
            setCurrentSlideIndex(nextSlideIndex);
        }
    };
    const Skip = () => {
        const lastSlideIndex = currentSlideIndex - 1;
        if (lastSlideIndex != Slides.length) {
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex);
        }
    };
    const GetStarted = () => {
        navigation.replace('SignUpScreen')
    }
    return (
        // <View style={styles.container}>
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.main} />
            <ImageBackground source={require('../../assets/background.png')} resizeMode="cover" style={styles.image}>
                <FlatList
                    ref={ref}
                    onMomentumScrollEnd={UpdateCurrentSlidesIndex}
                    pagingEnabled
                    data={Slides}
                    contentContainerStyle={{ height: height * 0.75 }}
                    horizontal showsHorizontalScrollIndicator={false} renderItem={({ item }) => <Slide item={item} />} />
                <Footer />
            </ImageBackground>
        </SafeAreaView>
        // </View>
    )
}

export default OnboardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        fontSize: 22,
        marginTop: 10,
        color: COLORS.black,
        fontWeight: 'black',
        textAlign: 'center',
    },
    subtitle: {
        color: COLORS.white,
        fontSize: 13,
        marginTop: 10,
        maxWidth: '70%',
        textAlign: 'center',
        lineHeight: 23,
    },
    indicator: {
        height: 2.5,
        width: 10,
        backgroundColor: 'grey',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    btn: {
        flex: 1,
        height: 50,
        borderRadius: 4,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    }
})