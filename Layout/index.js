import React from 'react'
import Navbar from './AppBar';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function Layout(props) {
    return (
        <div className={styles.container}>
            <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <Navbar  /> 
            {props.children}
          
    
        </div>
    )
}
