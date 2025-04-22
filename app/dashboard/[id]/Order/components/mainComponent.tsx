"use client";
import * as React from 'react';
import DataTable from './mainTable';
import { Invoice } from './types'; // Update the import path as per the location of your types.ts file
import { useState } from 'react';

export type PaymentFire = {
  orderNumber: string
  menu_id: number
  name: string
  money: number
  number: number
  state: string
  time: string
  tableNumber: string
}

const MainComponent: React.FC<{ id: string }> = ({ id }) => {
    const decodedId = Array.isArray(id) ? id.map(decodeURIComponent).join(', ') : decodeURIComponent(id);
    const [data, setData] = React.useState<Invoice[]>([]);
    const [cookerProps, setCookers] = useState<PaymentFire[]>([]);

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/readOrderlist');
          const result: PaymentFire[] = await response.json()
          // 過濾出 tableNumber 與傳入的 id 相同的 cookers
          const filteredCookers = result.filter(
              (item) => item.tableNumber === decodedId
          )
          setCookers(filteredCookers)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <DataTable data={cookerProps} />
      </div>
    );
  };
  
  export default MainComponent;