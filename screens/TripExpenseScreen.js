import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/emptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import BackButton from '../components/backButton'
import ExpenseCard from '../components/expenseCard'
import { expensesRef } from '../config/firebase'
import { getDocs, query, where } from 'firebase/firestore'

var items = [
    {
        id: 1,
        title: 'ate sandwich',
        amount: 4,
        category: 'food',
    },
    {
        id: 2,
        title: 'bought a jacket',
        amount: 50,
        category: 'shopping',
    },
    {
        id: 3,
        title: 'watched a moive',
        amount: 100,
        category: 'entertainment',
    },
]

export default function TripExpenseScreen(props) {
    const {id, place, country} = props.route.params;
    console.log('id in TripExpense: ', id);
    const navigation = useNavigation();
    const [expenses, setExpenses] = useState([]);
    const isFocused = useIsFocused();

    const fetchExpenses = async ()=> {
        const q = query(expensesRef, where('tripId', '==', id));
        let data = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            console.log('document: ',doc.data());
            data.push({...doc.data(), id: doc.id})
        })
        setExpenses(data);
    }

    useEffect(() => {
        if(isFocused)
            fetchExpenses();
    }, [isFocused])

  return (
    <ScreenWrapper className='flex-1'>
        <View className='px-4'>
            <View  className = 'relative mt-5'>
            <View className='absolute top-0 left-0 z-10'>
              <BackButton />
            </View>
            <View>
                <Text className={`${colors.heading} text-xl font-bold text-center z-0`}>{place}</Text>
                <Text className={`${colors.heading} text-xs text-center z-0`}>{country}</Text>
            </View>
            
            </View>
            <View className='flex-row justify-center items-center rounded-xl mb-4'>
            <Image source={require('../assets/images/7.png')} className='w-80 h-80' />
            </View>
            <View className='space-y-4'>
            <View className='flex-row justify-between items-center'>
                <Text className={`${colors.heading} font-bold text-xl`}>Expenses</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddExpense', {id, place, country})} className='p-2 px-3 bg-whith border border-gray-200 rounded-full'>
                    <Text className={`${colors.heading}`}>Add Expense</Text>
                </TouchableOpacity>
            </View>
            <View style={{height: 430}}>
                <FlatList 
                    data = {expenses}
                    ListEmptyComponent={<EmptyList message={"You haven't recorded any expenses yet"} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    className = 'mx-1'
                    renderItem={({item}) => {
                        return (
                            <ExpenseCard item={item}/>
                        )
                    }}
                />
            </View>
            </View>
        </View>
    </ScreenWrapper>
  )
}