import React, { useState, useEffect } from 'react';
import { MinusIcon } from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button";
import { Orderlist } from './types';

interface DecreaseButtonProps {
  name: string; // Add name as a prop
  quantity: number; // Add quantity as a prop
  onQuantityDecreased: () => void; // Optional callback to refresh UI or handle success
}

const DecreaseButton: React.FC<DecreaseButtonProps> = ({ name, quantity, onQuantityDecreased }) => {
  const handleClick = async () => {
    if (quantity <= 1) {
      console.warn('Quantity cannot be decreased below 1');
      return;
    }

    try {
      const response = await fetch('/api/decreas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }), // Ensure `name` is properly included
      });

      const text = await response.text(); // Get raw text first
      console.log('Response text:', text);

      if (response.ok) {
        const json = JSON.parse(text); // Parse JSON from the text
        console.log('Response JSON:', json);

        if (onQuantityDecreased) onQuantityDecreased(); // Call callback if provided
      } else {
        console.error('Failed to update quantity:', text);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Button variant="ghost" className="text-xl rounded-lg w-8 h-8 bg-[#c2b09f] text-white font-semibold hover:text-white hover:bg-[#664233]" aria-label="decrease" onClick={handleClick}>
      -
    </Button>
  );
};

export default DecreaseButton;