import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button";

interface IncreaseButtonProps {
  name: string; // Add name as a prop
  onQuantityIncreased: () => void; // Optional callback to refresh UI or handle success
}

const IncreaseButton: React.FC<IncreaseButtonProps> = ({ name, onQuantityIncreased }) => {
  const handleClick = async () => {
    try {
      const response = await fetch('/api/increas', {
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
  
        if (onQuantityIncreased) onQuantityIncreased(); // Call callback if provided
      } else {
        console.error('Failed to update quantity:', text);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }; 

  return (
    <Button  variant="ghost" className="rounded-lg w-8 h-8 bg-[#c2b09f] text-white font-semibold hover:text-white hover:bg-[#664233]" aria-label="increase" onClick={handleClick}>
      +
    </Button>
  );
};

export default IncreaseButton;