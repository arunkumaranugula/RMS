import React from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

interface SideMenuProps {
  selected: string;
  onSelect: (menu: string) => void;
}

const menuItems = ["Member Info", "Member List"];

const SideMenu: React.FC<SideMenuProps> = ({ selected, onSelect }) => (
  <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {menuItems.map((item) => (
      <ListItem key={item} disablePadding>
        <ListItemButton selected={selected === item} onClick={() => onSelect(item)}>
          <ListItemText primary={item} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);

export default SideMenu;
