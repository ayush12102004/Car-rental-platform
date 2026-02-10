import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, differenceInDays } from 'date-fns';

const AvailabilityCalendar = ({ carId, onDatesSelected }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [blockedDates, setBlockedDates] = useState([]);

    // Mock fetching blocked dates
    useEffect(() => {
        // In a real app, fetch from backend
        // const fetchBlockedDates = async () => { ... }
        // fetchBlockedDates();
        setBlockedDates([
            // Example blocked dates
            // addDays(new Date(), 2),
            // addDays(new Date(), 3)
        ]);
    }, [carId]);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        if (start && end) {
            onDatesSelected({ startDate: start, endDate: end });
        } else {
            onDatesSelected(null);
        }
    };

    return (
        <div className="availability-calendar">
            <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                excludeDates={blockedDates}
                selectsRange
                inline
                minDate={new Date()}
                monthsShown={1}
                className="w-full border rounded-lg p-2"
                calendarClassName="!w-full !border-0"
            />
        </div>
    );
};

export default AvailabilityCalendar;
