import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../../global/styles/theme';

export const Container = styled.View`
    width: 100%;
`;


export const Error = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    margin: 7px;

    color: ${({theme}) => theme.colors.attention}
`;