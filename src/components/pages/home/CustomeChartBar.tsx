import { Suspense } from 'react';
import { BarChart as Bar } from '@mui/x-charts/BarChart';
import React from 'react';
const CustomeChartBar:React.FC<{data: any}> = ({data}) => {

    return(
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Bar
                width={800}
                height={400}
                series={[
                    { data: data?.values ?? [0], label: 'Jumlah Ruas', id: 'pvId', stack: 'total' },
                ]}
                xAxis={[{ data: data?.keys ?? [], scaleType: 'band' }]}
            /> 
        </Suspense>
    )
};

export default CustomeChartBar;