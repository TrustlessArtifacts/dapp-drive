import React from 'react';
import ProcessingList from '../ProcessingList';
import ProcessedList from '../ProcessedList';

const HistoryList: React.FC = (): React.ReactElement => {
  return (
    <div>
      <ProcessingList />
      <ProcessedList />
    </div>
  );
};

export default HistoryList;
