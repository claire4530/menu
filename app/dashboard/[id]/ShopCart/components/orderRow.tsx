import React from 'react';
import IncreaseButton from './plusButton';
import DecreaseButton from './minusButton';
import DeleteButton from './deleteButton';
import { Orderlist } from './types';


interface OrderItemProps {
  item: Orderlist;
  index: number;
  onQuantityDecreased: (index: number) => void;
  handleQuantityIncreased: (index: number) => void;
  handleDelete: (id: number) => void; // Change to number since your id is a number
}

const OrderItem: React.FC<OrderItemProps> = ({
  item,
  index,
  onQuantityDecreased,
  handleQuantityIncreased,
  handleDelete,
}) => {
  const subTotal = item.money * item.number;

  const handleDeleteSuccess = () => {
    handleDelete(item.id);
  };

  return (
    <div>
      <div className='hover:bg-gray-100 rounded-lg p-4 '>
        <div className="flex justify-between text-[18px] items-center">
          <span className='w-[140px]'>{item.name}</span>
          <span className='w-[120px]'>{item.money.toLocaleString()}</span>
          <span className='w-[180px] flex gap-4'>
            <DecreaseButton
              name={item.name}
              quantity={item.number} // Pass the current quantity
              onQuantityDecreased={() => onQuantityDecreased(index)}
            />
            {item.number}
            <IncreaseButton name={item.name} onQuantityIncreased={() => handleQuantityIncreased(index)} />
          </span>
          <span className='w-[100px]'>{subTotal.toLocaleString()}</span>
          <span className='text-right'>
            <DeleteButton itemId={item.id} onDeleteSuccess={handleDeleteSuccess} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;