import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Navigation() {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg,#0f1b33,#0a1020)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Technology Tracker
        </Typography>
        <Button color="inherit">Главная</Button>
        <Button color="inherit">Технологии</Button>
        <Button color="inherit">Статистика</Button>
      </Toolbar>
    </AppBar>
  );
}