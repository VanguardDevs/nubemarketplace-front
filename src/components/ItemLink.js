import * as React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Typography from '@mui/material/Typography';

const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} {...props} />
));

const ItemLink = ({ title, to, icon }) => (
    <MenuItem component={LinkBehavior} to={to} sx={{
        textDecoration: 'none',
        width: '100%',
        padding: '1rem',
        transition: '0.5s'
    }}>
        <ListItemIcon>
            {icon}
        </ListItemIcon>
        <ListItemText>
            {title}
        </ListItemText>
        <Typography variant="body2" color="text.secondary">
            <ArrowRightIcon fontSize='small' />
        </Typography>
    </MenuItem>
)

export default ItemLink
