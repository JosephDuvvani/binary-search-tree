import { Tree, prettyPrint, height } from "./tree.js";

//Rondom Array Generator
const generateArray = () => {
  let array = [];
  for (let i = 0; i < 20; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
};

//Tree
const tree = new Tree(generateArray());

prettyPrint(tree.root);

console.log(`IsBalanced  : ${tree.isBalanced()}`);
console.log("");

//Traversal Orders
function printTraversalOrders(tree) {
  let levelOrderArr = [];
  let preOrderArr = [];
  let postOrderArr = [];
  let inOrderArr = [];

  tree.levelOrder((node) => {
    levelOrderArr.push(node.data);
  });

  tree.preOrder((node) => {
    preOrderArr.push(node.data);
  });

  tree.postOrder((node) => {
    postOrderArr.push(node.data);
  });

  tree.inOrder((node) => {
    inOrderArr.push(node.data);
  });

  console.log(`Level-order : ${levelOrderArr.join(" ")}`);
  console.log(`Pre-order   : ${preOrderArr.join(" ")}`);
  console.log(`Post-order  : ${postOrderArr.join(" ")}`);
  console.log(`In-order    : ${inOrderArr.join(" ")}`);
}

printTraversalOrders(tree);
console.log("");

//Unbalance the Tree
tree.insert(105);
tree.insert(501);
tree.insert(200);

console.log(`IsBalanced  : ${tree.isBalanced()}`);
console.log("");

tree.rebalance();

console.log(`Rebalanced  : ${tree.isBalanced()}`);
console.log("");

printTraversalOrders(tree);
