import { json, redirect } from "react-router-dom";
import AuthForm from "./AuthForm";

const AuthLogin:React.FC = () => {
    return(<AuthForm />)
};

export default AuthLogin;

export async function action({ request }: { request: Request }) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';
  
    if (mode !== 'login' && mode !== 'signup') {
      throw json({ message: 'Unsupported mode.' }, { status: 422 });
    }
  
    const data = await request.formData();
    const authData = {
        username: data.get('username'),
        password: data.get('password'),
    };
  
    const response = await fetch('http://34.101.145.49:8004/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });
    
    if (response.status === 422 || response.status === 401) {
      return response;
    }
  
    if (!response.ok) {
      throw json({ message: 'Could not authenticate user.' }, { status: 500 });
    }
  
    const resData = await response.json();
    const token = resData.access_token;
    localStorage.setItem('token', token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString());
  
    return redirect('/');
}