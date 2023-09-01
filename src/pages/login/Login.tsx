
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserLogin from '../../models/UserLogin';
import logo from '../../images/jasa_marga.png';
import logo1 from '../../images/jasa_marga_1.png'

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Login:React.FC = () => {
  const API_URL = `${process.env.REACT_APP_API_URL}`;
  const navigate =  useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loginData, setLoginData] = useState<UserLogin>({username: '', password: ''});

  const loginHandler = async () => {
    try {
        const login = await axios.post(`${API_URL}/login`, loginData);
        if(login.status === 200){
          localStorage.setItem('token', login.data.access_token);
          navigate('/dashboard')
          return enqueueSnackbar('login Succeed', { variant: "success"});
        };

    } catch (error: any) {
      if(error.response.status === 422) return enqueueSnackbar(error.response.data.message[0], { variant: "error"});
      return enqueueSnackbar(error.response.data.message, { variant: "error"});
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('bu')
    event.preventDefault();
    if(!loginData.password || !loginData.username) return enqueueSnackbar("Username or password is Empty", { variant: "error"});
    loginHandler()
  };

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => {
      return{
        ...prev,
        username: event.target.value
      }
    })
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => {
      return{
        ...prev,
        password: event.target.value
      }
    })
  }

  return (
    <div className='flex flex-row'>
      <div className='flex-1 '>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center	gap-2 w-full h-full py-40'>
            <p className='flex-auto w-96 h-32 '>
                <img src={logo} alt="Logo"/>
            </p>
            <p className='flex flex-col  w-96 h-32 gap-2'>
                <label htmlFor="username">Username</label>
                <TextField 
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={loginData.username}
                  onChange={onChangeUsername}
                  autoFocus
                />
            </p>
            <p className='flex flex-col  w-96 h-32 gap-2 '>
            <label htmlFor="password">Password</label>
                <TextField 
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={loginData.password}
                  onChange={onChangePassword}
                  autoComplete="current-password"
                />
            </p>
            <p className='flex flex-col flex-end w-96 h-60 gap-2 '>
                <Button type='submit' variant="contained" className='flex flex-end w-32'>Login</Button>
            </p>
          </form>
      </div>
      <div className='flex-1'>
        <div className='flex justify-center align-center py-96' style={{ 
          backgroundImage: `url(${logo1})`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '50vw',
          height: '50vh'
        }}>
      </div>
      </div>
 
    </div>
  );
};


export default Login;