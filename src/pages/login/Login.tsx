
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserLogin from '../../models/UserLogin';
import logo from '../../images/jasa_marga.png';
import logo1 from '../../images/jasa_marga_1.png'

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
            <div className='flex-auto w-96 h-32 mb-4'>
                <img src={logo} alt="Logo"/>
            </div>
            <div className='flex flex-col  w-96 h-32 gap-x-1'>
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
            </div>
            <div className='flex flex-col  w-96 h-32 gap-x-1 '>
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
            </div>
            <div className='flex flex-row flex-row-reverse w-96  gap-x-1 '>
                <Button type='submit' variant="contained" className='w-32'>Login</Button>
            </div>
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