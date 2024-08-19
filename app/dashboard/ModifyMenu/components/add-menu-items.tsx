'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import cookerImage from '../devicePhoto/cooker.png'
import FormMenu from './form-menu-items'

interface menuProps {
    menu_id: number
}

const AddMenuItems: React.FC<menuProps> = ({
    menu_id,
}) => {

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline" className="mr-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                    新增菜品
                </Button>
            </DialogTrigger>
            <DialogContent>
                <FormMenu menu_id={menu_id}/>
            </DialogContent>
        </Dialog>
    )
}

export default AddMenuItems