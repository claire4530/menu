'use client'
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import cookerImage from '../devicePhoto/cooker.png'
import MenuItems from './menu-items'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

interface menuProps {
    name: string
    id: number
    description: string
    money: number
    switchOn: boolean
    image: string
}
const EditMenuItems: React.FC<menuProps> = ({
    id,
    name,
    description,
    money,
    switchOn,
    image,
}) => {

    const [areaName, setAreaName] = useState(name)
    const [areaImage, setAreaImage] = useState(image)
    const [areaDescription, setAreaDescription] = useState(description)
    const [areaMoney, setAreaMoney] = useState(money)
    const [areaSwitchOn, setAreaSwitchOn] = useState(switchOn)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const returnToPrevious = () => {
        setAreaName(name);
        setAreaImage(image);
        setAreaDescription(description);
        setAreaMoney(money);
        setAreaSwitchOn(switchOn);
        setSuccessMessage("");
        setErrorMessage("");
    }
    return (
        <Dialog>
            <DialogTrigger>
                <Avatar className="bg-white text-black hover:bg-white rounded-lg w-40 h-40 flex flex-col" onClick={returnToPrevious}>
                    <AvatarImage src={areaImage} alt="@shadcn" />
                    <AvatarFallback>image</AvatarFallback>
                </Avatar>
                <div className="pt-2 font-bold text-base">
                    {name}
                </div>
            </DialogTrigger>
            <DialogContent>
                <MenuItems id={id} name={name} description={description} money={money} switchOn={switchOn} image={image}/>
            </DialogContent>
        </Dialog>
    )
}

export default EditMenuItems