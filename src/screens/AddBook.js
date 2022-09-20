import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native';
import style from '../styles.json'
import Input from '../components/Input';
import Button from '../components/Buttton';
import Options from '../components/Options'
import { stages } from '../select.json'
import { useState } from 'react';
import api from '../api'
import Loader from '../components/Loader';

export default function AddBook({ navigation }) {
    const [values, setValues] = useState({
        bookName: "",
        price: "",
        course: "",
        stage: ""
    })
    const [isLoading, setIsLoading] = useState(false)



    const handlSubmit = async () => {
        setIsLoading(true)
        await api.post('/book/create/', values).then((res) => {
            setIsLoading(false)
            Alert.alert(
                "اضافة ملخص",
                "تمت الاضافة بنجاح",
                [
                    {
                        text: "OK", onPress: () => {
                            navigation.navigate('Add Book')
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


    return (
        <View style={styles.container}>
            <Loader isLoading={isLoading} />
            <Text style={styles.title}>اضافة ملخص</Text>
            <Input setState={setValues} inputName="bookName" placeholder={'اسم الكتاب'} label="اسم الكتاب" iconName='book' />
            <Input setState={setValues} keyboardType='numeric' inputName="price" placeholder={'سعر الكتاب'} label="سعر الكتاب" iconName='book' />
            <Input setState={setValues} inputName="course" placeholder={'اسم المادة'} label="اسم المادة" iconName='book' />
            <Options setState={setValues} inputName="stage" options={stages} placeholder={'السنة الدراسية'} label="السنة الدراسية" iconName='book' />
            <Button title="اضافة ملخص" onPress={handlSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
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
