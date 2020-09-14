import React, { Component } from 'react'
import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from "./product.module.css";


function ProductComponent(props){
   
        const router = useRouter()
    
        const handleSubmit =(id,cat) => {
        router.push({
            pathname: '/product',
            query: {
                id:id,
                category:cat 
            },
        })
        }
   

        let rating;
        if(props.rating === 0)
        {
            rating = ""
        }
        else{
            rating = props.rating;
        }
        return (
               
                    <div onClick={() => handleSubmit(props.id, props.category_name)}  elevation={2} className={styles.flatproduct}>
                    <div className={styles.flatimage}>
                        <img src={props.image} alt={props.title}/>
                    </div>
                    <div className={styles.flatdesc}>
                        <div className={styles.flatdetails}>
                            
                            <span className={styles.flattitle}>{props.title}</span>
                            <span className={styles.flatbrand}>{props.sub_category}</span>
                            <span className={styles.flatrating}>{rating}</span>
                        </div>
                        <div className={styles.flatbestbox}>
                            <div className={styles.flatbest}>
                                <span style={{fontWeight:'bold', fontSize:'1.2rem'}}> Best Price</span>
                                <span style={{fontWeight:'bold', fontSize:'1.4rem',color:'#d94711'}}>{props.price}</span>
                            </div>
                        </div>
                        </div>
                </div>
                 
                
            
        )
    
}

export default ProductComponent;