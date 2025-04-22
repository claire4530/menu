import React, { useState } from 'react';
import { PlusIcon, MinusIcon,ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface MenuItemCardProps {
  item: MenuItem;
  id: string | string[];
  orderNumber: string;
}
interface MenuItem {
  id: number;
  name: string;
  menu_id: number;
  money: number;
  description: string;
  switchOn: number;
  image:string;
}
const MenuItemCard: React.FC<MenuItemCardProps> = ({ item,id,orderNumber }) => {
  const [number, setNumber] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const decodedId = Array.isArray(id) ? id.map(decodeURIComponent).join(', ') : decodeURIComponent(id);

  const handleDecrease = () => {
    if (number > 0) {
      setNumber(prevNumber => prevNumber - 1);
    }
  };

  const handleIncrease = () => {
    setNumber(prevNumber => prevNumber + 1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const data = {
      tableNumber: decodedId,
      orderNumber: orderNumber,
      name: item.name,
      money: item.money,
      number: number,
      menu_id: item.menu_id,
      state: "新增",
    };
  
    console.log('Submitting data:', data);
  
    try {
      const response = await fetch('/api/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setIsDialogOpen(false);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('An error occurred while adding to the cart');
    }
  };

  // Fallback image URL
  const imageUrl = item.image && item.image.trim() !== "" 
    ? (item.image.startsWith('/') ? item.image : `/${item.image}`) 
    : "/img/beef.jpg";


    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className='grid gap-2'>
          <DialogTrigger asChild>
            <Avatar className="bg-white text-black hover:bg-white rounded-lg w-40 h-40 flex flex-col cursor-pointer">
              <AvatarImage src={imageUrl} alt={item.name} className="object-cover w-full h-full rounded-lg" />
              <AvatarFallback>image</AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <div className="font-bold text-base text-center">
            {item.name}
            <p className="text-gray-800">$ {item.money.toLocaleString()}</p>
          </div>
        </div>
        <DialogContent className="flex h-auto">
          <div className="flex-shrink-0">
            <Image 
              src={imageUrl} 
              width={250} 
              height={250} 
              className="rounded-t-lg mb-1" 
              alt={item.name} 
            />
          </div>
          <div className="ml-4 flex flex-col justify-center gap-4">
            <DialogHeader className="flex flex-col mb-4 gap-2 font-bold">
                <span className="text-xl">{item.name}</span>
              <DialogDescription>{item.description}</DialogDescription>
              <p className="text-base font-bold">$ {item.money.toLocaleString()}</p>
            </DialogHeader>
            <div className="flex items-center ">
              <Button className="bg-[#7e604a] text-white font-semibold hover:text-white hover:bg-[#664233]" size="icon" aria-label="minus" onClick={handleDecrease} type="button">
                <MinusIcon className="h-4 w-4" />
              </Button>
              <Input className="mr-2 ml-2 w-12 text-center" placeholder="0" value={number} readOnly />
              <Button className="bg-[#7e604a] text-white font-semibold hover:text-white hover:bg-[#664233]" size="icon" aria-label="plus" onClick={handleIncrease} type="button">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
            {/* Submit Button Section */}
            <DialogFooter className="flex mt-auto gap-2">
              <Button onClick={handleSubmit} className='bg-[#7e604a] text-white font-semibold hover:text-white hover:bg-[#664233]'>
                <ShoppingCartIcon className="h-4 w-4" />
                加入購物車
              </Button>
            </DialogFooter>
          </div>
      </DialogContent>
      </Dialog>
    );
  };
  export default MenuItemCard;