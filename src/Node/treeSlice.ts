import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import generateTree, { TTree } from "../generateTree";

const { tree, idCount } = generateTree();

let nextId = idCount;
const initialState = tree;

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
  ids.forEach((id) => delete tree[id]);
};

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      const nodeId = action.payload;
      state[nodeId].counter++;
    },
    createNode(state) {
      nextId++;
      state[nextId] = { id: nextId, counter: 0, childIds: [] };
    },
    deleteNode(state, action: PayloadAction<number>) {
      const nodeId = action.payload;
      const ids = getAllDescendants(state, nodeId);

      deleteMany(state, ids);
    },
    addChild(state, action: PayloadAction<number>) {
      const nodeId = action.payload;
      const childId = nextId;
      state[nodeId].childIds.push(childId);
      state[childId] = { id: childId, childIds: [], counter: 0 };
    },
    removeChild(
      state,
      action: PayloadAction<{ nodeId: number; childId: number }>
    ) {
      const { childId, nodeId } = action.payload;
      const filteredChildIds = state[nodeId].childIds.filter(
        (id) => id !== childId
      );
      state[nodeId].childIds = filteredChildIds;
    },
  },
});

export const {
  addChild,
  createNode,
  deleteNode,
  removeChild,
  increment,
} = treeSlice.actions;
export default treeSlice.reducer;
