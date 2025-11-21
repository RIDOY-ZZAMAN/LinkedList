import React from 'react';
import Circle from './Circle';

interface Props { value: number; onRemove?: () => void; }

const LinkedList: React.FC<Props> = ({ value, onRemove }) => (
  <div className='flex items-center'>
    <Circle value={value} onRemove={onRemove} />
    <span className='mx-2'>→</span>
  </div>
);

export default LinkedList;
