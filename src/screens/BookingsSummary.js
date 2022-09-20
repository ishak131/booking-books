import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native';
import api from '../api';
import Loader from '../components/Loader';
import style from '../styles.json'


export default function BookingSummary({ }) {
    const [bookings, setBookings] = useState([])
    const [neededBooks, setNeededBooks] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [total, setTotal] = useState(0)
    React.useEffect(() => {
        setIsLoading(true)
        api.get('/booking/get_all').then((res) => {
            let bookings = res.data.books
            let updatableTotal = 0
            let updatableNeededBooks = { ...neededBooks }
            bookings.forEach(({ books }) => {
                books.forEach(({ _id, ...book }) => {
                    if (book.delivered)
                        return
                    if (updatableNeededBooks[_id]) {
                        updatableNeededBooks[_id].quantity += book.quantity
                    } else {
                        updatableNeededBooks[_id] = {
                            ...book
                        }
                    }
                    updatableTotal += (updatableNeededBooks[_id].subTotal)
                })
            })
            setNeededBooks(updatableNeededBooks)
            setTotal(updatableTotal)
            setIsLoading(false)
        }).catch((err) => {
            setIsLoading(false)
        })
    }, [])

    return (
        <ScrollView>
            <Loader isLoading={isLoading} />
            <View style={styles.container}>
                <Text style={styles.title}>الملخصات المطلوبة</Text>
                {Object.values(neededBooks).map(({ bookName
                    , quantity
                    , price
                    , course
                    , stage, _id }, index) =>
                    <View key={index + bookName + _id} style={styles.book} >
                        <Text style={styles.info} >{bookName} - {course} - {stage}</Text>
                        <View style={styles.bookData}>
                            <Text style={styles.data} >الاجمالي: {quantity * price}</Text>
                            <Text style={styles.data} >الكمية: {quantity}</Text>
                            <Text style={styles.data} >السعر: {price}</Text>
                        </View>
                    </View>
                )}
                <View style={styles.totals}>
                    <Text style={styles.info} >الاجمالي: {total}</Text>
                </View>
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
        gap: 4,
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    book: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: style.secondaryColor,
        paddingVertical: 5,
        paddingHorizontal: 15,
        width: '100%',
        marginVertical: 10,
    },
    bookData: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    },
    totals: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 5,
        width: '100%',
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: style.secondaryColor,

    },
    title: {
        fontWeight: '600',
        fontSize: 28,
        lineHeight: 34,
        color: "#143F6B",
        marginVertical: 20,
    },
    subTitle: {
        fontWeight: '600',
        fontSize: 24,
        color: "#143F6B",
    },
    info: {
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 34,
        color: "#143F6B",
    },
    data: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 34,
        color: "#143F6B",
    },

});
