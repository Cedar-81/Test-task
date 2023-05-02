import React from "react";
import { Draggable } from "react-beautiful-dnd";

const TableRow = ({ data, index }) => {
  const rowStyle =
    "rounded-lg border-[1px] border-white/50 min-h-[4rem] flex items-center w-full";
  return (
    <Draggable key={data.id} index={index} draggableId={"draggable-" + data.id}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          key={data.id}
          className={
            snapshot.isDragging ? rowStyle + "shadow-xl border-brand" : rowStyle
          }
        >
          <div className="px-4 w-[10%] text-sm">{data.id}</div>
          <div className="px-4 w-[40%] flex gap-x-4 text-white/70">
            <img className=" w-20 h-12 rounded-lg" src={data.photo} />
            {data.title}
          </div>
          <div className="px-4 w-[40%] text-sm flex gap-4 text-brand/20 items-center">
            <img className="h-5 w-5 rounded-full" src={data.photo} />
            {data.username}
          </div>
          <div className="px-4 w-[20%] !text-right text-sm">{data.like}</div>
        </div>
      )}
    </Draggable>
  );
};

export default TableRow;
