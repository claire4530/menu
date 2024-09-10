import React, { useEffect } from 'react';

interface OrderDetailsProps {
    field: {
        value: Date;
        onChange: (newValue: Date) => void;
    };
}

const DateTimeReadOnly: React.FC<OrderDetailsProps> = ({ field }) => {
    // Get current time
    const now = new Date();

    // Function to format date for datetime-local input
    const formatDate = (date: Date) => {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // Update the field with the current time on initial render
    useEffect(() => {
        field.onChange(now);  // Automatically update the field to the current time
    }, [field]);

    return (
        <div className='flex'>
            <label htmlFor='meeting-time' className='sr-only'>Meeting Time</label>
            <input
                className='appearance-none border border-gray-400 rounded py-3 px-2 mr-6'
                type="datetime-local"
                name="meeting-time"
                value={formatDate(field.value || now)} // Set the value to the current time
                id='meeting-time'
                readOnly // Disable user input by making the field read-only
            />
        </div>
    );
};

export default DateTimeReadOnly;

