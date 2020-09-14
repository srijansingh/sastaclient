import { Paper } from '@material-ui/core';
import React, { Component } from 'react'
import styles from "./details.module.css";

class ProductDeatils extends Component {
    constructor(){
        super();
        this.state = {
            imageIndex : 0
        }
    }
    render() {

        const imageList = this.props.images.map((images, index) => {
            return (
                <Paper elevation={1} className={this.state.imageIndex === index ? styles.smalls : styles.small} key={index} onMouseEnter={() => this.setState({imageIndex : index})}>
                    <img src={images} />
                </Paper>
            )
        })

        const color = this.props.colors.map((color, index) => {
            return (
                <span className={styles.color}>{color}</span>
            )
        })

        return (
            <div className={styles.container}>
               <div className={styles.images}>
                    <div className={styles.imagelist}>
                        {imageList}
                    </div>
                    <div className={styles.frames}>
                        <img src={this.props.images[this.state.imageIndex]} />
                    </div> 
                </div>
                <div className={styles.description}>
                    <div className={styles.lists}>
                        <div className={styles.title}>
                            {this.props.title}
                        </div>
                       
                        <div className={styles.rating}>
                            {this.props.rating} <i class="fa fa-star" style={{color:'white'}}></i>
                        </div>
                        <div className={styles.tag}>{this.props.mrp ? <span><i class="fa fa-rupee"></i>{this.props.mrp} </span>: 'Not Available'}</div>
                    </div>
                   
                    <div className={styles.lists}>
                        <div className={styles.head}>Product Details</div>
                            
                        <div className={styles.lists}>
                        <div className={styles.brand}>
                                    <span className={styles.span}><i class="fa fa-circle" style={{color:'#d94711', padding:'0 5px'}}></i>Product Category</span> <span className={styles.spans} style={{color:'#393939'}}>{this.props.category}</span>
                                </div>
                                <div className={styles.brand}>
                                    <span className={styles.span}><i class="fa fa-circle" style={{color:'#d94711', padding:'0 5px'}}></i>Product Model</span> <span className={styles.spans} style={{color:'#393939'}}>{this.props.model}</span>
                                </div>
                                <div className={styles.brand}>
                                    <span className={styles.span}><i class="fa fa-circle" style={{color:'#d94711', padding:'0 5px'}}></i>Product Comparable</span> <span className={styles.spans}>{this.props.comparable ? 'Comparable' : 'Not Comparable'}</span>
                                </div>
                        
                                <div className={styles.brand}>
                                    <span className={styles.span}><i class="fa fa-circle" style={{color:'#d94711', padding:'0 5px'}}></i>Product Availability</span> <span className={styles.spans}>{this.props.availabe ? 'Available' : 'Not Available'}</span>
                                </div>
                         </div>
                        
                    </div>

                    <div className={styles.list}>
                        <div className={styles.head}>Color Available</div>
                            
                        <div className={styles.lists}>
                            <div className={styles.colorlist}>
                               {color}
                            </div>
                         </div>
                        
                    </div>
                    {
                        this.props.mrp ?
                        <div className={styles.price}>
                                <div className={styles.best}>Max Price</div>
                                    
                            <div className={styles.tag}><i class="fa fa-rupee"></i>{this.props.mrp}</div>
                        </div>

                        :

                       ''
                            
                   
                    }
                    

                    


                    
                </div> 
            </div>
        )
    }
}


export default ProductDeatils;