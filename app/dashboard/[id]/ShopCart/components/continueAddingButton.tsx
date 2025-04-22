// ContinueAddingButton.tsx
import React from 'react';
import { Button } from "@/components/ui/button";

const ContinueAddingButton: React.FC = () => {
  const handleContinue = () => {
    console.log('handleContinue called at', new Date());
    window.location.href = '/dashboard';
  };

  return (
    <Button
      className="mr-4 px-8 py-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      onClick={handleContinue}
    >
      繼續加點
    </Button>
  );
};

export default ContinueAddingButton;