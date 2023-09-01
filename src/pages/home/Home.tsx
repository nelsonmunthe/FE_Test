import { Button } from "@mui/material";
import Header from "../../components/Header";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import ViewFoto from "../../components/ViewFoto";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Pagination from "../../models/Pagination";
import Chart from '../../models/Chart'

type Cache = {
    [key: string]: number
};

type DataChart = Chart[]
  

const Home:React.FC = () => {
    const API_URL = `${process.env.REACT_APP_API_URL}`;
    const [rows, setRows] = useState([]);
    const [openFoto, setOpenFoto] = useState(false);
    const [foto, setFoto] = useState('');
    const [xLabels, setXLabels] = useState<string[]>([])
    const [pData, setPData] = useState<number[]>([0]);
    const [dataChart, setDataChart] = useState<DataChart>([]);
    const navigate = useNavigate();
    const [pagination, setPagination] = useState<Pagination>({page: 0, per_page: 5});
    const [totalRow, setTotalRow] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

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

    useEffect(() => {
        fetchDataRuas()
    }, [pagination]);

    useEffect(() => {
        fetchDataRuasChart()
    }, [])

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

    const fetchDataRuasChart = async() => {
        try {
            let params = `per_page=100&page=1`
            const response = await axios.get(`${API_URL}/ruas?${params}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if(response.status){
                setRows(response.data.data);
                setTotalRow(response.data.total)

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
                setXLabels(keys)
                setPData(values)
                setDataChart(chart)
                
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
    }
    
    return(
        <div>
            <Header />
            <div className="px-48 py-2 flex flex-col">
                <p className="text-lg font-bold	"><span>Dashboard</span></p>
                <div className="flex flex-row">
                    <div className="flex-initial w-8/12 justify-items-center">
                            <BarChart
                                width={800}
                                height={400}
                                series={[
                                    { data: pData, label: 'Jumlah Ruas', id: 'pvId', stack: 'total' },
                                ]}
                                xAxis={[{ data: xLabels, scaleType: 'band' }]}
                            />
                    </div>

                    <div className="flex justify-center content-center	items-center ">
                        <PieChart
                            series={
                                [
                                    {
                                        arcLabel: (item) => `${item.label} (${item.value})`,
                                        arcLabelMinAngle: 45,
                                        data: dataChart,
                                    },
                                ]
                            }
                            sx={
                                    {
                                        [`& .${pieArcLabelClasses.root}`]: {
                                            fill: 'white',
                                            fontWeight: 'bold',
                                        },
                                    }
                                }
                            width= {500}
                            height={250}
                        />
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
        </div>
    )
};

export default Home;