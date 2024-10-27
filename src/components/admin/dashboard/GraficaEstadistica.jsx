import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { Card, Skeleton } from '@nextui-org/react';

export default function GraficaEstadistica({ datos }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!datos) return;

    const options = {
      chart: {
        type: 'donut',
      },
      colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
      labels: datos.nombres,
      series: datos.repeticiones,
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '55%',
          },
          offsetY: 15,
        },
      },
      legend: {
        position: 'bottom',
      }
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [datos]);

  if (!datos) {
    return (
      <Card className="flex justify-center items-center bg-zinc-900 p-3 w-full h-56 space-y-4">
        <Skeleton className="w-[11rem] h-52 rounded-full">
        </Skeleton>
        <div className='flex space-x-3'>
          <div className='flex justify-center items-center space-x-1'>
            <Skeleton className='w-3 h-3 rounded-full'/>
            <Skeleton className='w-10 h-2 rounded-full'/>
          </div>
          <div className='flex justify-center items-center space-x-1'>
            <Skeleton className='w-3 h-3 rounded-full'/>
            <Skeleton className='w-10 h-2 rounded-full'/>
          </div>
          <div className='flex justify-center items-center space-x-1'>
            <Skeleton className='w-3 h-3 rounded-full'/>
            <Skeleton className='w-10 h-2 rounded-full'/>
          </div>
        </div>
      </Card>
    );
  }

  return <div ref={chartRef} id="chart" className="w-full h-56"></div>;
}
