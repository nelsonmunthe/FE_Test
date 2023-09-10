import { Box, Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from "../../../models/Pagination";
import useRuas from "../../../hooks/useRuas";
import { defer, json, useLoaderData, Await, Link } from "react-router-dom";
import Loading from "../../Loading";
const API_URL = `${process.env.REACT_APP_API_URL}`;
const MasterData:React.FC = () => {

    const [openFoto, setOpenFoto] = useState(false);
    const [foto, setFoto] = useState('');


    const {setPagination, pagination, fetchDataRuas}  = useRuas()

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
            width: 200,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: "long",
            headerName: "Lokasi",
            width: 200,
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
          width: 200,
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
            width: 200,
            headerAlign: 'center',
            align: 'center',
            valueFormatter: (params) => {
                if (params.value) return 'Aktif' 
                else return 'Tidak Aktif'
              },
        },
        {
            field: "action",
            headerName: "Actions",
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params: any) => {
                const ruasId = params.row.id;
                return <div className="flex gap-1">
                    <Link to={`/master-data/detail/${ruasId}`}><RemoveRedEyeIcon/></Link>
                    {/* <Link to={`/master-data/detail/${ruasId}`}><DeleteIcon/></Link> */}
                    {/* <DeleteIcon onClick={() => openDeletePopUp(ruasId)}/> */}
                </div>
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

    useEffect(() => {
        if(pagination.page !== 0 || pagination.per_page !== 5){
            fetchDataRuas()
        }
    
    }, [pagination]);

    const handlePageChange = (pagination: any) => {    
        setPagination((prev: Pagination) => {
            return{
                ...prev,
                page: pagination.page,
                per_page: pagination.pageSize
            }
        })
    };
    
    return(
        <Suspense fallback={<Loading />}>
            <div className="px-48 py-2 flex flex-col">
                <p className="text-3xl font-bold mt-2"><span>Master Data</span></p>
                <div className="flex justify-end gap-2">
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField 
                            id="input-with-sx" 
                            label="Type Id to searching..." 
                            variant="standard"
                            // value={searchById}
                            // onChange={(value) => onChangeSearch(value)}
                        />
                    </Box>
                    <Link to='new'>
                        <Button variant="contained" startIcon={<AddIcon />}>Tambah</Button>
                    </Link>
                </div>

                <div style={{ height: '100%', width: '100%' }} className="mt-6">
                    <Await resolve={data.result} errorElement={<p className="text-2xl text-red-500">cant't load Ruas Dashboard</p>}>
                        {(loaderData) => 
                            <DataGrid
                                columns={columns}
                                rows={loaderData.data}
                                rowCount={loaderData.total}
                                paginationMode="server"
                                onRowSelectionModelChange={(ids) => {}}
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
                                            paginationModel: { pageSize: 5},
                                    },
                                }}
                                pageSizeOptions={[5, 10, 25]}
                                onPaginationModelChange={handlePageChange}
                            />
                        }
                    </Await>
                    
                </div>
            </div>

        </Suspense>
    )
};

export default MasterData;

async function getRuas ()  {
    try {
        let params = `per_page=5&page=0`
        const response = await axios.get(`${API_URL}/ruas?${params}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if(response.status){
            return response.data      
            
        } else {
            throw json( { message: 'Could not fetch Dashboard.' }, { status: 500});
        }
    } catch (error: any) {
        throw new Response(error.response.statusText, { status: 500 });
    }

}

export async function loader (){
    return defer({
        result : getRuas()
    })
};