import React from 'react';
import { motion } from 'framer-motion';

interface Props { value: number; onRemove?: () => void; }

const Circle: React.FC<Props> = ({ value, onRemove }) => (
  <motion.div className='w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center m-2 relative' initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
    {value}
    {onRemove && <button onClick={onRemove} className='absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2'>X</button>}
  </motion.div>
);

export default Circle;
