import { useEffect, useState } from "react";
import Ruas from "../../models/Ruas";
import axios from "axios";
import Pagination from "../../models/Pagination";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const useRuas = () => {
    const API_URL = `${process.env.REACT_APP_API_URL}`;
    const [rows, setRows] = useState<Ruas[]>([]);
    const [searchById, setSearchById] = useState<string>()
    const [pagination, setPagination] = useState<Pagination>({page: 0, per_page: 5});
    const [totalRow, setTotalRow] = useState(0);
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();
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
                return enqueueSnackbar(error.response.statusText, { variant: "error"});
            }  
            return enqueueSnackbar('something went wrong', { variant: "error"});
        }
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
        } catch (error: any) {
            if(error.response.status === 401){
                navigate('/login')
                return enqueueSnackbar(error.response.statusText, { variant: "error"});
            } 
            return enqueueSnackbar(error.response.statusText, { variant: "error"});
        }
    }

    return {
        setTotalRow,
        totalRow,
        setRows,
        rows,
        setSearchById,
        searchById,
        setPagination,
        pagination,
        fetchDataRuas
    };

};

export default useRuas;
