import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { TTree } from "../generateTree";
import {
  addChild,
  createNode,
  deleteNode,
  removeChild,
  increment,
} from "./connectedNodeSlice";

type ConnectedNodeProps = {
  id: number;
  parentId?: number;
};

const ConnectedNode = function (props: ConnectedNodeProps) {
  const { tree } = useSelector((state: RootState) => state.connectedNode);
  const dispatch = useDispatch();

  const { id, parentId } = props;

  const { childIds, counter } = tree[id];

  const handleIncrementClick = () => {
    const { id } = props;
    dispatch(increment(id));
  };

  const handleAddChildClick = () => {
    // e.preventDefault();

    const { id } = props;
    dispatch(createNode());
    dispatch(addChild(id));
  };

  const handleRemoveClick = () => {
    // e.preventDefault();

    const { id, parentId } = props;
    dispatch(removeChild({ nodeId: parentId!, childId: id }));
    dispatch(deleteNode(id));
  };

  const renderChild = (childId: number) => {
    const { id } = props;
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} />
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
        {childIds.map(renderChild)}
        <li key="add">
          <button className="btn btn-add-child" onClick={handleAddChildClick}>
            Add Child
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ConnectedNode;
