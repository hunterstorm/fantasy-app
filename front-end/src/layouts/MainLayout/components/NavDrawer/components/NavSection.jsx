import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, Typography, Stack} from '@mui/material';
import { SportsFootball, Person, Groups } from '@mui/icons-material';
import { NavLink as RouterLink, useLocation} from 'react-router-dom';

function NavItem({ item, active, onNavigate }) {
    const { title, path, icon: Icon } = item;

    const handleClick = () => {
        onNavigate()
    };

    return (
        <ListItem component={RouterLink} to={path} onClick={handleClick} >
            <Stack direction="row" alignItems="center" >
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
                <Typography  variant="body2" color="secondary" sx={{fontSize:24}}>{title}</Typography>
            </Stack>
        </ListItem>
    );
}

export default function NavSection({onClose}) {

    const { pathname } = useLocation();



    const navConfig = [
        {
            title: "Dashboard",
            path: "/",
            icon: SportsFootball
        },
        {
            title: "Players",
            path: "/players",
            icon: Person
        },
        {
            title: "Teams",
            path: "/teams",
            icon: Groups
        }
    ]

    const match = (path) => {
		if (path === "/") {
			// makes dashboard highlight off when other pages are selected
			return pathname === path;
		}
		
		return new RegExp(path).test(pathname);
	};
  return (
    <Box>
        <List disablePadding>
            {navConfig.map((item, index) => (
                <NavItem key={index} item={item} active={match} onNavigate={onClose} />
            ))}
        </List>
    </Box>
  )
}