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

  find(value) {
    let node = this.root;
    while (node != null && node.data != value) {
      if (value < node.data) node = node.left;
      else node = node.right;
    }
    return node;
  }

  levelOrder(callback, nodes = [this.root]) {
    if (!callback) throw new Error("No callback function passed in.");
    if (this.root == null) return undefined;

    if (nodes.length === 0) return;

    let queue = [];
    nodes.forEach((node) => {
      callback(node);
      if (node.left != null) queue.push(node.left);
      if (node.right != null) queue.push(node.right);
    });

    this.levelOrder(callback, queue);
    return;
  }

  inOrder(callback, root = this.root) {
    if (!callback) throw new Error("No callback function passed in.");
    if (root == null) return;
    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
    return;
  }

  preOrder(callback, root = this.root) {
    if (!callback) throw new Error("No callback function passed in.");
    if (root == null) return;
    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
    return;
  }
  postOrder(callback, root = this.root) {
    if (!callback) throw new Error("No callback function passed in.");
    if (root == null) return;
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
    return;
  }

  depth(node) {
    if (node == null)
      throw new Error("Cannot find depth of null (node = null)");
    if (this.root == null) return null;
    let tmpNode = this.root;
    let depth = 1;
    while (tmpNode != null) {
      if (tmpNode.data === node.data) break;

      if (node.data < tmpNode.data) tmpNode = tmpNode.left;
      else tmpNode = tmpNode.right;
      depth++;
    }
    if (tmpNode == null) return null;

    return depth;
  }

  isBalanced() {
    if (this.root == null) return true;

    const diff = height(this.root.left) - height(this.root.right);
    if (diff >= -1 && diff <= 1) return true;

    return false;
  }

  rebalance() {
    let newArr = [];
    this.inOrder((node) => {
      newArr.push(node.data);
    });
    this.root = builsTree(newArr);
  }
}

export function height(node) {
  if (node == null) return 0;

  let left = 1 + height(node.left);
  let right = 1 + height(node.right);

  if (left >= right) return left;
  else return right;
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
