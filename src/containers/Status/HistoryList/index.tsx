import React, { } from 'react';
import { StyledHistoryList } from './HistoryList.styled';
import ProcessingList from '../ProcessingList';
import ProcessedList from '../ProcessedList';

const HistoryList: React.FC = (): React.ReactElement => {
  return (
    <StyledHistoryList>
      <ProcessingList />
      <ProcessedList />
    </StyledHistoryList>
  );
};

export default HistoryList;
