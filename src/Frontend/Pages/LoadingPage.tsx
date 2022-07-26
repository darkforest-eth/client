import React from 'react';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../Components/LoadingSpinner';

export default function LoadingPage() {

  return <LoadingContainer style = {{fontSize: '3em'}}><LoadingSpinner initialText='Loading...'></LoadingSpinner></LoadingContainer>;
}


const LoadingContainer = styled.div`
height: 100%;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`