import { TreeNode } from "./tree-node.js";
import { deCloneSort } from "./declone-sort.js";

export class Tree {
  constructor(arr) {
    this.dataArray = arr || null;
    this.root = builsTree(deCloneSort(arr)) || null;
  }

  insert(value, root = this.root) {
    if (root == null) {
      return new TreeNode(value);
    } else if (value === root.data) return root;

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else {
      root.right = this.insert(value, root.right);
    }
    return root;
  }

  remove(value, root = this.root) {
    if (root == null) return null;
    else if (root.left == null && root.right == null && value === root.data) {
      return null;
    } else if (
      (root.left == null || root.right == null) &&
      value === root.data
    ) {
      if (root.left == null) return root.right;
      else return root.left;
    } else if (root.left != null && root.right != null && value === root.data) {
      let node = root.right;
      while (node.left != null) node = node.left;

      const data = node.data;
      root = this.remove(data, root);
      root.data = data;

      return root;
    }

    if (value < root.data) {
      root.left = this.remove(value, root.left);
    } else {
      root.right = this.remove(value, root.right);
    }
    return root;
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
