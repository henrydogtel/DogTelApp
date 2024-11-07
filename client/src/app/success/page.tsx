'use client'

import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation'; // Para redirigir si es necesario
import { UserContext } from '@/context/user';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f8ff;
    color: #333;
    text-align: center;
`;

const Heading = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 20px;
`;

const Paragraph = styled.p`
    font-size: 1.2rem;
    margin: 10px 0;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export default function Success() {
    const router = useRouter();
    const {appointmentPaidConfirm} = useContext(UserContext)
  
    useEffect(() => {
        // Asumimos que la URL contiene un parámetro de query que indica el estado del pago.
        const queryParams = new URLSearchParams(window.location.search);
        const paymentSuccess = queryParams.get('payment_success');
        const appointmentId = queryParams.get('appointment_id')
        console.log(appointmentId);
        
        async function addPayment(){
            try {
                const response = await appointmentPaidConfirm(appointmentId as string)
                if(!response) throw new Error('Hubo un error al obtener la respuesta')
                console.log(response);
            } catch (error) {
                throw error
            }
        }
        
        if (paymentSuccess === 'true' && appointmentId) {
            console.log('El pago fue exitoso!');
            addPayment()
        } else {
            console.log('El pago no fue exitoso.');
        }
    }, [router]);

    return (
        <Container>
            <Heading>Thank You for Your Payment!</Heading>
            <Paragraph>Your transaction has been completed successfully.</Paragraph>
            <Paragraph>We appreciate your business!</Paragraph>
            <Link href={'/dashboard'}>
                <Button>Go Back</Button>
            </Link>
        </Container>
    );
}
