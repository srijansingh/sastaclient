import React from 'react'
import { withStyles } from '@material-ui/core'
import Paper from "@material-ui/core/Paper";
import {useRouter} from 'next/router';

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


   
function CategoryComponent(props){


    const router = useRouter()
 
    const handleSubmit =(cat) => {
      router.push({
        pathname: '/category',
        query: {category:cat },
      })
    }

    return (
        
            <Paper onClick={() => handleSubmit(props.category)} elevation={3} style={{width:'300px',background:'#d94711', height:"80px", display:"flex", flexDirection:'row',borderRadius:'14px', justifyContent:'space-between', cursor:'pointer'}}>
                <div style={{width:'100%'}}>
                    <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'space-around',alignItems:'center'}}>
                            <div style={{fontSize:'1rem',fontWeight:'bold', color:'white'}}>{props.category}</div>
                            
                    </div>
                </div>

            </Paper>
    
    )
    
}


export default withStyles(styles, {withTheme:true})(CategoryComponent)