import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  addChild,
  createNode,
  deleteNode,
  removeChild,
  increment,
} from "./treeSlice";

type NodeProps = {
  id: number;
  parentId?: number;
};

const Node = React.memo(({ id, parentId }: NodeProps) => {
  const node = useSelector((state: RootState) => state.tree[id]);
  const dispatch = useDispatch();

  const { childIds, counter } = node;

  const handleIncrementClick = () => {
    dispatch(increment(id));
  };

  const handleAddChildClick = () => {
    dispatch(createNode());
    dispatch(addChild(id));
  };

  const handleRemoveClick = () => {
    dispatch(removeChild({ nodeId: parentId!, childId: id }));
    dispatch(deleteNode(id));
  };

  const renderChild = (childId: number, id: number) => {
    return (
      <li key={childId}>
        <Node id={childId} parentId={id} />
      </li>
    );
  };

  return (
    <div className="node">
      Counter: {counter}{" "}
      <button className="btn btn-counter" onClick={handleIncrementClick}>
        +
      </button>{" "}
      {typeof parentId !== "undefined" && (
        <button className="btn btn-remove" onClick={handleRemoveClick}>
          X
        </button>
      )}
      <ul className="node-children">
        {childIds.map((childId) => renderChild(childId, id))}
        <li key="add">
          <button className="btn btn-add-child" onClick={handleAddChildClick}>
            Add Child
          </button>
        </li>
      </ul>
    </div>
  );
});

export default Node;
