import React from 'react'
import AddAreas from './components/add-areas'
import UpdateTable from './components/update-table'

interface Item {
    id: number
    name: string
    description: string
    money: number
    switchOn: boolean
}

interface Area {
    id: number
    name: string
    items: Item[]
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const fetchAreas = async (): Promise<Area[]> => {
    const response = await fetch(`${apiUrl}/api/menu`);
    return await response.json();
};

const App: React.FC = async () => {

    const initialAreas = await fetchAreas();

    return (
        <div className="gap-4 ">
            <div className="border-b">
                <div className="flex h-16 items-center px-4 gap-4">
                    <h2 className="text-3xl font-bold tracking-tight flex-grow">
                        新增菜單
                    </h2>
                    <div className="ml-auto flex items-center space-x-4">
                        <AddAreas />
                    </div>
                </div>
            </div>
            <div>
                <UpdateTable initialAreas={initialAreas} />                 
            </div>
        </div>
    )
}

export default App
