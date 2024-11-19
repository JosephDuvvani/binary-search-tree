import { TreeNode } from "./tree-node.js";
import { deCloneSort } from "./declone-sort.js";

function builsTree(array) {
  const start = 0;
  const end = array.length - 1;
  const mid = Math.trunc((start + end) / 2);

  if (start === end) return new TreeNode(array[mid]);
  else if (end === 1) {
    const root = new TreeNode(array[mid]);
    root.right = new TreeNode(array[end]);
    return root;
  }

  const root = new TreeNode(array[mid]);
  root.right = builsTree(array.splice(mid + 1));
  root.left = builsTree(array.splice(start, mid));
  return root;
}

export class Tree {
  constructor(arr) {
    this.dataArray = arr || null;
    this.root = builsTree(deCloneSort(arr)) || null;
  }
}

export function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}
