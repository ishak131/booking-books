import { StyleSheet, Text, View, Pressable } from 'react-native';
import style from '../styles.json'

export default function HomePage({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>مكتبة مريم وسارة</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Add Book')}>
                <Text style={styles.text}>اضافة ملخص</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Add Booking')}>
                <Text style={styles.text}> حجز ملخص</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('All Books')}>
                <Text style={styles.text}>جميع الملخصات</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('All Bookings')}>
                <Text style={styles.text}>جميع الحجوزات</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Bookings Summary')}>
                <Text style={styles.text}>كشف الحجوزات</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: style.primaryColor,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    logo: {
        marginTop: '80%'
    },
    title: {
        fontSize: 44,
        fontWeight: '500',
        textAlign: 'center',
        color: "#fff"
    },
    text: {
        fontSize: 24,
        lineHeight: 29,
        textAlign: 'center',
        color: "#fff"
    },
    button: {
        borderRadius: 15,
        maxWidth: 368,
        width: '90%',
        height: 68,
        padding: 20,
        backgroundColor: style.secondaryColor,
    }
});
