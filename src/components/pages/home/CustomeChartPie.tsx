import { Suspense } from 'react';
import { PieChart as Pie, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import React from 'react';
const CustomeChartPie:React.FC<{data: any}> = ({data}) => {

    return(
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Pie
                series={
                    [
                        {
                            arcLabel: (item) => `${item.label} (${item.value})`,
                            arcLabelMinAngle: 45,
                            data: data.chart ?? [],
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
        </Suspense>
    )
};

export default CustomeChartPie;