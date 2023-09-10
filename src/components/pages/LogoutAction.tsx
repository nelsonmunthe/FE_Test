import { redirect } from "react-router-dom";

const LogoutAction = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    return redirect('/login')
};

export default LogoutAction;