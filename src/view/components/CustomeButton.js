import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const CustomeButton = ({ navigation , onPress , title }) => {



    return (
        <View style={{
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            paddingVertical: 10,
        }}>

            <View style={{ height: 50 }}>
                <TouchableOpacity style={styles.btn}
                    onPress={onPress}>
                    <Text style={{ fontSize: 20, color: COLORS.pink }}>{title}</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default CustomeButton

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        height: 50,
        borderRadius: 4,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.pink,
        justifyContent: 'center',
        alignItems: 'center',
      },
})