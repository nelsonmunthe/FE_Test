import { useState } from "react";
import Ruas from "../models/Ruas";
import axios from "axios";
import Pagination from "../models/Pagination";

const useRuas = () => {
    const API_URL = `${process.env.REACT_APP_API_URL}`;
    const [rows, setRows] = useState<Ruas[]>([]);
    const [pagination, setPagination] = useState<Pagination>({page: 0, per_page: 5});
    const [totalRow, setTotalRow] = useState(0);

    const fetchDataRuas = async() => {
        try {
            let params = `per_page=${pagination.per_page}&page=${pagination.page}`
            const response = await axios.get(`${API_URL}/ruas?${params}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if(response.status){
                // setRows(response.data.data);
                // setTotalRow(response.data.total)       
                
            } else {
                throw new Response("", { status: 405 });
            }
        } catch (error: any) {
            throw new Response(error.response.statusText, { status: 401 });
        }
    };


    return {
        setTotalRow,
        totalRow,
        setRows,
        rows,
        setPagination,
        pagination,
        fetchDataRuas
    };

};

export default useRuas;
