import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/screens/HomePage';
import AddBook from './src/screens/AddBook';
// import Learning from './src/views/learning';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import LogIn from './src/screens/LogIn';
import AllBooks from './src/screens/AllBooks';
import EditBook from './src/screens/EditBook';
import AddBooking from './src/screens/AddBooking';
// import SearchableSelect from './src/components/SearchableSelect';
import AllBookings from './src/screens/AllBookings';
import Summary from './src/screens/Summary';
import api from './src/api';
import BookingSummary from './src/screens/BookingsSummary';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    api.get('/').then((res) => { console.log(res.data) }).catch((err) => { })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="test"
          component={SearchableSelect}
        /> */}
        <Stack.Screen
          name="home"
          component={HomePage}
        />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name={"Add Book"} component={AddBook} />
        <Stack.Screen name={"Add Booking"} component={AddBooking} />
        <Stack.Screen name={"Edit Booking"} component={AddBooking} />
        <Stack.Screen name={"Edit Book"} component={EditBook} />
        <Stack.Screen name={"All Books"} component={AllBooks} />
        <Stack.Screen name={"All Bookings"} component={AllBookings} />
        <Stack.Screen name={"Booking Summary"} component={Summary} />
        <Stack.Screen name={"Bookings Summary"} component={BookingSummary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
