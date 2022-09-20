import { StyleSheet, View, Text } from 'react-native';
import style from '../styles.json'
import Input from '../components/Input';
import { useEffect, useState } from 'react';

export default function SearchableSelect({ DisplayElement,
    onPress,
    data = ['option', 'qwe', 'asd', 'zxc', 'fffqw'],
    searchKey,
    inputProps = { inputName: "phoneNumber", placeholder: 'full name', label: "full name", iconName: 'book', keyboardType: '' } }) {

    const [dataState, setDataState] = useState([])
    const [searchKeyInput, setSearchKeyInput] = useState('')

    useEffect(() => {
        setDataState([...data])
    }, [data])

    const search = (searchableItem) => {
        searchKey && (searchableItem = searchableItem[searchKey]);
        let searchKeyWord = searchKeyInput
        searchKeyWord = searchKeyWord.toLocaleLowerCase()
        searchableItem.toLocaleLowerCase()
        return (searchKeyWord.includes(searchableItem) || searchableItem.includes(searchKeyWord) || searchableItem === searchKeyWord) && searchKeyInput !== ''
    }

    const handleSelectingAnOption = (item) => {
        onPress && onPress(item)
        setSearchKeyInput('')
    }

    return (
        <View style={styles.container}>
            <Input
                onChangeText={(text) => setSearchKeyInput(text)}
                {...inputProps} />
            <View style={styles.options}>
                {[...dataState]
                    .filter((item) => search(item))
                    .map((item, index) =>
                        DisplayElement
                            ? <DisplayElement key={index} {...item} />
                            : <Text key={index + item} onPress={() => handleSelectingAnOption(item)} style={styles.option}>{searchKey ? item.bookName + " - " + item.course + " - " + item.stage : item}</Text>)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 20,
        paddingHorizontal: '5%',
        zIndex: 1,

    },
    options: {
        position: 'absolute',
        width: '100%',
        marginTop: 86,
        zIndex: 10000,
    },
    option: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 16,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        borderRadius: 10,
        backgroundColor: '#aaaaaa',

    },
    title: {
        fontWeight: '600',
        fontSize: 28,
        lineHeight: 34,
        color: "#143F6B",
        marginVertical: 32,
    },
    text: {
        fontSize: 24,
        lineHeight: 29,
        textAlign: 'center',
        color: style.primaryColor
    },
    button: {
        borderRadius: 15,
        marginTop: 'auto',
        marginBottom: 95,
        maxWidth: 368,
        width: '90%',
        padding: 20,
        marginHorizontal: 12,
        backgroundColor: style.secondaryColor,
    },
});
