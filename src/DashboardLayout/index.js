import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import pfp from '../Assets/images/image_overview.png'
import {
  logoutSuccess,
} from "../Redux/UserRedux/UserSlice";
import { useDispatch } from 'react-redux';
import Logohr from '../Assets/images/Logohr.png'
import { Button, Divider } from 'antd';
import { makeStyles } from '@mui/styles';
import {ReactComponent as SettingsIcon} from '../Assets/Icons/Settings.svg'
import {ReactComponent as ProfileIcon} from '../Assets/Icons/profileInfo.svg'
import {ReactComponent as ManagementIcon} from '../Assets/Icons/Management.svg'
import {ReactComponent as AttendanceIcon} from '../Assets/Icons/Attends.svg'
import {ReactComponent as OverviewIcon} from '../Assets/Icons/overview.svg'
import {ReactComponent as RequestIcon} from '../Assets/Icons/MyRequest.svg'

      const useStyles= makeStyles({
              active:{
                backgroundColor: "#b2e3ff52 !important",
                borderLeft: "4px solid rgba(0, 152, 201, 1) !important"
              },
        })

const drawerWidth = 200;
function Dashboard(props) {
  const LocalData =JSON.parse(localStorage.getItem("AuthObj"))
  let AuthRole = LocalData?.role;
  let AuthName = LocalData?.name;

  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const location =useLocation();

  function logout(){
    localStorage.clear();
    // localStorage.removeItem('Token');
    // localStorage.removeItem('useInfo');
    // localStorage.removeItem('persist:root');
    // localStorage.removeItem('AuthObj')
    dispatch(logoutSuccess());
    navigate('/')
  }


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const personal = [
    {
			title: "Overview",
			path: `${AuthRole === "Admin" ? "/admin-overview" :  '/overview'}`,
			icon: (
				<OverviewIcon />
			),
		},
    {
      title: 'My Attendance',
      path: `${AuthRole === "Admin" ? "#" :  '/attendance'}`,
      icon: <AttendanceIcon />
    },
    {
      title: 'Requests',
      path: '/request',
      icon: <RequestIcon />,
    },
  ];
 
  const admin = [
    {
			title: "Management",
			path: `${(AuthRole === "Admin" ||  AuthRole === "CEO" ||  AuthRole === "HOD"|| AuthRole === "CTO" || AuthRole === "HR") ? "/management" :  '#'}`,
			icon: <ManagementIcon />,
			
		},
    {
      title: 'Attendances',
      path: `${(AuthRole === "Admin" || AuthRole === "CTO" ||  AuthRole === "HOD" || AuthRole === "CEO" || AuthRole === "HR") ? '/emp-attendance' : '#'}` ,
      icon: <AttendanceIcon />
    },
  ];
  
  const profile =[
    {
      title:'Profile Info',
      path: `${AuthRole === "Admin" ? "/admin-profile" :  '/user-profile'}`,
      icon: <ProfileIcon />,
    },
    {
      title: 'Settings',
      path: `${AuthRole === "Admin" ? "/admin-setting" :  '/emp-settings'}`,
      icon: <SettingsIcon />,
    },
  ];


  const drawer = (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
			}}
		>
			<Toolbar
				style={{
					display: "flex",
					justifyContent: "center",
					margin: "28px 0px 28px 0px",
				}}
			>
				<img
					src={Logohr}
					style={{ width: "81px", height: "56px" }}
					alt="logoHr"
				/>
			</Toolbar>
			<Divider />
			<List>
        {AuthRole === "Admin" 
          ? null
          :
          <>
            <p className='side_nav_heading mb-2'>Personal</p>
            {personal.map((item, index)=>(
                <Link to={item.path} style={{ textDecoration: "none" }}>
                  <ListItem
                    value={item.title}
                    key={index}
                    disablePadding
                  >
                    <ListItemButton
                      className={location.pathname === item.path ? classes.active: "" }
                    >
                      <ListItemIcon className="sidebar_icon">
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="span">{item.title}</Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
            ))}
          </>
        }

        {(AuthRole === "Admin" || AuthRole === "HR" || AuthRole === "CTO" ||  AuthRole === "CEO" ||  AuthRole === "HOD")
          &&
          <>
            <p className='side_nav_heading mt-3 mb-2'>Admin</p>
            {admin.map((item, index)=>(
                <Link to={item.path} style={{ textDecoration: "none" }}>
                  <ListItem
                    value={item.title}
                    key={index}
                    disablePadding
                  >
                    <ListItemButton
                      className={location.pathname===item.path ? classes.active: "" }
                    >
                      <ListItemIcon className="sidebar_icon">
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="span">{item.title}</Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
            ))}
          </>
        }

         <p className='side_nav_heading mt-3 mb-2'>Profile</p>
        {profile.map((item, index)=>(
            <Link to={item.path} style={{ textDecoration: "none" }}>
							<ListItem
								value={item.title}
								key={index}
								disablePadding
							>
								<ListItemButton
                  className={location.pathname===item.path ? classes.active: "" }
                >
									<ListItemIcon className="sidebar_icon">
										{item.icon}
									</ListItemIcon>
									<ListItemText>
										<Typography variant="span">{item.title}</Typography>
									</ListItemText>
								</ListItemButton>
							</ListItem>
						</Link>
        ))}
			</List>
		</div>
	);
  const container = window !== undefined ? () => window().document.body : undefined;
  // profile logoout 
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: '#fff'
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ ml: 'auto' }}>
            {/* <IconButton
              size="large"
              aria-label="show new notifications"
              color="inherit"
            >
              <Badge badgeContent={2} color="error">
                <NotificationsNoneOutlinedIcon style={{ color: '#000' }} />
              </Badge>
            </IconButton> */}
            </Box>
          <Box sx={{ml:"20px"}}>
            
              <IconButton  sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <Avatar alt="User" src={LocalData.img ? LocalData.img : pfp} />
              </IconButton>
            
               
            </Box>
            <Box sx={{ml:'10px',display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
              <Typography variant='h6' sx={{color:'#000',textTransform:'capitalize'}}> {AuthName}</Typography>
              <Typography variant='p' sx={{color: "rgba(4, 9, 33, 0.6)", lineHeight:'24px',fontSize:'14px'}}>
               {AuthRole}       
               </Typography>
            </Box>
            <Box>
              <Tooltip title="Logout">
                <Button style={{border: 'none',color: "rgba(4, 9, 33, 0.6)"}} onClick={logout}>
                  <LogoutIcon color="primary" />          
                </Button>
              </Tooltip>
            </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              height: '100vh',
              background: '#fff'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, background: '#fff', height: 'auto', width: { sm: `calc(100% - ${drawerWidth}px)`, height:'100vh' } }}
      >
        {/* <Toolbar /> */}
        {children}
      </Box>
    </Box>
  );
}
export default Dashboard;