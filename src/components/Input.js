import React from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { Icon } from '@rneui/themed';

export default function Input({ onChangeText, inputName = "", setState, placeholder, iconName, label, secureTextEntry = false, ...props }) {
    return (
        <View style={styles.inputView}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputAndIcon}>
                <Icon style={styles.searchIcon} name={iconName} size={20} color="#000" />
                <TextInput
                    {...props}
                    onChangeText={onChangeText ? onChangeText : (text) => {
                        setState((values) => {
                            values[inputName] = text
                            return values
                        })
                    }} secureTextEntry={secureTextEntry} style={styles.input} placeholder={placeholder} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        flexGrow: 1,
        fontSize: 16,
        color: "#143F6B",
        marginLeft: 19,
    },
    inputAndIcon: {
        flex: 1,
        boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.25)",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 16,
        width: 368,
        borderRadius: 10,
        height: 58,
        maxWidth: '90%',
    },
    searchIcon: {

    },
    label: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 20,
        color: "#143F6B",
        marginBottom: 6,
    }
    , inputView: {
        height: 84,
        marginBottom: 22,
    }
});
