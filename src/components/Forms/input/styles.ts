import styled from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import { TextInput } from 'react-native';


export const Container = styled(TextInput)`
    width: 100%;
    padding: 16px 18px;

    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text_dark};

    background-color: ${({theme}) => theme.colors.shape};

    border-radius: 5px;
    margin-bottom: 8px;
`;

