import { Button, Input } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import ViewFoto from "../../components/ViewFoto";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Pagination from "../../models/Pagination";
import Chart from '../../models/Chart'
import ViewRuas from "./ViewRuas";
import AddRuas from "./AddRuas";
import Ruas from "../../models/Ruas";
import DeleteRuas from "./DeleteRuas";
import UpdateRuas from "./UpdateRuas";


const MasterData:React.FC = () => {
    const API_URL = `${process.env.REACT_APP_API_URL}`;
    const [rows, setRows] = useState<Ruas[]>([]);
    const [openFoto, setOpenFoto] = useState(false);
    const [foto, setFoto] = useState('');
    const navigate = useNavigate();
    const [pagination, setPagination] = useState<Pagination>({page: 0, per_page: 5});
    const [totalRow, setTotalRow] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const [openView, setOpenView] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedRow, setSelectedRow] = useState<Array<number>>();
    const [ruas, setRuas] = useState<Ruas>(
        {
            id: 0,
            unit_id: 0,
            ruas_name: '',
            long: 0,
            km_awal: '',
            km_akhir: '',
            photo_url: '',
            doc_url: '',
            status: '',
            created_at: '',
            updated_at: ''
        }
    );
    const [searchById, setSearchById] = useState<string>()


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

    useEffect(() => {
        if(searchById) onSearchById()
        else fetchDataRuas()
    }, [searchById])
    
    const fetchDataRuas = async() => {
        try {
            let params = `per_page=${pagination.per_page}&page=${pagination.page}`
            const response = await axios.get(`${API_URL}/ruas?${params}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if(response.status){
                setRows(response.data.data);
                setTotalRow(response.data.total)       
                
            } else {
                enqueueSnackbar('something went wrong', { variant: "error"});
            }
        } catch (error: any) {
            if(error.response.status === 401){
                navigate('/login')
            }  
            return enqueueSnackbar('something went wrong', { variant: "error"});
        }
    };

    const handlePageChange = (pagination: any) => {    
        setPagination((prev: Pagination) => {
            return{
                ...prev,
                page: pagination.page,
                per_page: pagination.pageSize
            }
        })
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    }));


    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        },
    }));

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
        } catch (error) {
            console.log(error)
        }
    }


    const onChangeSearch = async (event: any) => {
        const value = event.target.value;
        if(value == '') setSearchById('')
        else setSearchById(event.target.value)
    };
   
    const onSearchById = async () => {
        try {
            const response = await axios(`${API_URL}/ruas/${searchById}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            
            if(response.status === 200){
                setRows([response.data.data])
            }
        } catch (error) {
            return enqueueSnackbar('Failed searching', { variant: "error"});
        }
    }

    const onHandleSearchById = () => {
        if(!searchById) return enqueueSnackbar('Search Field Empty', { variant: "error"});
        onSearchById()
    }

    const onHandleNewRuas = () => {
        setOpenAdd(true)
    };
    
    return(
        <div>
            <Header />
            <div className="px-48 py-2 flex flex-col">
                <p className="text-lg font-bold	"><span>Master Data</span></p>
                <div className="flex justify-end gap-2">
                    <Input 
                        value={searchById}
                        onChange={(value) => onChangeSearch(value)}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <Button onClick={onHandleSearchById} disabled={searchById === '' || searchById === undefined ? true: false} variant="outlined" startIcon={<SearchIcon />}>Search</Button>
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

        </div>
    )
};

export default MasterData;