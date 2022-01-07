import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons'
import { Modalize } from 'react-native-modalize';


export const Container = styled(Modalize)`
    flex: 1; 
    width: 100%;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;

    text-align: center;
    padding-top: 38px;
`;

export const ButtonsWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 24px;
`;

export const Button = styled(RectButton)`
    height: 55px;
    width: 155px;

    justify-content: center;
    align-items: center;

    border-radius: 5px;
`;

export const TicketText = styled.Text`
     font-family: ${({theme}) => theme.fonts.regular};
     font-size: ${RFValue(15)}px;
`;

export const Border = styled.View`
    height: 1px;
    border-width:1px;

    margin-top: 20px;

`;

export const DeletButton = styled(RectButton)`
    margin: 20px; 

    align-items: center;
    justify-content: center;

    flex-direction: row;
`;

export const TextButton = styled.Text`
    text-align: center;

    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;

    color: ${({theme}) => theme.colors.attention};
`; 

export const Icon = styled(Feather)`
    margin-right: 8px;

    color: ${({theme}) => theme.colors.attention};
`;
