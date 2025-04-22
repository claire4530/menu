import React from 'react';
import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteDialogProps {
  itemId: number; // Change to number since your id is a number
  onDeleteSuccess: () => void; // Callback to refresh UI or handle success
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ itemId, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch('/api/deleteItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: itemId }), // Use the actual item ID
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete the item');
      }

      const data = await response.json();
      console.log(data.message); // Handle success message if needed

      onDeleteSuccess(); // Call the success callback to refresh UI
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className='bg-transparent flex items-center' aria-label="delete">
          <TrashIcon className='h-5 w-5' style={{ color: 'black' }} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>確認刪除此項?</AlertDialogTitle>
          <AlertDialogDescription>這個操作不能恢復，請確認是否繼續。</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            確認
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;