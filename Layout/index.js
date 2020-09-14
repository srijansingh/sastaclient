import React from 'react'
import Navbar from './AppBar';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function Layout(props) {
    return (
        <div className={styles.container}>
            <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            </Head>

            <Navbar category={props.category} /> 
            {props.children}
          
    
        </div>
    )
}
