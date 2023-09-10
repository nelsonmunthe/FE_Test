import axios from "axios";
import { Suspense } from "react";
import { Form, defer, Await, useLoaderData, useNavigate, useNavigation, json, redirect } from "react-router-dom";
import Loading from "../../Loading";
import { Button } from "@mui/material";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const TambahRuas: React.FC = () => {
    const units: any = useLoaderData();
    const navigate = useNavigate();
    const { state } = useNavigation();
    console.log('unit', units)
    const onBackHandler = () => {
        navigate('/master-data');
    };
   
    return(
        <Suspense fallback={<Loading />}>

            <div className="px-48 py-2 flex flex-col">
            <p className="text-3xl font-bold my-4"><span>Add New Ruas</span></p>
            <Form method='POST' encType="multipart/form-data">
                <div className="flex flex-col m-2">
                    <Await resolve={units.units} errorElement={<p className="text-2xl text-red-500 my-2">cant't load Unit List</p>}>
                        {
                            (units) => <div className="flex">
                                <label htmlFor="unit_id" className="basis-2/12 w-full text-lg font-medium my-1">Pilih Unit</label>
                                <select 
                                    name="unit_id" 
                                    id="unit_id" 
                                    required
                                    className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" >
                                <option key='' value=''>-- pilih unit --</option>
                                    {
                                        units.map((unit: any) => {
                                            return <option key={unit.id} value={unit.id}>{unit.unit}</option>
                                        })
                                    }
                                </select>
                            </div>
                        }
                        
                    </Await>
                    

                    <div className="flex">
                        <label htmlFor="ruas_name" className="basis-2/12 w-full text-lg font-medium my-1">Ruas Name</label>
                        <input 
                            type="text"
                            id="ruas_name"
                            name="ruas_name"
                            required  
                            className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                            defaultValue=''
                        />
                    </div>

                    <div className="flex">
                        <label htmlFor="status" className="basis-2/12 w-full text-lg font-medium my-1">Status</label>
                        <input 
                            type="text"
                            id="status"
                            name="status"
                            required  
                            className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                            defaultValue=''
                        />
                    </div>

                    <div className="flex">
                        <label htmlFor="km_akhir" className="basis-2/12 w-full text-lg font-medium my-1">KM Akhir</label>
                        <input 
                            type="text" 
                            id="km_akhir"
                            name="km_akhir"
                            required 
                            className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                            defaultValue=''
                        />
                    </div>

                    <div className="flex">
                        <label htmlFor="km_awal" className="basis-2/12 w-full text-lg font-medium my-1">KM Awal</label>
                        <input 
                            type="text"
                            id="km_awal"
                            name="km_awal"
                            required  
                            className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                            defaultValue=''
                        />
                    </div>

                    <div className="flex">
                        <label htmlFor="long" className="basis-2/12 w-full text-lg font-medium my-1">Long</label>
                        <input 
                            type="text"
                            id="long"
                            name="long"
                            required  
                            className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                            defaultValue=''
                        />
                    </div>

                    <div className="flex">
                        <label htmlFor="photo" className="basis-2/12 w-full text-lg font-medium my-1">Photo</label>
                        <input 
                            type="file"
                            id="photo"
                            name="photo"
                            required  
                            className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                            defaultValue=''
                        />
                    </div>

                    <div className="flex">
                        <label htmlFor="file" className="basis-2/12 w-full text-lg font-medium my-1">Document</label>
                        <input 
                            type="file"
                            id="file"
                            name="file"
                            required  
                            className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                            defaultValue=''
                        />
                    </div>

                    <div className="flex gap-4 flex-row-reverse mt-4">
                        <Button variant="contained" onClick={onBackHandler}>Back</Button>
                        <Button
                            disabled={state === 'submitting' ? true : false}
                            type="submit" 
                            variant="contained"
                        >
                            {state === 'submitting' ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                    
                </div>
            </Form>
        </div>
 
        </Suspense>
    )
}

export default TambahRuas;

const loadUnit = async () => {
    try {
        const response = await axios(`${API_URL}/unit`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data
    } catch (error: any) {
        throw new Response(error.response.statusText, { status: error.response.status });
    }
};

export async function action({ request, params }: { request: Request; params: any; }) {
    try {
        
        const { method } = request;
        switch(method){
            case 'POST':{
                const data = await request.formData();
                const body = {
                    unit_id: data.get('unit_id'),
                    ruas_name: data.get('ruas_name'),
                    file: data.get('file'),
                    photo: data.get('photo'),
                    km_awal: data.get('km_awal'),
                    km_akhir: data.get('km_akhir'),
                    status: data.get('status') === 'Active' ? '1' : '0',
                    long: data.get('long')
                };
                
                const response = await axios.post(`${API_URL}/ruas`, body, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    }
                })
                
                if(response.data.status) {
                    return redirect('/master-data')
                } else {
                    throw json({ message: 'Could not update Ruas.' }, { status: 500 });
                };
            }
            default: {
                throw new Response("", { status: 405 });
            }
        }
    } catch (error) {
        throw json({ message: 'something went wrong' }, { status: 500 });
    }
}

export const  loader = async () => {
    return defer({
        units : loadUnit()
    })
}



