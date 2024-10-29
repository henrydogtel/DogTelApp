'use client'

import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

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
    return (
        <Container>
            <Heading>Thank You for Your Payment!</Heading>
            <Paragraph>Your transaction has been completed successfully.</Paragraph>
            <Paragraph>We appreciate your business!</Paragraph>
            <Link href={'/home'}>Go to Home</Link>
        </Container>
    );
}
