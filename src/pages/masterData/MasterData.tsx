import { Box, Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { Suspense, lazy, useEffect, useState } from "react";
import ViewFoto from "../../components/ViewFoto";
import { useSnackbar } from "notistack";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from "../../models/Pagination";
import useRuas from "../../components/hooks/useRuas";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
const Header = lazy(() => import('../../components/Header'));
const ViewRuas = lazy(() => import('./ViewRuas'));
const AddRuas = lazy(() => import('./AddRuas'));
const DeleteRuas = lazy(() => import('./DeleteRuas'));
const UpdateRuas = lazy(() => import('./UpdateRuas'))

const MasterData:React.FC = () => {
    const API_URL = `${process.env.REACT_APP_API_URL}`;
    const [openFoto, setOpenFoto] = useState(false);
    const [foto, setFoto] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [openView, setOpenView] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Array<number>>();
    const navigate = useNavigate();

    const {totalRow, rows, setSearchById, searchById, setPagination, pagination, fetchDataRuas}  = useRuas()

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
                return <div className="flex gap-1">
                    <EditIcon onClick={onHandleEdit}/>
                    <RemoveRedEyeIcon onClick={onHandleView}/>
                    <DeleteIcon onClick={openDeletePopUp}/>
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

    const onCloseFoto = () => {
        setOpenFoto(false)
    };

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
    };

    const onHandleCloseView = () => {
        setOpenView(prev => !prev)
    };

    const onHandleCloseAdd = () => {
        setOpenAdd(prev => !prev)
    }

    const onHandleEdit = () => {
        setOpenEdit(true)
    };

    const onHandleView = () => {
        setOpenView(true);
    }

    const openDeletePopUp = () => {
        setOpenDelete(true)
    }

    const oncLoseEdit = () => {
        setOpenEdit(prev => !prev)
    }

    const onHandleDelete = () => {
        setOpenDelete(prev => !prev)
    };

    const deleteRuas = async () => {
        try {
            const detail = await axios.delete(`${API_URL}/ruas/${selectedRow}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            
            if(detail.status === 200){
                fetchDataRuas();
                onHandleDelete()
                enqueueSnackbar(`Suceed Delete Ruas Id ${selectedRow}`, { variant: "success"});
            }
        } catch (error: any) {
            if(error.response.status === 401) {
                navigate('/login')
                return enqueueSnackbar(error.response.statusText, { variant: "error"});
            }
            return enqueueSnackbar(error.response.statusText, { variant: "error"});
        }
    }


    const onChangeSearch = async (event: any) => {
        const value = event.target.value;
        if(value === '') setSearchById('')
        else setSearchById(event.target.value)
    };

    const onHandleNewRuas = () => {
        setOpenAdd(true)
    };
    
    return(
        <Suspense fallback={<Loading />}>
            <Header />
            <div className="px-48 py-2 flex flex-col">
                <p className="text-3xl font-bold mt-2"><span>Master Data</span></p>
                <div className="flex justify-end gap-2">
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField 
                            id="input-with-sx" 
                            label="Type Id to searching..." 
                            variant="standard"
                            value={searchById}
                            onChange={(value) => onChangeSearch(value)}
                        />
                    </Box>
                    <Button onClick={onHandleNewRuas} variant="contained" startIcon={<AddIcon />}>Tambah</Button>
                </div>

                <div style={{ height: '100%', width: '100%' }} className="mt-6">
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        rowCount={totalRow}
                        paginationMode="server"
                        onRowSelectionModelChange={(ids) => {
                            const id = +ids[0]
                            setSelectedRow([id])  
                        }}
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
            <ViewFoto 
                open={openFoto}
                fotoUrl={foto}
                onClose={onCloseFoto}
            />

            <ViewRuas 
                open = {openView}
                onClose = {onHandleCloseView}
                id={selectedRow}
            />

            <AddRuas 
                open = {openAdd}
                onClose = {onHandleCloseAdd}
                fetchDataRuas={fetchDataRuas}
            />

            <DeleteRuas 
                open={openDelete}
                handleClose={onHandleDelete}
                deleteRuas={deleteRuas}
            />

            <UpdateRuas 
                open={openEdit}
                onClose={oncLoseEdit}
                fetchDataRuas={fetchDataRuas}
                id={selectedRow}
            />

        </Suspense>
    )
};

export default MasterData;