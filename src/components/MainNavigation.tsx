import { NavLink, Form, useRouteLoaderData } from "react-router-dom";

const MainNavigation:React.FC = () => {
    const token = useRouteLoaderData('root');
    
    let menu = (
            <nav>
                <ul className="flex justify-end gap-4 font-semibold h-6">
                    <li>
                        <NavLink 
                            to={'/dashboard'}
                            className={({ isActive }) => isActive ? 'active' : undefined }
                            end
                        >
                            Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <NavLink 
                            to={'/master-data'}
                            className={({ isActive }) => isActive ? 'active' : undefined }
                        >
                            Master-data
                        </NavLink>
                    </li>
                    <li className="h-full">
                        <Form action="/logout" method="post" className="flex justify-center align-center">
                            <button className="w-20 border hover:border-indigo-600 hover:bg-yellow-300">Logout</button>
                        </Form>
                    </li>
                </ul>
            </nav>
    );

    if(!token) {
        menu = (
            <nav>
               <ul className="flex justify-end gap-4 font-semibold h-6">
                    <li className="w-20 border hover:border-indigo-600 hover:bg-yellow-300 text-center">
                        <NavLink 
                            to={'/login'}
                            className={({ isActive }) => isActive ? 'active' : undefined }
                        >
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
           
        )
    }

    return(
        <header className="p-4 px-16 bg-amber-300">
            {menu}
        </header>
    )
};

export default MainNavigation;