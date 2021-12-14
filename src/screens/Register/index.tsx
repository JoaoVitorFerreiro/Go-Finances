import React, {useState} from "react";

import { useForm } from "react-hook-form";
import { 
    Keyboard, 
    Modal, 
    TouchableWithoutFeedback,
    Alert
} from 'react-native'

import uuid from 'react-native-uuid';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native' 

import { InputForm } from "../../components/Forms/InputForm";

import { Button } from "../../components/Forms/button";
import { TransactionButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
 } from './styles'

interface FormData {
    name: string;
    amount: string;
}

const Schema = Yup.object().shape({
    name: Yup
    .string()
    .required('Nome é obrigatorio'),
    amount: Yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
})

type NavigationProps = {
    navigate:(screen:string) => void;
 }
  

export function Register(){
    const dataKey = '@gofinances:transactions';

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);


    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const navigation = useNavigation<NavigationProps>();

    const { 
        control,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(Schema)
    });

    
    function handleTransactionsTypeSelect(type: 'positive' | 'negative'){
        setTransactionType(type);
    }

    function handleCloseSelectCategory () {
        setCategoryModalOpen(false);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    async function handleRegister( form : FormData){

        if(!transactionType)
            return Alert.alert('Selecione o tipo da Transação');
        

        if(category.key === 'category')
            return Alert.alert('Selecione a Categoria');


        const newTransaction ={
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                ...currentData,
                newTransaction
            ];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria',
            });

            navigation.navigate('Listagem');

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
    }
    
    return(

        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >

        <Container>
         
            <Header>
                <Title>Cadastro</Title>
            </Header>

    <Form>
        <Fields>
            <InputForm
                name="name"
                control={control}
                placeholder="Nome"
                autoCapitalize="sentences"
                autoCorrect={false}
                error = {errors.name && errors.name.message}
            />

            <InputForm
                name="amount"
                control={control}
                placeholder="Preço"
                keyboardType="numeric"
                error = {errors.amount && errors.amount.message}
            />

        <TransactionsTypes>
            <TransactionButton
                title="Entrada"
                type="up"
                onPress={() => handleTransactionsTypeSelect('positive')}
                isActive={transactionType === 'positive'}
            />
            
            <TransactionButton
                title="Saida"
                type = "down"
                onPress={() => handleTransactionsTypeSelect('negative')}
                isActive={transactionType === 'negative'}
            />
           </TransactionsTypes>

           <CategorySelectButton
                title={category.name}
                onPress={handleOpenSelectCategoryModal}
           />

        </Fields>

         <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
        />
        
    </Form>
       <Modal visible={categoryModalOpen}>
           <CategorySelect
                category={category}
                setCategory={setCategory}
                closeSelectCategory={handleCloseSelectCategory}
           />
       </Modal>
            </Container>
                </TouchableWithoutFeedback>
);}
