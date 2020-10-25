import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import generateTree, { TTree } from "../generateTree";

type TState = {
  tree: TTree;
  nextId: number;
};
const initialState: TState = generateTree();

const getAllDescendants = (tree: TTree, id: number) => {
  const descendants = [id];
  const run = (id: number) => {
    tree[id].childIds.forEach((childId) => {
      descendants.push(childId);
      run(childId);
    });
  };

  run(id);
  return descendants;
};

const deleteMany = (tree: TTree, ids: number[]) => {
  console.log(ids);
  ids.forEach((id) => delete tree[id]);
};
const incrementNextId = (state: TState) => {
  state.nextId++;
};

const connectedNodeSlice = createSlice({
  name: "connectedNode",
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      const nodeId = action.payload;
      const { tree } = state;
      tree[nodeId].counter++;
    },
    createNode(state) {
      const { tree, nextId } = state;

      incrementNextId(state);

      tree[nextId] = { id: nextId, counter: 0, childIds: [] };
    },
    deleteNode(state, action: PayloadAction<number>) {
      const { tree } = state;
      const nodeId = action.payload;
      const ids = getAllDescendants(tree, nodeId);

      deleteMany(tree, ids);
    },
    addChild(state, action: PayloadAction<number>) {
      const nodeId = action.payload;
      const childId = state.nextId;
      state.tree[nodeId].childIds.push(childId);
      state.tree[childId] = { id: childId, childIds: [], counter: 0 };
    },
    removeChild(
      state,
      action: PayloadAction<{ nodeId: number; childId: number }>
    ) {
      const { childId, nodeId } = action.payload;
      const filteredChildIds = state.tree[nodeId].childIds.filter(
        (id) => id !== childId
      );
      state.tree[nodeId].childIds = filteredChildIds;
    },
  },
});

export const {
  addChild,
  createNode,
  deleteNode,
  removeChild,
  increment,
} = connectedNodeSlice.actions;
export default connectedNodeSlice.reducer;
