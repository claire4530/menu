
import * as React from 'react'
import UpdateTable from './components/update-table'

export type NotifyProps = {
    id: number
    tableNumber: string
    state: string
    alertTime: string
    event: string
    stateButton: string
    area_id: number
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const fetchAreas = async (): Promise<NotifyProps[]> => {
    const response = await fetch(`${apiUrl}/api/notify`);
    return await response.json();
};


const App: React.FC = async () => {

    const initialAreas = await fetchAreas();

    return (
        <div className="w-full">
            <UpdateTable initialAreas={initialAreas} />
        </div>
    )
}
export default App
