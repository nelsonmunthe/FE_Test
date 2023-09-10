import { Form, Link, useActionData, useNavigation, useSearchParams } from "react-router-dom";

const AuthForm:React.FC = () => {
    const data: any = useActionData();
    const navigation = useNavigation();

    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';  

    return(
        <Form method="post" className="mx-auto my-8 max-w-2xl flex flex-col gap-4">
            <h1 className="text-2xl">{isLogin ? 'Log in' : 'Create a new user'}</h1>
            {/* {data && data.errors && (
            <ul>
                {Object.values(data.errors).map((err) => (
                    <li key={err}>{err}</li>
                ))}
            </ul>
            )} */}
            {data && data.message && <p>{data.message}</p>}
            <p>
                <label className="block w-full" htmlFor="username">Username</label>
                <input className="bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" id="email" type="text" name="username" required />
            </p>
            <p>
                <label className="block w-full" htmlFor="image">Password</label>
                <input className="bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" id="password" type="password" name="password" required />
            </p>
            <div className={'flex justify-end align-center gap-4'}>
                <Link to={`?mode=${isLogin ? 'signup' : 'login'}`} className="p-4">
                    {isLogin ? 'Create new user' : 'Login'}
                </Link>
                <button disabled={isSubmitting} className="w-28 cursor-pointer p-4 rounded bg-gray-300 text-gray-800 border-0 hover:bg-amber-300">
                    {isSubmitting ? 'Submitting...' : 'Save'}
                </button>
            </div>
        </Form>
    )
};

export default AuthForm;