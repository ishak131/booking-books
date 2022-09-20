import { StyleSheet, View, Text, Alert, ScrollView, TextInput } from 'react-native';
import style from '../styles.json'
import Input from '../components/Input';
import Button from '../components/Buttton';
import { useEffect, useState } from 'react';
import api from '../api'
import Loader from '../components/Loader';
import SearchableSelect from '../components/SearchableSelect';
import CheckBox from 'expo-checkbox';

function Card({ quantity: initialQuantity = 0, delivered: initialDelivered, calcRemainingAndTotal, booksSubmitableDetails = {}, setBooksSubmitableDetails, _id, bookName = "سلاح التلميذ", handleDelete, stage = "الصف السادس الابتدائي", price = 108, course = 'رياضيا' }) {

    const [quantity, setQuantity] = useState(0)
    const [delivered, setDelivered] = useState(false)

    useEffect(
        () => {
            let subTotal = (quantity * price)
            let oldSubTotal = booksSubmitableDetails[_id].subTotal
            calcRemainingAndTotal(oldSubTotal, subTotal)
            let updateblaBooksSubmitableDetails = { ...booksSubmitableDetails }
            updateblaBooksSubmitableDetails[_id].quantity = quantity
            updateblaBooksSubmitableDetails[_id].subTotal = subTotal
            setBooksSubmitableDetails(updateblaBooksSubmitableDetails)
        },
        [quantity],
    )

    useEffect(() => {
        let updateblaBooksSubmitableDetails = { ...booksSubmitableDetails }
        updateblaBooksSubmitableDetails[_id].delivered = delivered
        setBooksSubmitableDetails(updateblaBooksSubmitableDetails)
    }, [delivered])

    useEffect(() => {
        setQuantity(initialQuantity)
        setDelivered(initialDelivered)
    }, [])

    let deliveredStyle = () => {
        return delivered ? {
            justifyContent: 'space-between',
            textDecorationLine: 'line-through', textDecorationStyle: 'solid'
        } : {}
    }

    return <View style={cardStyles.container}>
        <Text style={{ ...cardStyles.bookName, ...deliveredStyle() }}>كتاب {bookName} {course}</Text>
        <View>
            <Text style={cardStyles.small}>{stage}</Text>
            <CheckBox
                value={delivered}
                onValueChange={setDelivered}
                color={delivered ? style.accessColor : style.secondaryColor}
                style={cardStyles.checkBox}
            />
        </View>

        <View style={cardStyles.options} >
            <Text style={cardStyles.small}>{price} {' جنيه'} </Text>
            <Text style={cardStyles.small}>*</Text>
            <TextInput defaultValue={quantity.toString()} onChangeText={(number) => setQuantity((number))} keyboardType='numeric' style={cardStyles.input}></TextInput>
            <Text style={cardStyles.small}>{'العدد: '}</Text>
        </View>
        <Text style={cardStyles.small}>{'الاجمالي'}: {price * quantity} {'جنيه'} </Text>
        <View style={cardStyles.options}>
            {/* <Button onPress={navigate} size='small' color='secondaryColor' title={"تعديل"}> </Button> */}
            <Button onPress={() => handleDelete(_id)} size='small' color='secondaryColor' title={"حذف"}> </Button>
        </View>
    </View>
}

export default function AddBooking({ navigation, route: { params } }) {
    const [values, setValues] = useState({
        customerName: "",
        phoneNumber: "",
    })
    const [books, setBooks] = useState([])
    const [bookedBooks, setBookedBooks] = useState([])
    const [total, setTotal] = useState(0)
    const [paid, setPaid] = useState(0)
    const [remaining, setRemaining] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [booksSubmitableDetails, setBooksSubmitableDetails] = useState({})
    const addBook = (book) => {
        let updateblaBooks = [...bookedBooks].filter(({ _id }) => book._id === _id)
        if (updateblaBooks.length > 0) {
            return
        }
        setBookedBooks((oldBooks) => [...oldBooks, book])
        let updateblaBooksSubmitableDetails = { ...booksSubmitableDetails }
        updateblaBooksSubmitableDetails[book._id] = {
            ...book,
            quantity: 0,
            subTotal: 0,
        }
        setBooksSubmitableDetails(updateblaBooksSubmitableDetails)
    }
    const calcRemainingAndTotal = (oldSubTotal, newSubTotal) => {
        let sum = newSubTotal - oldSubTotal
        setTotal((value) => value + sum)
    }
    const handleSubmit = async () => {
        await params ? handleUpdateBooking() : handleAddBooking()
    }
    const handleAddBooking = async () => {
        setIsLoading(true)
        let booksData = Object.values(booksSubmitableDetails)
        await api.post('/booking/create/', { ...values, paid, total, books: booksData }).then((res) => {
            setIsLoading(false)
            Alert.alert(
                "اضافة ملخص",
                "تمت الاضافة بنجاح",
                [
                    {
                        text: "OK", onPress: () => {
                            navigation.navigate('home')
                        }
                    }
                ]
            );
        }).catch((err) => {
            setIsLoading(false)
            Alert.alert(
                "خطأ اثناء الاضافة",
                "الرجاء التحقق من صحة المدخلات",
                [
                    {
                        text: "OK", onPress: () => { }
                    }
                ]
            );
        })
    }

    const handleUpdateBooking = async () => {
        setIsLoading(true)
        let booksData = Object.values(booksSubmitableDetails)
        await api.put('/booking/update/', { ...values, _id: params._id, paid, total, books: booksData }).then((res) => {
            setIsLoading(false)
            Alert.alert(
                "تعديل ملخص",
                "تم التعديل بنجاح",
                [
                    {
                        text: "OK", onPress: () => {
                            navigation.navigate('home')
                        }
                    }
                ]
            );
        }).catch((err) => {
            setIsLoading(false)
            Alert.alert(
                "خطأ اثناء التعديل",
                "الرجاء التحقق من صحة المدخلات",
                [
                    {
                        text: "OK", onPress: () => { }
                    }
                ]
            );
        })
    }

    const handleInquiry = (_id) => {
        Alert.alert(
            "حذف كتاب",
            "هل تريد حذف هذا الكتاب",
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
        setTotal(value => (value - booksSubmitableDetails[_id].subTotal))
        let updateblaBooks = [...bookedBooks].filter((book) => book._id !== _id)
        setBookedBooks([...updateblaBooks])
    }

    useEffect(() => {
        setIsLoading(true)
        api.get('/book/get_all/').then((res) => {
            setBooks(res.data.books);
            setIsLoading(false)
        }).catch((err) => {
            Alert.alert(
                "خطأ",
                "الرجاء المحاولة مرة اخري",
                [
                    {
                        text: "OK", onPress: () => {
                            navigation.navigate('home')
                        }
                    }
                ]
            )
        })
        if (params) {
            const {
                customerName,
                phoneNumber,
                books: initialBookedBooks,
                paid,
                total: oldTotal
            } = params
            setValues({
                customerName,
                phoneNumber,
            })
            let updateblaBooks = {}
            initialBookedBooks.forEach(book => {
                updateblaBooks[book._id] = book
                // addBook(book)
            });
            setBooksSubmitableDetails(updateblaBooks)
            setBookedBooks([...initialBookedBooks])
            setPaid(parseFloat(paid))
            setTotal(parseFloat(oldTotal))
        }
    }, [])

    useEffect(() => {
        setRemaining(total - paid)
    }, [
        total, paid
    ])

    return (
        <ScrollView>
            <View style={styles.container}>
                <Loader isLoading={isLoading} />
                <Text style={styles.title}>{params ? 'تعديل الحجز' : "اضافة حجز"}</Text>
                <Input setState={setValues} defaultValue={values.customerName} inputName="customerName" placeholder={'اسم العميل'} label="اسم العميل" iconName='book' />
                <Input setState={setValues} defaultValue={values.phoneNumber} inputName="phoneNumber" placeholder={'رقم المحمول'} label="رقم المحمول" iconName='book' keyboardType='phone-pad' />
                <Input onChangeText={(value) => setPaid(value)} defaultValue={paid.toString()} keyboardType='numeric' inputName="paid" placeholder={'المدفوع'} label="المدفوع" iconName='book' />
                <SearchableSelect
                    inputProps={
                        {
                            placeholder: 'ابحث عن الملخص بالاسم',
                            label: "اسم الملخص",
                            iconName: 'book'
                        }
                    } onPress={addBook} data={books} searchKey={'bookName'} />
                {bookedBooks.map((item, index) => {
                    return <Card
                        calcRemainingAndTotal={calcRemainingAndTotal}
                        booksSubmitableDetails={booksSubmitableDetails}
                        setBooksSubmitableDetails={setBooksSubmitableDetails}
                        key={item._id + index} {...item} handleDelete={handleInquiry} />
                })}
                <Text style={styles.title}>{'الاجمالي'} : {total}</Text>
                <Text style={styles.title}>{'الباقي'} : {remaining}</Text>
                <Button title={params ? 'تعديل الحجز' : "اضافة حجز"} onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
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
    small: {
        fontSize: 16,
        color: "#fff",
        textAlign: 'right'
    },
    bookName: {
        marginBottom: 10,
        fontSize: 20,
        color: "#fff",
        textAlign: 'right',
        width: '100%',
        display: 'flex',
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
        width: "95%",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 10,
    }
    , input: {
        backgroundColor: "#ccc",
        // flexGrow: 1,
        width: 50,
        height: 30,
        paddingVertical: 0,
        paddingHorizontal: 5,
    }
    , checkBox: {
        left: 10,
        position: 'absolute',

        // padding: 0,
        // height: 20,

        // backgroundColor: style.primaryColor,
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 20,

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
