const {NotImplementedError} = require('../extensions/index.js');
const {min} = require("mocha/lib/reporters");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.rootNode = null;
    }

    root() {
        return this.rootNode;
    }

    add(data) {
        this.rootNode = addWithin(this.rootNode, data);

        function addWithin(node, data) {
            if (!node) {
                return new Node(data);
            }

            if (data === node.value) {
                return node;
            }

            if (data < node.value) {
                node.left = addWithin(node.left, data);
            } else {
                node.right = addWithin(node.right, data);
            }

            return node;
        }
    }

    has(data) {
        return searchWithin(this.rootNode, data);

        function searchWithin(node, data) {
            if (!node) {
                return false;
            }

            if (data === node.value) {
                return true;
            }

            return data < node.value
                ? searchWithin(node.left, data)
                : searchWithin(node.right, data);
        }
    }

    find(data) {
        return findWithin(this.rootNode, data);

        function findWithin(node, data) {
            if (!node) {
                return null;
            }

            if (data === node.value) {
                return node;
            }

            return data < node.value
                ? findWithin(node.left, data)
                : findWithin(node.right, data);
        }
    }

    remove(data) {
        this.rootNode = removeNode(this.rootNode, data);

        function removeNode(node, data) {
            if (!node) {
                return null;
            }

            if (data < node.value) {
                node.left = removeNode(node.left, data);
                return node;
            } else if (node.value < data) {
                node.right = removeNode(node.right, data);
                return node;
            } else {
                if (!node.left && !node.right) {
                    return null;
                }

                if (!node.left) {
                    return node.right;
                }

                if (!node.right) {
                    return node.left;
                }

                let minFromRight = node.right;
                while (minFromRight.left) {
                    minFromRight = minFromRight.left;
                }
                node.value = minFromRight.value;
                node.right = removeNode(node.right, minFromRight.value);
                return node;
            }
        }
    }

    min() {
        if (!this.rootNode) {
            return null;
        }

        let node = this.rootNode;
        while (node.left) {
            node = node.left;
        }
        return node.value;
    }

    max() {
        if (!this.rootNode) {
            return null;
        }

        let node = this.rootNode;
        while (node.right) {
            node = node.right;
        }
        return node.value;
    }
}

module.exports = {
    BinarySearchTree
};