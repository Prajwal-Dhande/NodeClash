const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'copy-list-with-random-pointer',
    title: 'Copy List with Random Pointer',
    difficulty: 'Medium',
    category: 'Linked List',
    description: `A linked list of length \`n\` is given such that each node contains an additional random pointer, which could point to any node in the list, or \`null\`.

Construct a **deep copy** of the list. The deep copy should consist of exactly \`n\` **brand new** nodes, where each new node has its value set to the value of its corresponding original node. Both the \`next\` and \`random\` pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. **None of the pointers in the new list should point to nodes in the original list**.

Return the head of the copied linked list.

The linked list is represented in the input/output as a list of \`n\` nodes. Each node is represented as a pair of \`[val, random_index]\` where:
- \`val\`: an integer representing \`Node.val\`
- \`random_index\`: the index of the node (range from \`0\` to \`n-1\`) that the \`random\` pointer points to, or \`null\` if it does not point to any node.`,
    examples: [
      { input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]', output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]', explain: '' },
      { input: 'head = [[1,1],[2,1]]', output: '[[1,1],[2,1]]', explain: '' },
      { input: 'head = [[3,null],[3,0],[3,null]]', output: '[[3,null],[3,0],[3,null]]', explain: '' }
    ],
    constraints: [
      '0 <= n <= 1000',
      '-10^4 <= Node.val <= 10^4',
      'Node.random is null or is pointing to some node in the linked list.'
    ],
    testCases: [
      { input: { head: [[7,null],[13,0],[11,4],[10,2],[1,0]] }, expected: [[7,null],[13,0],[11,4],[10,2],[1,0]], functionCall: 'runCopyRandomList([[7,null],[13,0],[11,4],[10,2],[1,0]])' }
    ],
    starterCode: {
      javascript: `/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
function copyRandomList(head) {
    
}`,
      python: `def copyRandomList(head):
    pass`,
      cpp: `Node* copyRandomList(Node* head) {
    
}`,
      java: `public Node copyRandomList(Node head) {
    
}`
    },
    hints: ['You can use a Hash Map to map the original nodes to the new nodes.', 'Alternatively, you can interleave the new nodes with the original nodes to avoid using O(N) extra space.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 56,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 96,
    isFaang: true,
    topCompany: 'Amazon',
    order: 111
  },
  {
    slug: 'remove-duplicates-from-sorted-list',
    title: 'Remove Duplicates from Sorted List',
    difficulty: 'Easy',
    category: 'Linked List',
    description: `Given the \`head\` of a sorted linked list, *delete all duplicates such that each element appears only once*. Return the linked list **sorted** as well.`,
    examples: [
      { input: 'head = [1,1,2]', output: '[1,2]', explain: '' },
      { input: 'head = [1,1,2,3,3]', output: '[1,2,3]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 300].',
      '-100 <= Node.val <= 100',
      'The list is guaranteed to be sorted in ascending order.'
    ],
    testCases: [
      { input: { head: [1,1,2] }, expected: [1,2], functionCall: 'deleteDuplicates(createLinkedList([1,1,2]))' },
      { input: { head: [1,1,2,3,3] }, expected: [1,2,3], functionCall: 'deleteDuplicates(createLinkedList([1,1,2,3,3]))' },
      { input: { head: [] }, expected: [], functionCall: 'deleteDuplicates(createLinkedList([]))' }
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function deleteDuplicates(head) {
    
}`,
      python: `def deleteDuplicates(head):
    pass`,
      cpp: `ListNode* deleteDuplicates(ListNode* head) {
    
}`,
      java: `public ListNode deleteDuplicates(ListNode head) {
    
}`
    },
    hints: ['Keep a pointer to the current node. If the current node\'s value is equal to the next node\'s value, skip the next node.'],
    companies: ['Amazon', 'Microsoft', 'Adobe'],
    acceptance: 51,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 75,
    isFaang: true,
    topCompany: 'Amazon',
    order: 112
  },
  {
    slug: 'remove-duplicates-from-sorted-list-ii',
    title: 'Remove Duplicates from Sorted List II',
    difficulty: 'Medium',
    category: 'Linked List',
    description: `Given the \`head\` of a sorted linked list, *delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list*. Return the linked list **sorted** as well.`,
    examples: [
      { input: 'head = [1,2,3,3,4,4,5]', output: '[1,2,5]', explain: '' },
      { input: 'head = [1,1,1,2,3]', output: '[2,3]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 300].',
      '-100 <= Node.val <= 100',
      'The list is guaranteed to be sorted in ascending order.'
    ],
    testCases: [
      { input: { head: [1,2,3,3,4,4,5] }, expected: [1,2,5], functionCall: 'deleteDuplicates(createLinkedList([1,2,3,3,4,4,5]))' },
      { input: { head: [1,1,1,2,3] }, expected: [2,3], functionCall: 'deleteDuplicates(createLinkedList([1,1,1,2,3]))' },
      { input: { head: [1,1] }, expected: [], functionCall: 'deleteDuplicates(createLinkedList([1,1]))' }
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function deleteDuplicates(head) {
    
}`,
      python: `def deleteDuplicates(head):
    pass`,
      cpp: `ListNode* deleteDuplicates(ListNode* head) {
    
}`,
      java: `public ListNode deleteDuplicates(ListNode head) {
    
}`
    },
    hints: ['Use a dummy node pointing to the head, because the head might be a duplicate and need to be removed.', 'Maintain a `prev` pointer. If you see duplicates, find the end of the duplicates and point `prev.next` to the node after the duplicates.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 48,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 84,
    isFaang: true,
    topCompany: 'Amazon',
    order: 113
  },
  {
    slug: 'lfu-cache',
    title: 'LFU Cache',
    difficulty: 'Hard',
    category: 'Design',
    description: `Design and implement a data structure for a **Least Frequently Used (LFU)** cache.

Implement the \`LFUCache\` class:
- \`LFUCache(int capacity)\` Initializes the object with the \`capacity\` of the data structure.
- \`int get(int key)\` Gets the value of the \`key\` if the \`key\` exists in the cache. Otherwise, returns \`-1\`.
- \`void put(int key, int value)\` Update the value of the \`key\` if present, or inserts the \`key\` if not already present. When the cache reaches its \`capacity\`, it should invalidate and remove the **least frequently used** key before inserting a new item. For this problem, when there is a **tie** (i.e., two or more keys with the same frequency), the **least recently used** \`key\` would be invalidated.

To determine the least frequently used key, a **use counter** is maintained for each key in the cache. The key with the smallest **use counter** is the least frequently used key.

When a key is first inserted into the cache, its **use counter** is set to \`1\` (due to the \`put\` operation). The **use counter** for a key in the cache is incremented either a \`get\` or \`put\` operation is called on it.

The functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.`,
    examples: [
      { input: '["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]', output: '[null, null, null, 1, null, -1, 3, null, -1, 3, 4]', explain: 'LFUCache lfu = new LFUCache(2);\nlfu.put(1, 1);   // cache=[1,_], cnt(1)=1\nlfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1\nlfu.get(1);      // return 1\n                 // cache=[1,2], cnt(2)=1, cnt(1)=2\nlfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.\n                 // cache=[3,1], cnt(3)=1, cnt(1)=2\nlfu.get(2);      // return -1 (not found)\nlfu.get(3);      // return 3\n                 // cache=[3,1], cnt(3)=2, cnt(1)=2\nlfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.\n                 // cache=[4,3], cnt(4)=1, cnt(3)=2\nlfu.get(1);      // return -1 (not found)\nlfu.get(3);      // return 3\n                 // cache=[3,4], cnt(4)=1, cnt(3)=3\nlfu.get(4);      // return 4\n                 // cache=[4,3], cnt(4)=2, cnt(3)=3' }
    ],
    constraints: [
      '1 <= capacity <= 10^4',
      '0 <= key <= 10^5',
      '0 <= value <= 10^9',
      'At most 2 * 10^5 calls will be made to get and put.'
    ],
    testCases: [
      { input: { ops: ["put", "put", "get", "put", "get", "get", "put", "get", "get", "get"], vals: [[1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]], capacity: 2 }, expected: [null, null, 1, null, -1, 3, null, -1, 3, 4], functionCall: 'runLFUCache(["put", "put", "get", "put", "get", "get", "put", "get", "get", "get"], [[1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]], 2)' }
    ],
    starterCode: {
      javascript: `class LFUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        
    }

    /** 
     * @param {number} key
     * @return {number}
     */
    get(key) {
        
    }

    /** 
     * @param {number} key 
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        
    }
}

function runLFUCache(ops, vals, capacity) {
    const lfu = new LFUCache(capacity);
    const result = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "get") result.push(lfu.get(vals[i][0]));
        else if (ops[i] === "put") result.push(lfu.put(vals[i][0], vals[i][1]) ?? null);
    }
    return result;
}`,
      python: `class LFUCache:
    def __init__(self, capacity: int):
        pass

    def get(self, key: int) -> int:
        pass

    def put(self, key: int, value: int) -> None:
        pass`,
      cpp: `class LFUCache {
public:
    LFUCache(int capacity) {
        
    }
    
    int get(int key) {
        
    }
    
    void put(int key, int value) {
        
    }
};`,
      java: `class LFUCache {

    public LFUCache(int capacity) {
        
    }
    
    public int get(int key) {
        
    }
    
    public void put(int key, int value) {
        
    }
}`
    },
    hints: ['To achieve O(1) for both get and put operations, use a HashMap mapping keys to nodes, and another HashMap mapping frequencies to a Doubly Linked List of nodes with that frequency.', 'Also keep track of the minimum frequency to know which Doubly Linked List to evict from when the capacity is reached.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 44,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 96,
    isFaang: true,
    topCompany: 'Amazon',
    order: 114
  },
  {
    slug: 'design-linked-list',
    title: 'Design Linked List',
    difficulty: 'Medium',
    category: 'Design',
    description: `Design your implementation of the linked list. You can choose to use a singly or doubly linked list.
A node in a singly linked list should have two attributes: \`val\` and \`next\`. \`val\` is the value of the current node, and \`next\` is a pointer/reference to the next node.
If you want to use the doubly linked list, you will need one more attribute \`prev\` to indicate the previous node in the linked list. Assume all nodes in the linked list are **0-indexed**.

Implement the \`MyLinkedList\` class:
- \`MyLinkedList()\` Initializes the \`MyLinkedList\` object.
- \`int get(int index)\` Get the value of the \`index^{th}\` node in the linked list. If the index is invalid, return \`-1\`.
- \`void addAtHead(int val)\` Add a node of value \`val\` before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
- \`void addAtTail(int val)\` Append a node of value \`val\` as the last element of the linked list.
- \`void addAtIndex(int index, int val)\` Add a node of value \`val\` before the \`index^{th}\` node in the linked list. If \`index\` equals the length of the linked list, the node will be appended to the end of the linked list. If \`index\` is greater than the length, the node **will not be inserted**.
- \`void deleteAtIndex(int index)\` Delete the \`index^{th}\` node in the linked list, if the index is valid.`,
    examples: [
      { input: '["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]\n[[], [1], [3], [1, 2], [1], [1], [1]]', output: '[null, null, null, null, 2, null, 3]', explain: 'MyLinkedList myLinkedList = new MyLinkedList();\nmyLinkedList.addAtHead(1);\nmyLinkedList.addAtTail(3);\nmyLinkedList.addAtIndex(1, 2);    // linked list becomes 1->2->3\nmyLinkedList.get(1);              // return 2\nmyLinkedList.deleteAtIndex(1);    // now the linked list is 1->3\nmyLinkedList.get(1);              // return 3' }
    ],
    constraints: [
      '0 <= index, val <= 1000',
      'Please do not use the built-in LinkedList library.',
      'At most 2000 calls will be made to get, addAtHead, addAtTail, addAtIndex and deleteAtIndex.'
    ],
    testCases: [
      { input: { ops: ["addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"], vals: [[1], [3], [1, 2], [1], [1], [1]] }, expected: [null, null, null, 2, null, 3], functionCall: 'runMyLinkedList(["addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"], [[1], [3], [1, 2], [1], [1], [1]])' }
    ],
    starterCode: {
      javascript: `class MyLinkedList {
    constructor() {
        
    }

    /** 
     * @param {number} index
     * @return {number}
     */
    get(index) {
        
    }

    /** 
     * @param {number} val
     * @return {void}
     */
    addAtHead(val) {
        
    }

    /** 
     * @param {number} val
     * @return {void}
     */
    addAtTail(val) {
        
    }

    /** 
     * @param {number} index 
     * @param {number} val
     * @return {void}
     */
    addAtIndex(index, val) {
        
    }

    /** 
     * @param {number} index
     * @return {void}
     */
    deleteAtIndex(index) {
        
    }
}

function runMyLinkedList(ops, vals) {
    const list = new MyLinkedList();
    const result = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "addAtHead") result.push(list.addAtHead(vals[i][0]) ?? null);
        else if (ops[i] === "addAtTail") result.push(list.addAtTail(vals[i][0]) ?? null);
        else if (ops[i] === "addAtIndex") result.push(list.addAtIndex(vals[i][0], vals[i][1]) ?? null);
        else if (ops[i] === "deleteAtIndex") result.push(list.deleteAtIndex(vals[i][0]) ?? null);
        else if (ops[i] === "get") result.push(list.get(vals[i][0]));
    }
    return result;
}`,
      python: `class MyLinkedList:
    def __init__(self):
        pass

    def get(self, index: int) -> int:
        pass

    def addAtHead(self, val: int) -> None:
        pass

    def addAtTail(self, val: int) -> None:
        pass

    def addAtIndex(self, index: int, val: int) -> None:
        pass

    def deleteAtIndex(self, index: int) -> None:
        pass`,
      cpp: `class MyLinkedList {
public:
    MyLinkedList() {
        
    }
    
    int get(int index) {
        
    }
    
    void addAtHead(int val) {
        
    }
    
    void addAtTail(int val) {
        
    }
    
    void addAtIndex(int index, int val) {
        
    }
    
    void deleteAtIndex(int index) {
        
    }
};`,
      java: `class MyLinkedList {

    public MyLinkedList() {
        
    }
    
    public int get(int index) {
        
    }
    
    public void addAtHead(int val) {
        
    }
    
    public void addAtTail(int val) {
        
    }
    
    public void addAtIndex(int index, int val) {
        
    }
    
    public void deleteAtIndex(int index) {
        
    }
}`
    },
    hints: ['If you use a doubly linked list, maintain both a head and a tail dummy node for easier insertions and deletions.', 'Be careful with bounds checking on the indices.'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    acceptance: 28,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 75,
    isFaang: true,
    topCompany: 'Amazon',
    order: 115
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/codearena').then(async () => {
  console.log('MongoDB Connected');
  let added = 0;
  for (const p of problems) {
    const existing = await Problem.findOne({ slug: p.slug });
    if (existing) {
      console.log(`Problem ${p.slug} already exists. Updating...`);
      await Problem.updateOne({ slug: p.slug }, p);
    } else {
      await Problem.create(p);
      console.log(`Added ${p.slug}`);
    }
    added++;
  }
  console.log(`Successfully injected ${added} Elite Archive problems.`);
  mongoose.disconnect();
}).catch(err => {
  console.error('DB Connection Error:', err);
  process.exit(1);
});
