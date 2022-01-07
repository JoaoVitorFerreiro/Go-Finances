import React, { useRef } from "react";
import { Modalize } from "react-native-modalize";

import { 
    Container,
    Title,
    ButtonsWrapper,
    Button,
    TicketText,
    Border,
    DeletButton,
    TextButton,
    Icon
} from './styles'

interface Props {
    name: string;
}
const modalizeRef = useRef<Modalize>(null);

export function ButtonDelet({ name } : Props){
    
    return(
        <>
        <Container
        ref={modalizeRef}
        snapPoint={250}
        >
            <Title>
                Você deseja deletar o{'\n'} 
                item {name}
            </Title>

            <ButtonsWrapper>
                <Button ><TicketText>Ainda não</TicketText></Button>
                <Button ><TicketText>Sim</TicketText></Button>
            </ButtonsWrapper>
            
            <Border/>

            <DeletButton>
                <Icon
                    name="trash-2"
                    size={18}
                />
                <TextButton>Deletar Boleto</TextButton>
            </DeletButton>
        </Container>
        </>
    )
}