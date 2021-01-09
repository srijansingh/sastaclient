import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import {useRouter} from 'next/router';


import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';




import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home'
import { ExitToApp } from '@material-ui/icons';



function NestedListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  grow: {
    width:'100%',
    flexGrow: 1,
    justifyContent:'space-between'
  },
  toolbar:{
    width:'100%',
    flexGrow: 1,
    justifyContent:'space-between'
  },
  menu:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titles: {
    width:'120px',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    padding:' 0 3px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-vetween',
    alignItems:'center',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    textTransform:'capitalize',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '75vh',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  logo:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
    alignItems:'center',
    height:'150px',
    marginBottom:'20px'
  },
  title:{
    fontSize:'1.5rem',
    fontWeight:'bold',
    color:'#d94711'
  },

  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 220,
      borderColor:'red',
      color:'red'
    }},
    button:{
      width:'100%',
      display:'flex',
      flexDirection:'column',
      height:'100px',
      alignItems:'center',
      justifyContent:'space-around',
    }
}));


const preventDefault = f => e => {
  e.preventDefault()
  f(e)
}


export default function Navbar(props) {

  const classes = useStyles();

  
  const router = useRouter()
   const [query, setQuery] = useState('')
   

   const handleParam = setValue => e => setValue(e.target.value)

   const handleSubmit = preventDefault(() => {
     router.push({
       pathname: '/category',
       query: {category: query},
     })
   })

  

  const [left, setLeft] = useState(false);
  const toggleDrawer = (event) => {
    setLeft( event );
  };



  const [modal, setModal] = React.useState(false);
  const [isSignup, setIsSignup] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setIsSignup(false)
    setModal(true);
    setLeft( false );
  };

  const handleClose = () => {
    setModal(false);
    setIsSignup(false)
  };

  const handleOpenSignup = () => {
    setModal(false);
    setIsSignup(true)
  }


  //Authentication
  const [email, setEmail] =useState('');
  const [password, setPassword] =useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('')
  const [isAuth, setIsAuth] =useState(false);
  const [authLoading, setIsAuthLoading] =useState(false);
  const [error, setError] = useState(false)

useEffect(() => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const expiryDate = localStorage.getItem('expiryDate')

  if(!token & !userId & !name){
    setIsAuth(false);
    return;
  }

  if (new Date(expiryDate) <= new Date()) {
    logoutHandler();
    return;
  }

  setUserId(userId);
  setName(name);
  setEmail(email);
  setIsAuth(true);



})


const login = () => {
    
    setIsAuthLoading(true)

    fetch('https://server.mysastaprice.tk/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:email,
        password: password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then(resData => {
        setIsAuth(true);
        setToken(resData.token);
        setIsAuthLoading(false);
        setUserId(resData.userId);

        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        localStorage.setItem('email', resData.email);
        localStorage.setItem('name', resData.name);
        const remainingMilliseconds = 60 * 60 * 24000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
        setModal(false)
        setIsSignup(false)
      })
      .catch(err => {
        setError('OOPS! something went wrong')
        setIsAuth(false);
        setIsAuthLoading(false);
      });
}



const signup = () => {

  setIsAuthLoading(true)

  fetch('https://server.mysastaprice.tk/user/signup', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email:email,
      password: password,
      name:name
    })
  })
    .then(res => {
      if (res.status === 422) {
        throw new Error('Validation failed.');
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log('Error!');
        throw new Error('Could not authenticate you!');
      }
      return res.json();
    })
    .then(resData => {
      console.log(resData);
      setIsAuth(true);
      setToken(resData.token);
      setIsAuthLoading(false);
      setUserId(resData.userId);

      localStorage.setItem('token', resData.token);
      localStorage.setItem('userId', resData.userId);
      localStorage.setItem('email', resData.email);
      localStorage.setItem('name', resData.name);
      const remainingMilliseconds = 60 * 60 * 24000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      setAutoLogout(remainingMilliseconds);
      setModal(false)
      setIsSignup(false)

    })
    .catch(err => {
      console.log(err);
      setError('OOPS! something went wrong')
      setIsAuth(false);
      setIsAuthLoading(false);
    });
}


const setAutoLogout = milliseconds => {
  setTimeout(() => {
    this.logoutHandler();
  }, milliseconds);
};

const logoutHandler = () => {
  setIsAuth(false)
  setToken('');
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
  localStorage.removeItem('user');
  
};



  return (
    <div>
    <div className={classes.grow}>
      <AppBar position="fixed" style={{background:'#d94711', width:'100%'}}>
        <Toolbar className={classes.toolbar}>
         
         <div className={classes.menu}>
         <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
         <a href="/">
         <Typography className={classes.titles} variant="h6">
            Mysastaprice
          </Typography>
         </a>
         </div>
          <form action="/category" className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={props.category ? props.category : 'Search ....'}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              name='category'
              value={query}
              onChange={handleParam(setQuery)}
            />
           <Button onClick={handleSubmit} size="small" style={{background:'#d94711', color:'white'}}>Search</Button>
          </form>
          
         
          <div className={classes.sectionDesktop}>
           
          </div>
        </Toolbar>
      </AppBar>
      
    </div>
      <Drawer  open={left} onClose={() => toggleDrawer(false)}>

            <List className={classes.list}>
              <a href="/">
              <div className={classes.logo}>
                <img src="/logo.png" height="100px"/>
            <Typography className={classes.title}>{ isAuth ? name : 'MySastaPrice'}</Typography>
              </div>
              </a>
              <Divider />
              <NestedListItemLink key="7" className={classes.nested} href="/">
                  <ListItemIcon>
                      <HomeIcon style={{color:'#d94711'}}/>
                      </ListItemIcon>
                      <ListItemText primary="Home" />
              </NestedListItemLink>
              {
                isAuth ?
               <ListItem button onClick={logoutHandler}>
                  <ListItemIcon><ExitToApp style={{color:'#d94711'}}/></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem> 
                :
                <ListItem button onClick={handleClickOpen}>
                  <ListItemIcon><AccountCircle style={{color:'#d94711'}}/></ListItemIcon>
                  <ListItemText primary="My Account" />
                </ListItem> 
              }

              
            </List>
      </Drawer>


      <Dialog
        open={modal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle style={{textAlign:'center'}} id="responsive-dialog-title">{"Login Here"}</DialogTitle>
        <DialogContent style={{maxWidth:'350px', display:'flex', flexDirection:'column', justifyContent:'space-around',alignItems:'center'}}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={1} alignItems="flex-end">
            
            <Grid item>
              <TextField style={{color:'#d94711'}} id="input-with-icon-grid" label="Email" onChange={(event)=> setEmail(event.target.value)} />
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
           
            <Grid item>
              <TextField  type="password" id="input-with-icon-grid" label="Password" onChange={(event)=> setPassword(event.target.value)} />
            </Grid>
          </Grid>
        </form>
        
        </DialogContent>
          <div className={classes.button}>

            {
              authLoading ? 

              <Button disabled variant="contained"  style={{background:'#d94711', color:'white'}} autoFocus>
                  Login
                </Button>
                :
                <Button onClick={login} variant="contained"  style={{background:'#d94711', color:'white'}} autoFocus>
                  Login
                </Button>
          }     

                <Button onClick={handleOpenSignup}   style={{color:'#d94711'}}>
                  Switch to Signup
                </Button>
                
                {
                  error ? <Typography style={{color:'red', fontSize:'0.8rem'}}>{error}</Typography> : ''
                }
          </div>
      </Dialog>


      <Dialog
        open={isSignup}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle style={{textAlign:'center'}} id="responsive-dialog-title">{"Signup Here"}</DialogTitle>
        <DialogContent style={{maxWidth:'350px', display:'flex', flexDirection:'column', justifyContent:'space-around',alignItems:'center'}}>
        <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={1} alignItems="flex-end">
            
            <Grid item>
              <TextField style={{color:'#d94711'}} type="text" id="input-with-icon-grid" label="Enter Name" onChange={(event)=> setName(event.target.value)}/>
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
            
            <Grid item>
              <TextField style={{color:'#d94711'}} id="input-with-icon-grid" label="Enter Email" onChange={(event)=> setEmail(event.target.value)} />
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
           
            <Grid item>
              <TextField  type="password" id="input-with-icon-grid" label="Enter Password" onChange={(event)=> setPassword(event.target.value)} />
            </Grid>
          </Grid>
        </form>
        
        </DialogContent>
          <div className={classes.button}>

              {
                authLoading ? 

                <Button disabled variant="contained"  style={{background:'red', color:'white'}} autoFocus>
                  Signup
                </Button>

                :

                <Button onClick={signup} variant="contained"  style={{background:'#d94711', color:'white'}} autoFocus>
                  Signup
                </Button>
              }
               
                <Button onClick={handleClickOpen} style={{color:'#d94711'}}>
                  Switchto Login
                </Button>

                {
                  error ? <Typography style={{color:'red', fontSize:'0.8rem'}}>{error}</Typography> : ''
                }
          </div>
      </Dialog>
    </div>

   
  );
}
