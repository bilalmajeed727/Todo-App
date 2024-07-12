'use client'
import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime: string = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate: string = dateTime.toLocaleDateString();

  return (
    <div className='flex flex-col items-end'>
      <span className='text-[#4C30FF] text-[24px] font-bold leading-[36px]'>{formattedTime}</span>
      <span className='text-[#4C30FF] text-[12px] font-medium leading-[18px]'>{formattedDate}</span>
    </div>
  );
};

export default Clock;
