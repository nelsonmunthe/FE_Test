import axios from "axios";
import { Suspense, useState } from "react";
import { Form, defer, Await, useLoaderData, useNavigate, json, redirect } from "react-router-dom";
import Loading from "../../Loading";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = `${process.env.REACT_APP_API_URL}`;

const RuasDetail: React.FC = () => {
    const ruas: any = useLoaderData();
    // const ruasAction: any = useActionData();
    const navigate = useNavigate();
    const [isUpdate, setIsUpdate] = useState(true);

    const onDisableInputText = () => {
        setIsUpdate(prev => !prev);
    };

    const onBackHandler = () => {
        navigate('/master-data');
    };
   
    return(
        <Suspense fallback={<Loading />}>
            <Await resolve={ruas.ruasDetail} errorElement={<p className="text-2xl text-red-500">cant't load Detail Ruas</p>}>
                {
                    (loadDetail) => 
                    <div className="px-48 py-2 flex flex-col">
                        <p className="text-3xl font-bold my-4"><span>Detail Ruas</span></p>
                        <Form method="delete" className="flex flex-row-reverse m-2">
                            <Button variant="outlined" color="warning" type="submit" startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                        </Form>
                        <Form method='POST' encType="multipart/form-data">
                            <div className="flex flex-col m-2">
                                <div className="flex">
                                    <label htmlFor="id" className="basis-2/12 w-full text-lg font-medium my-1">ID</label>
                                    <input 
                                        type="text"
                                        id="id"
                                        name="id"
                                        disabled={true}
                                        required 
                                        className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                        defaultValue={loadDetail.id}
                                    />
                                </div>

                                <div className="flex">
                                    <label htmlFor="unit_id" className="basis-2/12 w-full text-lg font-medium my-1">Unit ID</label>
                                    <input 
                                        type="text"
                                        id="unit_id"
                                        name="unit_id"
                                        disabled={isUpdate}
                                        required  
                                        className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                        defaultValue={loadDetail.unit_id}
                                    />
                                </div>

                                <div className="flex">
                                    <label htmlFor="ruas_name" className="basis-2/12 w-full text-lg font-medium my-1">Ruas Name</label>
                                    <input 
                                        type="text"
                                        disabled={isUpdate}
                                        id="ruas_name"
                                        name="ruas_name"
                                        required  
                                        className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                        defaultValue={loadDetail.ruas_name}
                                    />
                                </div>

                                <div className="flex">
                                    <label htmlFor="status" className="basis-2/12 w-full text-lg font-medium my-1">Status</label>
                                    <input 
                                        type="text"
                                        disabled={isUpdate}
                                        id="status"
                                        name="status"
                                        required  
                                        className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                        defaultValue={loadDetail.status === '1' ? 'Active' : 'Deactive'}
                                    />
                                </div>

                                <div className="flex">
                                    <label htmlFor="km_akhir" className="basis-2/12 w-full text-lg font-medium my-1">KM Akhir</label>
                                    <input 
                                        type="text" 
                                        disabled={isUpdate}
                                        id="km_akhir"
                                        name="km_akhir"
                                        required 
                                        className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                        defaultValue={loadDetail.km_akhir}
                                    />
                                </div>

                                <div className="flex">
                                    <label htmlFor="km_awal" className="basis-2/12 w-full text-lg font-medium my-1">KM Awal</label>
                                    <input 
                                        type="text"
                                        disabled={isUpdate}
                                        id="km_awal"
                                        name="km_awal"
                                        required  
                                        className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                        defaultValue={loadDetail.km_awal}
                                    />
                                </div>

                                <div className="flex">
                                    <label htmlFor="long" className="basis-2/12 w-full text-lg font-medium my-1">Long</label>
                                    <input 
                                        type="text"
                                        disabled={isUpdate}
                                        id="long"
                                        name="long"
                                        required  
                                        className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                        defaultValue={loadDetail.long}
                                    />
                                </div>

                                {isUpdate ?
                                    (
                                        <div className="flex">
                                            <label htmlFor="photo" className="basis-2/12 w-full text-lg font-medium my-1">Photo Url</label>
                                            <input 
                                                type="text"
                                                disabled={isUpdate}
                                                id="photo"
                                                name="photo"
                                                required  
                                                className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                                defaultValue={loadDetail.photo_url}
                                            />
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="flex">
                                            <label htmlFor="photo" className="basis-2/12 w-full text-lg font-medium my-1">Photo Url</label>
                                            <input 
                                                type="file"
                                                disabled={isUpdate}
                                                id="photo"
                                                name="photo"
                                                required  
                                                className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                                defaultValue={loadDetail.photo_url}
                                            />
                                        </div>
                                    )

                                }

                            
                                {
                                    isUpdate ? 
                                    ( 
                                        <div className="flex">
                                            <label htmlFor="file" className="basis-2/12 w-full text-lg font-medium my-1">Document</label>
                                            <input 
                                                type="text"
                                                disabled={isUpdate}
                                                id="file"
                                                name="file"
                                                required  
                                                className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                                defaultValue={loadDetail.doc_url}
                                            />
                                        </div>
                                    ) 
                                    :
                                    (
                                        <div className="flex">
                                            <label htmlFor="file" className="basis-2/12 w-full text-lg font-medium my-1">Document</label>
                                            <input 
                                                type="file"
                                                disabled={isUpdate}
                                                id="file"
                                                name="file"
                                                required  
                                                className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                                defaultValue={loadDetail.doc_url}
                                            />
                                        </div>
                                    ) 
                                }


                                <div className="flex">
                                    <label htmlFor="created_at" className="basis-2/12 w-full text-lg font-medium my-1">Created At</label>
                                    <input 
                                        type="text"
                                        disabled={isUpdate}
                                        id="created_at"
                                        name="created_at"
                                        required  
                                        className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                        defaultValue={loadDetail.created_at}
                                    />
                                </div>
                                
                                <div className="flex">
                                    <label htmlFor="updated_at" className="basis-2/12 w-full text-lg font-medium my-1">Updated At</label>
                                    <input 
                                        type="text"
                                        disabled={isUpdate}
                                        id="updated_at"
                                        name="updated_at"
                                        required  
                                        className="pl-2 basis-10/12 h-8 mb-2 bg-zinc-100 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                                        defaultValue={loadDetail.updated_at}
                                    />
                                </div>
                                <div className="flex gap-4 flex-row-reverse mt-4">
                                    <Button variant="contained" onClick={onBackHandler}>Back</Button>
                                    {isUpdate && <Button variant="contained" onClick={onDisableInputText}>Update</Button>}
                                    {!isUpdate && <Button type="submit" variant="contained">Submit</Button>}
                                </div>
                                
                            </div>
                        </Form>
                    </div>
                }
                
            </Await>
        </Suspense>
    )
}

export default RuasDetail;

const loadDetail = async (id: number) => {
    try {
        const ruas = await axios(`${API_URL}/ruas/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return ruas.data.data
    } catch (error: any) {
        throw new Response(error.response.statusText, { status: 500 });
    }
};

export async function action({ request, params }: { request: Request; params: any; }) {
    try {
        
        const { method } = request;
        const { ruasId } = params;
        console.log('method', method)
        switch(method){
            case 'POST':{
                const data = await request.formData();
                const body = {
                    _method: 'PUT',
                    unit_id: data.get('unit_id'),
                    ruas_name: data.get('ruas_name'),
                    file: data.get('file'),
                    photo: data.get('photo'),
                    km_awal: data.get('km_awal'),
                    km_akhir: data.get('km_akhir'),
                    status: data.get('status') === 'Active' ? '1' : '0',
                    long: data.get('long')
                }
                
                const response = await axios.post(`${API_URL}/ruas/${ruasId}`, body, {
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

            case 'DELETE': {
                const response = await axios.delete(`${API_URL}/ruas/${ruasId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if(response.data.status) {
                    return redirect('/master-data')
                } else {
                    throw json({ message: 'Could not Delete Ruas.' }, { status: 500 });
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

export const  loader = async (params: any) => {
    const ruasId = params.params.ruasId;
    return defer({
        ruasDetail : loadDetail(ruasId)
    })
}



