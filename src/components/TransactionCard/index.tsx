import React from "react";
import { categories } from "../../utils/categories";

import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
    Header,
    IconButton,
    IconClose
} from "./styles";


export interface TransactionCardProps {
    id: string;
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface Props {
    data: TransactionCardProps;
    onPress: () => void;
}



export function TransactionCard({data, onPress, ...rest} : Props){
    const [ category ] = categories.filter(
        item => item.key === data.category
    );


    return (
        <Container>
            <Header>
            <Title>{data.name}</Title>
                
            <IconButton 
             onPress={onPress}>
            <IconClose name={"trash-2"}/>
            </IconButton>
            </Header>
            <Amount type={data.type}>
                    {data.type === 'negative' && '- '}
                    {data.amount}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={category.icon}/>
                    <CategoryName>{category.name}</CategoryName>
                </Category>

                <Date>{data.date}</Date>

            </Footer>
        </Container>
    )
}
