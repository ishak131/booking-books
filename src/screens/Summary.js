import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native';
import style from '../styles.json'

export default function Summary({ route: { params } }) {
    const { customerName, phoneNumber, books = [], total
        , paid } = params
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>ملخص حجز الملخصات</Text>
                <Text style={styles.subTitle}>اسم العميل: {customerName}</Text>
                <Text style={styles.info}>رقم المحمول: {phoneNumber}</Text>
                {books.map(({ bookName
                    , quantity
                    , subTotal
                    , price
                    , course
                    , stage
                    , delivered,
                    _id }, index) =>
                    <View key={index + bookName + _id} style={styles.book} >
                        <View style={styles.head}>
                            <Text style={styles.info} >
                                {bookName} - {course} - {stage}
                            </Text>
                            {
                                delivered &&
                                <Text style={styles.badge}>
                                    {delivered && 'تم الاستلام'}
                                </Text>
                            }
                        </View>
                        <View style={styles.bookData}>
                            <Text style={styles.data} >الاجمالي: {subTotal}</Text>
                            <Text style={styles.data} >الكمية: {quantity}</Text>
                            <Text style={styles.data} >السعر: {price}</Text>
                        </View>
                    </View>
                )}
                <View style={styles.totals}>
                    <Text style={styles.info} >المتبقي: {parseFloat(total) - parseFloat(paid)}</Text>
                    <Text style={styles.info} >المدفوع: {paid}</Text>
                    <Text style={styles.info} >الاجمالي: {total}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    head: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
    },
    badge: {
        marginRight: 15,
        paddingVertical: 3,
        paddingHorizontal: 10,
        fontSize: 16,
        width: 85,
        alignSelf: 'flex-end',
        backgroundColor: style.accessColor,
        borderRadius: 10,
        color: '#fff',
    },

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
