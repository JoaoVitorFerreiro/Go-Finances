import styled, {css} from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

import {RectButton} from 'react-native-gesture-handler'

import { Feather } from '@expo/vector-icons'

interface IconProps {
    type: 'up' | 'down';
}

interface ContainerProps {
    isActive: boolean;
    type: 'up' | 'down';
}

export const Container = styled.View<ContainerProps>`
    width: 48%;

    border-width: ${({isActive}) => isActive ? 0 : 1}px;
    border-style: solid;
    border-color: ${({theme}) => theme.colors.text} ;
    border-radius: 5px;

    ${({isActive, type}) => isActive && type === 'up' && css`
        background-color: 'rgba(18, 164, 84, 0.2)';
    `};

    
    ${({isActive, type}) => isActive && type === 'down' && css`
        background-color: 'rgba(232, 63, 91, 0.2)';
    `};
`;
export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;    
    padding: 16px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular}; ;
`;

export const Icon = styled(Feather)<IconProps>`
     font-size: ${RFValue(24)}px;

     margin-right: 12px;

    color: ${({theme, type}) => 
    type === 'up' ? theme.colors.success : theme.colors.attention
}
`;


