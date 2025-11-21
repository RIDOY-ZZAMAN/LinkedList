import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLocalStorage } from './hooks/useLocalStorage';
import { addTwoLists } from './utils/linkedListUtils';
import LinkedList from './components/LinkedList';

const App: React.FC = () => {
  const [list1, setList1] = useLocalStorage<number[]>('list1', []);
  const [list2, setList2] = useLocalStorage<number[]>('list2', []);
  const result = addTwoLists(list1, list2);

  const onDragEnd = (resultDrag: any) => {
    if (!resultDrag.destination) return;
    const sourceList = resultDrag.source.droppableId === 'list1' ? list1 : list2;
    const setSourceList = resultDrag.source.droppableId === 'list1' ? setList1 : setList2;

    const items = Array.from(sourceList);
    const [reorderedItem] = items.splice(resultDrag.source.index, 1);
    items.splice(resultDrag.destination.index, 0, reorderedItem);
    setSourceList(items);
  };

  const addNumber = (num: number) => {
    if (list1.length <= list2.length) setList1([...list1, num]);
    else setList2([...list2, num]);
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Linked List Builder</h1>
      <div className='flex gap-4 mb-4'>
        {[1,2,3,4,5,6,7,8,9].map(num => (
          <button key={num} onClick={() => addNumber(num)} className='w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center'>{num}</button>
        ))}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className='mb-4'>
          <h2 className='font-semibold'>List 1:</h2>
          <Droppable droppableId='list1' direction='horizontal'>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className='flex'>
                {list1.map((num, index) => (
                  <Draggable key={index} draggableId={`list1-${index}`} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <LinkedList value={num} onRemove={() => setList1(list1.filter((_, i) => i !== index))} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className='mb-4'>
          <h2 className='font-semibold'>List 2:</h2>
          <Droppable droppableId='list2' direction='horizontal'>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className='flex'>
                {list2.map((num, index) => (
                  <Draggable key={index} draggableId={`list2-${index}`} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <LinkedList value={num} onRemove={() => setList2(list2.filter((_, i) => i !== index))} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      <div>
        <h2 className='font-semibold'>Result:</h2>
        <div className='flex'>
          {result.map((num, index) => (
            <LinkedList key={index} value={num} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
