import React from 'react';

interface OrderDetailsProps {
    field: {
        value: Date;
        onChange: (newValue: Date) => void;
    };
}

const DateTime: React.FC<OrderDetailsProps> = ({ field }) => {
    // Get current time
    const now = new Date();
    // Get time two weeks later
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(now.getDate() + 14);

    // Function to format date for datetime-local input
    const formatDate = (date: Date) => {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <div className='flex'>
            <label htmlFor='meeting-time' className='sr-only'>Meeting Time</label>
            <input
                className='appearance-none border border-gray-400 rounded py-3 px-2 mr-4'
                type="datetime-local"
                name="meeting-time"
                value={field.value ? formatDate(field.value) : formatDate(now)} // Default value is now
                id='meeting-time'
                min={formatDate(now)} // Minimum date/time is now
                max={formatDate(twoWeeksLater)} // Maximum date/time is two weeks later
                onChange={(e) => {
                    // Convert the local time string to a UTC Date object
                    const [date, time] = e.target.value.split('T');
                    const [hours, minutes] = time.split(':');
                    const [year, month, day] = date.split('-').map(Number);

                    // Create a UTC Date object
                    const newValue = new Date(Date.UTC(year, month - 1, day, Number(hours), Number(minutes)));
                    field.onChange(newValue);
                }}
            />
        </div>
    );
};

export default DateTime;



