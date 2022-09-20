import { Image, StyleSheet, View, Text } from 'react-native';
import style from '../styles.json'
import Input from '../components/Input';
import Button from '../components/Buttton';

export default function LogIn() {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Sign In</Text>
            <Input placeholder={'email'} label="E-Mail" iconName='mail' />
            <Input secureTextEntry={true} placeholder={'passowrd'} label="Password" iconName='lock' />
           
            <Button title="title" onPress={() => { }} />
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
