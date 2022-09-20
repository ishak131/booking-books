import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Alert, Pressable } from 'react-native';
import style from '../styles.json'
import Button from '../components/Buttton';
import api from '../api'
import { ScrollView } from 'react-native';
import Loader from '../components/Loader';


function Card({
    customerName = "",
    phoneNumber = "",
    total = 0,
    paid = 0,
    navigate, navigateToSummary, _id, handleDelete, }) {

    return <Pressable onPress={navigateToSummary}>
        <View style={cardStyles.container}>
            <Text style={cardStyles.bookName}>اسم العميل: {customerName}</Text>
            <Text style={cardStyles.bookName}>{'الهاتف'}: {phoneNumber} </Text>
            <Text style={cardStyles.bookName}>المتبقي: {total - paid}</Text>
            <View style={cardStyles.options}>
                <Button onPress={() => handleDelete(_id)} size='small' color='secondaryColor' title={"حذف"}> </Button>
                <Button onPress={navigate} size='small' color='secondaryColor' title={"تعديل"}> </Button>
            </View>
        </View>
    </Pressable>
}

export default function AllBooks({ navigation }) {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleInquiry = (_id) => {
        Alert.alert(
            "حذف حجز",
            "هل تريد حذف هذا الحجز",
            [
                {
                    text: "نعم", onPress: () => handleDelete(_id)
                },
                {
                    text: "لا", onPress: () => { }
                },
            ]
        );
    }
    
    const handleDelete = async (_id) => {
        await api.delete('/booking/delete/' + _id).then(() => {
            let updateblaBooks = [...books].filter((book) => book._id !== _id)
            setBooks([...updateblaBooks])
            Alert.alert(
                "تم الحذف",
                "",
                [
                    {
                        text: "OK", onPress: () => { }
                    }
                ]
            );
        }).catch((err) => {
            Alert.alert(
                "خطأ",
                "لم يتم حذف الكتاب",
                [
                    {
                        text: "OK", onPress: () => { }
                    }
                ]
            );
        })
    }

    useEffect(() => {
        setIsLoading(true)
        api.get('/booking/get_all').then(res => {
            setBooks(res.data.books)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })
    }, [])

    return (
        <ScrollView>
            <Loader isLoading={isLoading} />
            <View style={styles.container}>
                <Text style={styles.title}>{'جميع الحجوزات'}</Text>
                {books.map((booking) =>
                    <Card
                        navigateToSummary={() => navigation.navigate('Booking Summary', { ...booking })}
                        navigate={() => navigation.navigate('Edit Booking', { ...booking })}
                        handleDelete={handleInquiry}
                        key={booking._id}
                        {...booking}
                    />)}
            </View>

        </ScrollView>
    )
}




const cardStyles = StyleSheet.create({
    container: {
        width: '95%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: style.primaryColor,
        borderRadius: 16,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 20,
    },
    bookName: {
        fontSize: 26,
        color: "#fff",
        textAlign: 'right'
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
        width: "95%",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 10,
    }
})
const styles = StyleSheet.create({
    loader: {
        height: "100%",
        width: "100%",
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    container: {
        flex: 1,
        alignItems: 'center',
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
