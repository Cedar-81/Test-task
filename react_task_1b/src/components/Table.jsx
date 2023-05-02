import React, { useState, useEffect } from "react";
import TableRow from "./TableRow";
import MkdSDK from "../utils/MkdSDK";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const staticdata = [
  {
    id: 1,
    name: "Apple",
    description: "A delicious fruit",
    img: "https://images.pexels.com/photos/884977/pexels-photo-884977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "Banana",
    description: "A tasty snack",
    img: "https://images.pexels.com/photos/884977/pexels-photo-884977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "Orange",
    description: "A citrus fruit",
    img: "https://images.pexels.com/photos/884977/pexels-photo-884977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    name: "Grapes",
    description: "A sweet fruit",
    img: "https://images.pexels.com/photos/884977/pexels-photo-884977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 5,
    name: "Pineapple",
    description: "A tropical fruit",
    img: "https://images.pexels.com/photos/884977/pexels-photo-884977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const Table = () => {
  const [_data, setData] = useState();
  const [page, setPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  let sdk = new MkdSDK();

  useEffect(() => {
    page == 1 || (page == 12 && setDisabled(true));
    const getData = async () => {
      sdk.setTable("video");
      const data = await sdk.callRestAPI(
        {
          page,
        },
        "PAGINATE"
      );
      setData(data);
    };

    getData();
  }, [page]);

  console.log(_data, "disabled", disabled);
  return (
    <DragDropContext
      onDragEnd={(param) => {
        const srcIndex = param.source.index;
        const destinationIndex = param.destination.index;
        _data.list.splice(
          destinationIndex,
          0,
          _data.list.splice(srcIndex, 1)[0]
        );

        console.log(props);
      }}
    >
      <div className=" w-full mt-8 text-white/50">
        <div className="flex">
          <p className="table-row w-[10%] border-none py-0 pb-4">#</p>
          <p className="table-row w-[40%] border-none py-0 pb-4">Title</p>
          <p className="table-row w-[40%] border-none py-0 pb-4">Author</p>
          <p className="table-row !text-right w-[20%] border-none py-0 pb-4">
            Most Liked
          </p>
        </div>

        <Droppable droppableId="droppable-1">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-full table-rows"
            >
              {_data &&
                _data.list.map((row, index) => (
                  <TableRow key={row.id} index={index} data={row} />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {_data && (
          <div className="my-8 flex w-full justify-between">
            <button
              className={_data.page > 1 ? "button-active" : "button-disabled"}
              onClick={() =>
                setPage((prev) => (prev > 0 ? prev - 1 : (prev = 1)))
              }
              disabled={_data.page == 1}
            >
              Prev
            </button>
            <button
              className={_data.page < 12 ? "button-active" : "button-disabled"}
              onClick={() =>
                setPage((prev) => (prev <= 12 ? prev + 1 : (prev = 12)))
              }
              disabled={_data.page == 12}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default Table;
