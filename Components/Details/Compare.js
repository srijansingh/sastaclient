import { Paper } from '@material-ui/core';
import React, { Component } from 'react'
import styles from "./compare.module.css";

export default class Compare extends Component {
    render() {
       
        return (
           
                <div elevation={3} className={styles.container}>
                    <div className={styles.logo}>
                        <img src={this.props.logo} />
                    </div>
                    <div className={styles.description}>
                        
                        <div className={styles.lists}>
                            <div className={styles.brand}>
                                <span className={styles.span}><i class="fa fa-circle" style={{color:'#d94711', padding:'0 5px'}}></i>COD</span> <span className={styles.spans}>{this.props.cod ? 'Yes' : 'No'}</span>
                            </div>
                    
                            <div className={styles.brand}>
                                <span className={styles.span}><i class="fa fa-circle" style={{color:'#d94711', padding:'0 5px'}}></i>EMI</span> <span className={styles.spans}>{this.props.emi ? 'Yes' : 'No'}</span>
                            </div>

                            <div className={styles.brand}>
        <span className={styles.span}><i class="fa fa-circle" style={{color:'#d94711', padding:'0 5px'}}></i>Delivery</span> <span className={styles.spans}>{this.props.delivery}</span>
                            </div>
                            {this.props.offer ? 
                            <div className={styles.brand}>
                                <span className={styles.span}><i class="fa fa-circle" style={{color:'#d94711', padding:'0 5px'}}></i>Offer</span> <span className={styles.spans}>{this.props.offer}</span>
                            </div>
                            : ''}
                         </div>
                         {
                            this.props.price ?

                            <div className={styles.price}>
                                <a href={this.props.url} target="_blank"><div className={styles.best}>Buy Now</div></a>
                                
                                <div className={styles.tag}>{this.props.price}</div>
                            </div>
                            :
                            <div className={styles.price}>
                                <div className={styles.bests}>Buy Now</div>
                                
                                <div className={styles.tags}>Not Available</div>
                            </div>
                        }
                         
                    </div>
                
            </div>
        )
    }
}
