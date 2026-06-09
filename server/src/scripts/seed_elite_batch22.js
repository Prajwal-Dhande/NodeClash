const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'sort-list',
    title: 'Sort List',
    difficulty: 'Medium',
    category: 'Linked List',
    description: `Given the \`head\` of a linked list, return the list after sorting it in **ascending order**.

Can you sort the linked list in \`O(n log n)\` time and \`O(1)\` memory (i.e. constant space)?`,
    examples: [
      { input: 'head = [4,2,1,3]', output: '[1,2,3,4]', explain: '' },
      { input: 'head = [-1,5,3,4,0]', output: '[-1,0,3,4,5]', explain: '' },
      { input: 'head = []', output: '[]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 5 * 10^4].',
      '-10^5 <= Node.val <= 10^5'
    ],
    testCases: [
      { input: { head: [4,2,1,3] }, expected: [1,2,3,4], functionCall: 'sortList(createLinkedList([4,2,1,3]))' },
      { input: { head: [-1,5,3,4,0] }, expected: [-1,0,3,4,5], functionCall: 'sortList(createLinkedList([-1,5,3,4,0]))' },
      { input: { head: [] }, expected: [], functionCall: 'sortList(createLinkedList([]))' }
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
function sortList(head) {
    
}`,
      python: `def sortList(head):
    pass`,
      cpp: `ListNode* sortList(ListNode* head) {
    
}`,
      java: `public ListNode sortList(ListNode head) {
    
}`
    },
    hints: ['Merge sort can be implemented for a linked list without O(n) space. You just need to change the next pointers.', 'To achieve O(1) space, use a bottom-up iterative merge sort.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 58,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 86,
    isFaang: true,
    topCompany: 'Amazon',
    order: 106
  },
  {
    slug: 'reorder-list',
    title: 'Reorder List',
    difficulty: 'Medium',
    category: 'Linked List',
    description: `You are given the head of a singly linked-list. The list can be represented as:
\`L0 → L1 → … → Ln-1 → Ln\`

Reorder the list to be on the following form:
\`L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …\`

You may not modify the values in the list's nodes. Only nodes themselves may be changed.`,
    examples: [
      { input: 'head = [1,2,3,4]', output: '[1,4,2,3]', explain: '' },
      { input: 'head = [1,2,3,4,5]', output: '[1,5,2,4,3]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the list is in the range [1, 5 * 10^4].',
      '1 <= Node.val <= 1000'
    ],
    testCases: [
      { input: { head: [1,2,3,4] }, expected: [1,4,2,3], functionCall: 'runReorderList([1,2,3,4])' },
      { input: { head: [1,2,3,4,5] }, expected: [1,5,2,4,3], functionCall: 'runReorderList([1,2,3,4,5])' },
      { input: { head: [1,2] }, expected: [1,2], functionCall: 'runReorderList([1,2])' }
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
function reorderList(head) {
    
}

// Wrapper to return the modified list
function runReorderList(arr) {
    if(!arr || arr.length === 0) return [];
    let head = createLinkedList(arr);
    reorderList(head);
    return linkedListToArray(head);
}`,
      python: `def reorderList(head):
    pass`,
      cpp: `void reorderList(ListNode* head) {
    
}`,
      java: `public void reorderList(ListNode head) {
    
}`
    },
    hints: ['Find the middle of the linked list.', 'Reverse the second half of the linked list.', 'Merge the two halves alternately.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 56,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 94,
    isFaang: true,
    topCompany: 'Amazon',
    order: 107
  },
  {
    slug: 'rotate-list',
    title: 'Rotate List',
    difficulty: 'Medium',
    category: 'Linked List',
    description: `Given the \`head\` of a linked list, rotate the list to the right by \`k\` places.`,
    examples: [
      { input: 'head = [1,2,3,4,5], k = 2', output: '[4,5,1,2,3]', explain: '' },
      { input: 'head = [0,1,2], k = 4', output: '[2,0,1]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 500].',
      '-100 <= Node.val <= 100',
      '0 <= k <= 2 * 10^9'
    ],
    testCases: [
      { input: { head: [1,2,3,4,5], k: 2 }, expected: [4,5,1,2,3], functionCall: 'rotateRight(createLinkedList([1,2,3,4,5]), 2)' },
      { input: { head: [0,1,2], k: 4 }, expected: [2,0,1], functionCall: 'rotateRight(createLinkedList([0,1,2]), 4)' },
      { input: { head: [1,2], k: 0 }, expected: [1,2], functionCall: 'rotateRight(createLinkedList([1,2]), 0)' }
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
 * @param {number} k
 * @return {ListNode}
 */
function rotateRight(head, k) {
    
}`,
      python: `def rotateRight(head, k):
    pass`,
      cpp: `ListNode* rotateRight(ListNode* head, int k) {
    
}`,
      java: `public ListNode rotateRight(ListNode head, int k) {
    
}`
    },
    hints: ['Connect the last node to the head to form a cycle.', 'Find the new tail, which is (length - k % length - 1)th node from the head.', 'The new head is new_tail.next, and then break the cycle by setting new_tail.next = null.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 37,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 75,
    isFaang: true,
    topCompany: 'Amazon',
    order: 108
  },
  {
    slug: 'reverse-nodes-in-k-group',
    title: 'Reverse Nodes in k-Group',
    difficulty: 'Hard',
    category: 'Linked List',
    description: `Given the \`head\` of a linked list, reverse the nodes of the list \`k\` at a time, and return the modified list.

\`k\` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of \`k\` then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.`,
    examples: [
      { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]', explain: '' },
      { input: 'head = [1,2,3,4,5], k = 3', output: '[3,2,1,4,5]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the list is n.',
      '1 <= k <= n <= 5000',
      '0 <= Node.val <= 1000'
    ],
    testCases: [
      { input: { head: [1,2,3,4,5], k: 2 }, expected: [2,1,4,3,5], functionCall: 'reverseKGroup(createLinkedList([1,2,3,4,5]), 2)' },
      { input: { head: [1,2,3,4,5], k: 3 }, expected: [3,2,1,4,5], functionCall: 'reverseKGroup(createLinkedList([1,2,3,4,5]), 3)' },
      { input: { head: [1,2,3,4,5], k: 1 }, expected: [1,2,3,4,5], functionCall: 'reverseKGroup(createLinkedList([1,2,3,4,5]), 1)' }
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
 * @param {number} k
 * @return {ListNode}
 */
function reverseKGroup(head, k) {
    
}`,
      python: `def reverseKGroup(head, k):
    pass`,
      cpp: `ListNode* reverseKGroup(ListNode* head, int k) {
    
}`,
      java: `public ListNode reverseKGroup(ListNode head, int k) {
    
}`
    },
    hints: ['Check if there are at least k nodes left. If not, return the head.', 'Reverse the first k nodes. Then recursively call the function for the rest of the list and connect it to the reversed part.'],
    companies: ['Amazon', 'Microsoft', 'ByteDance'],
    acceptance: 58,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 97,
    isFaang: true,
    topCompany: 'Amazon',
    order: 109
  },
  {
    slug: 'reverse-linked-list-ii',
    title: 'Reverse Linked List II',
    difficulty: 'Medium',
    category: 'Linked List',
    description: `Given the \`head\` of a singly linked list and two integers \`left\` and \`right\` where \`left <= right\`, reverse the nodes of the list from position \`left\` to position \`right\`, and return the reversed list.`,
    examples: [
      { input: 'head = [1,2,3,4,5], left = 2, right = 4', output: '[1,4,3,2,5]', explain: '' },
      { input: 'head = [5], left = 1, right = 1', output: '[5]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the list is n.',
      '1 <= n <= 500',
      '-500 <= Node.val <= 500',
      '1 <= left <= right <= n'
    ],
    testCases: [
      { input: { head: [1,2,3,4,5], left: 2, right: 4 }, expected: [1,4,3,2,5], functionCall: 'reverseBetween(createLinkedList([1,2,3,4,5]), 2, 4)' },
      { input: { head: [5], left: 1, right: 1 }, expected: [5], functionCall: 'reverseBetween(createLinkedList([5]), 1, 1)' },
      { input: { head: [1,2], left: 1, right: 2 }, expected: [2,1], functionCall: 'reverseBetween(createLinkedList([1,2]), 1, 2)' }
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
function reverseBetween(head, left, right) {
    
}`,
      python: `def reverseBetween(head, left, right):
    pass`,
      cpp: `ListNode* reverseBetween(ListNode* head, int left, int right) {
    
}`,
      java: `public ListNode reverseBetween(ListNode head, int left, int right) {
    
}`
    },
    hints: ['Use a dummy node to handle edge cases where the head changes.', 'Traverse to the (left - 1)th node. Then carefully reverse the pointers for the sublist from left to right.'],
    companies: ['Amazon', 'Microsoft', 'Meta'],
    acceptance: 47,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 85,
    isFaang: true,
    topCompany: 'Amazon',
    order: 110
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
