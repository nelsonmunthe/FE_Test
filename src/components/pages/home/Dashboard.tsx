import { Button } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import ViewFoto from "../../ViewFoto";
import { useLoaderData } from "react-router-dom";
import Pagination from "../../../models/Pagination";
import useRuas from "../../../hooks/useRuas";
import Loading from "../../Loading";
import { json, defer, Await } from "react-router-dom";
import CustomerChartBar from "./CustomeChartBar";
import CustomerChartPie from "./CustomeChartPie";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const Dashboard:React.FC = () => {
    const [openFoto, setOpenFoto] = useState(false);
    const [foto, setFoto] = useState('');
    const {setPagination, totalRow, rows, pagination, fetchDataRuas}  = useRuas();
    const data =  useLoaderData() as any;
   
    const columns: GridColDef[] = [
        { 
            field: "id", 
            headerName: "Id", 
            width: 90, 
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "ruas_name",
            headerName: "Ruas",
            width: 250,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "long",
            headerName: "Lokasi",
            width: 250,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params: any) => {
                return `${params.row.km_awal} s/d ${params.row.km_akhir}`
            },
        },
        {
            field: "photo_url",
            headerName: "Foto",
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params: any) => {
                return <Button variant="outlined" onClick={() => onHandleOpenFoto(params)}>Lihat</Button>
            },
        },
        {
          field: "doc_url",
          headerName: "Document",
          width: 300,
          headerAlign: 'center',
          align: 'center',
          renderCell: (params: any) => {
            return <Button variant="outlined" onClick={() => onViewdocument(params)}>Download</Button>
          },
        },
        {
            field: "unit_id",
            headerName: "Unit Kerja",
            width: 200,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "status",
            headerName: "Status",
            width: 250,
            headerAlign: 'center',
            align: 'center',
            valueFormatter: (params) => {
                if (params.value) return 'Aktif' 
                else return 'Tidak Aktif'
              },
        },
    ];

    const onViewdocument = (params: any)  => {
        window.open(params.value, "_blank");
    };

    const onHandleOpenFoto = (params: any) => {
        setOpenFoto(prev => !prev);
        setFoto(params.value)
    };

    const onCloseFoto = () => {
        setOpenFoto(false)
    }

    useEffect(() => {
        fetchDataRuas()
    }, [pagination]);

    const handlePageChange = (pagination: any) => {    
        setPagination((prev: Pagination) => {
            return{
                ...prev,
                page: pagination.page,
                per_page: pagination.pageSize
            }
        })
    }

    return(
        <Suspense fallback={<Loading />}>
            <div className="px-48 py-2 flex flex-col">
                <p className="text-3xl font-bold mt-2"><span>Dashboard</span></p>
                <div className="flex flex-row">
                    <div className="flex-initial w-8/12 justify-items-center">
                        <Await resolve={data.data} errorElement={ <p className="text-2xl text-red-500">cant't load chart bar</p>}>
                           {(loadEvent: any) => <CustomerChartBar data={loadEvent}/>}        
                         </Await>
                    </div>

                    <div className="w-8/12 grid place-items-center">
                        <Await resolve={data.data} errorElement={ <p className="text-2xl text-red-500">can't load pie bar</p>}>
                            {(loadEvent: any) => <CustomerChartPie data={loadEvent}/>}  
                        </Await>
                        
                    </div>
                </div>

                <div className="flex-1 my-4">
                    <br />
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            rowCount={totalRow}
                            paginationMode="server"
                            initialState={{
                                
                                sorting: {
                                    sortModel: [
                                        {
                                            field: "id",
                                            sort: "desc",
                                        },
                                    ],
                                },
                                    pagination: {
                                        paginationModel: { pageSize: pagination.per_page},
                                },
                            }}
                            pageSizeOptions={[5, 10, 25]}
                            onPaginationModelChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            <ViewFoto 
                open={openFoto}
                fotoUrl={foto}
                onClose={onCloseFoto}
            />
        </Suspense>
    )
};

export default Dashboard;

const loadChart = async() => {
    try {
        let params = `per_page=100&page=1`
        const response = await axios.get(`${API_URL}/ruas?${params}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        
        if(response.status){

            type Cache = {
                [key: string]: number
            };

            const cache: Cache = {}
    
            for(let ruas of response.data.data){
                if(ruas.unit_id in cache) {
                    cache[ruas.unit_id] += 1
                } else {
                    cache[ruas.unit_id] = 1
                }
            }
            
            const values = Object.values(cache);
            const keys = Object.keys(cache).map(item => `Unit ${item}`);
            const chart = keys.map((key, index) => {
                const value = values[index];
                return{
                    label : key,
                    value : value
                }
            })

            const result = {
                rows: response.data.data,
                totalRow: response.data.total,
                keys: keys,
                values: values,
                chart: chart
            }
            return result
            
        } else {
            throw json( { message: 'Could not fetch Dashboard.' }, { status: 500});
        }
    } catch (error: any) {
        throw new Response(error.response.statusText, { status: 500 });
    }
};

export async function loader() {
    return defer({
        data: loadChart(),
    });
}