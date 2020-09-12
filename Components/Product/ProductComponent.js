import React, { Component } from 'react'
import Link from 'next/link';

import styles from "./product.module.css";


class ProductComponent extends Component {
   

    render() {

        let rating;
        if(this.props.rating === 0)
        {
            rating = ""
        }
        else{
            rating = this.props.rating;
        }
        return (
            
                <div  elevation={2} className={styles.flatproduct}>
                    <div className={styles.flatimage}>
                        <img src={this.props.image} alt={this.props.title}/>
                    </div>
                    <div className={styles.flatdesc}>
                        <div className={styles.flatdetails}>
                            
                            <span className={styles.flattitle}>{this.props.title}</span>
                            <span className={styles.flatbrand}>{this.props.sub_category}</span>
                            <span className={styles.flatrating}>{rating}</span>
                        </div>
                        <div className={styles.flatbestbox}>
                            <div className={styles.flatbest}>
                                <span style={{fontWeight:'bold', fontSize:'1.2rem'}}> Best Price</span>
                                <span style={{fontWeight:'bold', fontSize:'1.4rem',color:'#d94711'}}>{this.props.price}</span>
                            </div>
                        </div>
                        </div>
                </div>
            
        )
    }
}

export default ProductComponent;