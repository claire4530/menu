import Form from './form'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from "@/components/ui/button"
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
const AddAreas = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="mr-2 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                    新增分類
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form />
            </DialogContent>
        </Dialog>
    )
}

export default AddAreas