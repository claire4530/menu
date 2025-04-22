import React from 'react';

type TotalSumProps = {
  totalSum: number;
};

const TotalSum: React.FC<TotalSumProps> = ({ totalSum }) => {
  return (
    <div className="ml-4 text-xl font-bold flex justify-star">
      <div>
        總計: {totalSum.toLocaleString()} 元
      </div>
    </div>
  );
};

export default TotalSum;