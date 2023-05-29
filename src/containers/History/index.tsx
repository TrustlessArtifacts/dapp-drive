import React from 'react';
import { Wrapper } from './History.styled';
import HistoryList from './HistoryList';

const History: React.FC = (): React.ReactElement => {
  return (
    <Wrapper>
      <div className="row">
        <div className="col-12 col-lg-8 offset-lg-2">
          <h1 className='pageTitle'>
            Artifacts history
          </h1>
          <p className='pageDescription'>
            Lorem ipsum dolor sit amet consectetur. Ultrices tempor lectus ipsum nullam commodo nibh nec vitae augue. Vulputate convallis sit lectus vitae justo donec at.
          </p>
          <div className="listWrapper">
            <HistoryList />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default History;
