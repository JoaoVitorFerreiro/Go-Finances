import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/img/apple.svg';
import GoogleSvg from '../../assets/img/google.svg';
import LogoSvg from '../../assets/img/logo.svg';

import { SignInSocialButton } from "../../components/SignInSocialButton";

import { useAuth } from '../../hooks/auth'

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from "./styles"



export function SignIn(){ 
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithGoogle, signInWithApple } = useAuth();
    const theme = useTheme();

    async function handleSignInWithGoogle(){
        try {
            setIsLoading(true);
            return await signInWithGoogle();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possivel conectar a conta Google');
            setIsLoading(false);
        } 
        
    }

    async function handleSignInWithApple(){
        try {
            setIsLoading(true);
            return await signInWithApple();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possivel conectar a conta Apple');
            setIsLoading(false);
        }
        
    }

    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                <Title>
                    Controle suas {'\n'}
                    finanças de forma {'\n'}
                    muito simples {'\n'}
                </Title>
                </TitleWrapper>


                <SignInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    {
                        <SignInSocialButton
                        title="Entrar com Apple"
                        svg={AppleSvg}
                        onPress={handleSignInWithApple}
                    />
                    }
                   

                </FooterWrapper>
                { isLoading && 
                    <ActivityIndicator 
                        color={ theme.colors.shape }
                        style={{ marginTop:18 }}
                    />}
            </Footer>
        </Container>
);
}
