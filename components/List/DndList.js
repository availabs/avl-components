import React from "react"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import { useTheme } from "../../wrappers/with-theme"

const DraggableItem = ({ id, index, children }) =>
  <Draggable draggableId={ `draggable-${ id }` } index={ index }>
    { provided => (
        <div ref={ provided.innerRef } className="flex"
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }>
          <div className="flex-1">
            { children }
          </div>
        </div>
      )
    }
  </Draggable>

const DndList = ({ onDrop, onStart = null, children }) => {
  const onDragEnd = React.useCallback(result => {
    if (!result.destination) return;

    const start = result.source.index,
      end = result.destination.index;

    if (start === end) return;

    onDrop(start, end);
  }, [onDrop]);

  const onDragStart = React.useCallback(result => {
    onStart && onStart(result.source.index);
  })

  const theme = useTheme();

  return (
    <DragDropContext onDragEnd={ onDragEnd } onDragStart={ onDragStart }>
      <Droppable droppableId={ "my-list" } className="box-content">
        { (provided, snapshot) => (
            <div ref={ provided.innerRef }
              { ...provided.droppableProps }
              className={ `
                ${ snapshot.isDraggingOver ? theme.listDragging : theme.list }
              ` }>
                { React.Children.toArray(children).map((child, i) =>
                    <DraggableItem key={ child.key } id={ child.key } index={ i }>
                      { child }
                    </DraggableItem>
                  )
                }
                { provided.placeholder }
            </div>
          )
        }
      </Droppable>
    </DragDropContext>
  )
}
DndList.defaultProps = {
  items: [],
  idAccessor: d => d.id,
  indexAccessor: d => d.index,
  onDrop: (start, end) => {}
}
export default DndList
