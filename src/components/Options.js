import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Icon } from '@rneui/themed';
import SelectDropdown from 'react-native-select-dropdown'
import style from '../styles.json'

export default function Options({ inputName = "", setState, options, placeholder, iconName, label, onSelect, ...props }) {
    return (
        <View style={styles.inputView}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputAndIcon}>
                <Icon style={styles.searchIcon} name={iconName} size={20} color="#000" />
                <SelectDropdown
                    {...props}
                    data={options}
                    buttonStyle={styles.options}
                    dropdownStyle={styles.options_dropdown}
                    selectedRowTextStyle={{
                        color: "#ffffff"
                    }}
                    selectedRowStyle={{
                        backgroundColor: style.primaryColor
                    }}
                    defaultButtonText={placeholder}
                    defaultValue={2}
                    onSelect={onSelect ? onSelect : (selectedItem, index) => {
                        setState((values) => {
                            values[inputName] = selectedItem
                            return values
                        })
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {

                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    options_dropdown: {
        borderRadius: 10,
    },
    options: {
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
