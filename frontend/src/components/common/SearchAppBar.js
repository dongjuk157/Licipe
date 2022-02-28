import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import { alpha } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import storage from '../../lib/storage';
import { 
  Drawer,
  CssBaseline,
  AppBar,
  Button,
  Toolbar,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core';

// jj
import '../../style/main.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#FFFFFF'
  },
  appBar: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
    boxShadow: 'none',
    width: '100%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    width: '100%',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    marginLeft: 0,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#ff4a6b',
    margin: '1.5rem',
    width: '1.5rem',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
      textAlign: 'end',
    },
  },
  hide: {
    display: 'hidden',
  },
  drawer: {
    // width: drawerWidth,
    width: 0,
    flexShrink: 0,
    },
  drawerPaper: {
    width: drawerWidth,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
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
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const sidebar = document.querySelector('.MuiPaper-root')
  window.addEventListener('click', (event) => {
    if (open === false || sidebar === null) {
      return
    }
    if (open === false || sidebar.contains(event.target)) {
      return
    }
    setOpen(false);
  })

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div style={{height:64}}></div>
      <AppBar
        position="relative"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="position-relative">
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap className={classes.title} className="position-absolute start-50 translate-middle-x">
          <Button href="/">
            <img src="/logo-sm.png" alt="logo" style={{height:'6rem'}}/>
          </Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        // center
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        <Link to='/' className="btn px-3 py-2">
          <span className="twayfly">Home</span>
        </Link>        
        <Link to='/reciperecommend' className="btn px-3 py-2">
          <span className="gradient-underline">둘러보기</span>
        </Link>
        <Link to='/recipe/category' className="btn px-3 py-2">
            <span className="gradient-underline">레시피 고르기</span>
        </Link>
        
        <Link to='/community' className="btn px-3 py-2">
            <span className="gradient-underline">요리 자랑</span>
        </Link>
        
        { loggedInfo ? (
          // <div className="row">
          //   <Link to='/MyPage' className="btn px-3 py-2">
          //       <span className="gradient-underline" >마이페이지</span>
          //   </Link>
          <Link to='/MyPage' className="btn px-3 py-2">
            <span className="gradient-underline" >마이페이지</span>
          </Link>
          
          // </div>
          ) : (
          <Link to='/login' className="btn px-3 py-2">
              <span className="twayfly">로그인</span>
          </Link>
         )}

         { loggedInfo ? (
          <Link to='/logout' className="btn px-3 py-2">
            <span>로그아웃</span>
          </Link>
         ) : (<></>)}

        <div className="m-2 position-absolute bottom-0 text-secondary row">
          <div>
          <small>Copyright, Team 앱만들다살찜,</small>
          </div>
          <div>
          <small>All Rights Reserved.</small>
          </div>
        </div>
        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        <Divider />
      </Drawer>
 
    </div>
  );
}


