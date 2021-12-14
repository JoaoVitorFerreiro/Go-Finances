import React, { useState, useEffect,useCallback } from "react";
import { ActivityIndicator } from 'react-native';
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard,TransactionCardProps } from "../../components/TransactionCard";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

import theme from "../../global/styles/theme";

import { 
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer
 } from './styles'


 export interface DataListProps extends TransactionCardProps {
     id: string;
 }

 interface HighlightProps {
     amount: string;
     lastTransaction: string;
 }

 interface highlightData {
     entries: HighlightProps,
     expensive : HighlightProps,
     total: HighlightProps
 }

export function Dashboard(){
   const dataKey = '@gofinances:transactions';
   const [isLoading, setIsLoading] = useState(true)
   const [transactions, setTransactions] = useState<DataListProps[]>([]);
   const [highlightData, setHighlightData] = useState<highlightData>({} as highlightData)
   

    function getLastTransactionDate(
        collection: DataListProps[], 
        type: 'positive' | 'negative'
        ){

        const lastTransaction = new Date(
        Math.max.apply(Math, collection
            .filter(transaction => transaction.type === type)
            .map(transaction => new Date(transaction.date).getTime())))
            
        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(`pt-BR`, {month: 'long'})}`;
    }



   async function loadTransaction(){
       const response = await AsyncStorage.getItem(dataKey);
       const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;
        
        const transactionsFormatted: DataListProps[] = transactions
        
        .map((item: DataListProps) => {

            if(item.type === 'positive'){
                entriesTotal += Number(item.amount);
            } else {
                expensiveTotal += Number(item.amount);
            }


            const amount = Number(item.amount)
            .toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
        });
        
        setTransactions(transactionsFormatted);

        const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransactionsExpensives = getLastTransactionDate(transactions, 'negative');
        const totalInterval =  `01 a ${lastTransactionsExpensives}`


        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionsEntries}`,
            },

            expensive: {
                amount: expensiveTotal.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última saída dia ${lastTransactionsExpensives}`,
            },

            total : { 
                amount: total.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL',
            }),
            lastTransaction: totalInterval,
        },
        })

        setIsLoading(false);
   }

   useEffect(() => {
        loadTransaction();
   },[]);

   useFocusEffect(useCallback(()=> {
        loadTransaction();
   },[]));

    return(
        <Container>
            {
            isLoading ? 
            <LoadContainer>
                <ActivityIndicator 
                    color={theme.colors.primary}
                    size="large"
                /> 
            </LoadContainer> : 
            
                <>
                <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo 
                            source={require('../../images/Perfil.jpg')}
                        />
                        
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>João</UserName>
                        </User>
                    </UserInfo>

                <LogoutButton onPress={() => {}}>
                        <Icon name="power"/>
                </LogoutButton>
                    

                    </UserWrapper>
                </Header>  

                <HighlightCards
                
                >
                    <HighlightCard
                        type='up'
                        title="entrada"
                        amount={highlightData.entries.amount}
                        lastTransaction={highlightData.entries.lastTransaction}
                    />

                    <HighlightCard
                    type='down'
                    title="Saídas"
                    amount={highlightData.expensive.amount}
                    lastTransaction={highlightData.expensive.lastTransaction}
                    />

                    <HighlightCard
                        type='total'
                        title="Total"
                        amount={highlightData.total.amount}
                        lastTransaction={highlightData.total.lastTransaction}
                    />

                </HighlightCards>
        
        <Transactions>
            <Title>Listagem</Title>
            
        
            <TransactionList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({item}) => <TransactionCard data={item}/>}
            /> 
        </Transactions>
        </>
}
        </Container>
    )
}
