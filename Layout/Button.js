import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import Paper from "@material-ui/core/Paper";
import Link from "next/link";

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        }
    }});

class ButtonComponent extends Component {
    render() {
        return (
            
        <Link target="_blank" href={"?page="+ this.props.link}>
            <a>
            <Paper elevation={3} style={{width:'120px',background:'#d94711', height:"50px", display:"flex", flexDirection:'row',borderRadius:'14px', justifyContent:'space-between'}}>
                <div style={{width:'100%'}}>
                    <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'space-around',alignItems:'center'}}>
                            <div style={{fontSize:'1rem',fontWeight:'bold', color:'white'}}>{this.props.name}</div>
                            
                    </div>
                </div>
            
            </Paper>
            </a>
        </Link>
       
        )
    }
}


export default withStyles(styles, {withTheme:true})(ButtonComponent)

