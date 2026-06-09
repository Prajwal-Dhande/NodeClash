const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Problem = require('../models/Problem');

const problems = [
  {
    slug: 'palindrome-linked-list',
    title: 'Palindrome Linked List',
    difficulty: 'Easy',
    category: 'Linked List',
    description: `Given the \`head\` of a singly linked list, return \`true\` if it is a **palindrome** or \`false\` otherwise.`,
    examples: [
      { input: 'head = [1,2,2,1]', output: 'true', explain: '' },
      { input: 'head = [1,2]', output: 'false', explain: '' }
    ],
    constraints: [
      'The number of nodes in the list is in the range [1, 10^5].',
      '0 <= Node.val <= 9'
    ],
    testCases: [
      { input: { head: [1,2,2,1] }, expected: true, functionCall: 'isPalindrome(createLinkedList([1,2,2,1]))' },
      { input: { head: [1,2] }, expected: false, functionCall: 'isPalindrome(createLinkedList([1,2]))' },
      { input: { head: [1,2,3,2,1] }, expected: true, functionCall: 'isPalindrome(createLinkedList([1,2,3,2,1]))' }
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
 * @return {boolean}
 */
function isPalindrome(head) {
    
}`,
      python: `def isPalindrome(head):
    pass`,
      cpp: `bool isPalindrome(ListNode* head) {
    
}`,
      java: `public boolean isPalindrome(ListNode head) {
    
}`
    },
    hints: ['Find the middle of the linked list using fast and slow pointers.', 'Reverse the second half of the linked list.', 'Compare the first half and the reversed second half.'],
    companies: ['Amazon', 'Microsoft', 'Meta'],
    acceptance: 51,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 86,
    isFaang: true,
    topCompany: 'Amazon',
    order: 101
  },
  {
    slug: 'remove-nth-node-from-end-of-list',
    title: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    category: 'Linked List',
    description: `Given the \`head\` of a linked list, remove the \`n^{th}\` node from the end of the list and return its head.`,
    examples: [
      { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]', explain: '' },
      { input: 'head = [1], n = 1', output: '[]', explain: '' },
      { input: 'head = [1,2], n = 1', output: '[1]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the list is sz.',
      '1 <= sz <= 30',
      '0 <= Node.val <= 100',
      '1 <= n <= sz'
    ],
    testCases: [
      { input: { head: [1,2,3,4,5], n: 2 }, expected: [1,2,3,5], functionCall: 'removeNthFromEnd(createLinkedList([1,2,3,4,5]), 2)' },
      { input: { head: [1], n: 1 }, expected: [], functionCall: 'removeNthFromEnd(createLinkedList([1]), 1)' },
      { input: { head: [1,2], n: 1 }, expected: [1], functionCall: 'removeNthFromEnd(createLinkedList([1,2]), 1)' }
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
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
    
}`,
      python: `def removeNthFromEnd(head, n):
    pass`,
      cpp: `ListNode* removeNthFromEnd(ListNode* head, int n) {
    
}`,
      java: `public ListNode removeNthFromEnd(ListNode head, int n) {
    
}`
    },
    hints: ['Maintain two pointers and delay the start of the second pointer by n steps.', 'When the first pointer reaches the end, the second pointer will be pointing to the (n+1)th node from the end. Now you can remove the nth node.'],
    companies: ['Amazon', 'Meta', 'Microsoft'],
    acceptance: 43,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 93,
    isFaang: true,
    topCompany: 'Amazon',
    order: 102
  },
  {
    slug: 'swap-nodes-in-pairs',
    title: 'Swap Nodes in Pairs',
    difficulty: 'Medium',
    category: 'Linked List',
    description: `Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)`,
    examples: [
      { input: 'head = [1,2,3,4]', output: '[2,1,4,3]', explain: '' },
      { input: 'head = []', output: '[]', explain: '' },
      { input: 'head = [1]', output: '[1]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 100].',
      '0 <= Node.val <= 100'
    ],
    testCases: [
      { input: { head: [1,2,3,4] }, expected: [2,1,4,3], functionCall: 'swapPairs(createLinkedList([1,2,3,4]))' },
      { input: { head: [] }, expected: [], functionCall: 'swapPairs(createLinkedList([]))' },
      { input: { head: [1] }, expected: [1], functionCall: 'swapPairs(createLinkedList([1]))' }
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
function swapPairs(head) {
    
}`,
      python: `def swapPairs(head):
    pass`,
      cpp: `ListNode* swapPairs(ListNode* head) {
    
}`,
      java: `public ListNode swapPairs(ListNode head) {
    
}`
    },
    hints: ['Use a dummy node to ease the swapping process.', 'Keep track of the previous node, the current node, and the next node to carefully switch the pointers.'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptance: 63,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 84,
    isFaang: true,
    topCompany: 'Amazon',
    order: 103
  },
  {
    slug: 'odd-even-linked-list',
    title: 'Odd Even Linked List',
    difficulty: 'Medium',
    category: 'Linked List',
    description: `Given the \`head\` of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The **first** node is considered **odd**, and the **second** node is **even**, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in \`O(1)\` extra space complexity and \`O(n)\` time complexity.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[1,3,5,2,4]', explain: '' },
      { input: 'head = [2,1,3,5,6,4,7]', output: '[2,3,6,7,1,5,4]', explain: '' }
    ],
    constraints: [
      'The number of nodes in the linked list is in the range [0, 10^4].',
      '-10^6 <= Node.val <= 10^6'
    ],
    testCases: [
      { input: { head: [1,2,3,4,5] }, expected: [1,3,5,2,4], functionCall: 'oddEvenList(createLinkedList([1,2,3,4,5]))' },
      { input: { head: [2,1,3,5,6,4,7] }, expected: [2,3,6,7,1,5,4], functionCall: 'oddEvenList(createLinkedList([2,1,3,5,6,4,7]))' },
      { input: { head: [1,2] }, expected: [1,2], functionCall: 'oddEvenList(createLinkedList([1,2]))' }
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
function oddEvenList(head) {
    
}`,
      python: `def oddEvenList(head):
    pass`,
      cpp: `ListNode* oddEvenList(ListNode* head) {
    
}`,
      java: `public ListNode oddEvenList(ListNode head) {
    
}`
    },
    hints: ['Maintain two pointers, odd and even.', 'Connect the odd pointer to the next odd node, and the even pointer to the next even node.', 'Remember to connect the end of the odd list to the head of the even list.'],
    companies: ['Amazon', 'Meta', 'Bloomberg'],
    acceptance: 61,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 82,
    isFaang: true,
    topCompany: 'Amazon',
    order: 104
  },
  {
    slug: 'add-two-numbers',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    category: 'Linked List',
    description: `You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]', explain: '342 + 465 = 807.' },
      { input: 'l1 = [0], l2 = [0]', output: '[0]', explain: '' },
      { input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]', output: '[8,9,9,9,0,0,0,1]', explain: '' }
    ],
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100].',
      '0 <= Node.val <= 9',
      'It is guaranteed that the list represents a number that does not have leading zeros.'
    ],
    testCases: [
      { input: { l1: [2,4,3], l2: [5,6,4] }, expected: [7,0,8], functionCall: 'addTwoNumbers(createLinkedList([2,4,3]), createLinkedList([5,6,4]))' },
      { input: { l1: [0], l2: [0] }, expected: [0], functionCall: 'addTwoNumbers(createLinkedList([0]), createLinkedList([0]))' },
      { input: { l1: [9,9,9,9,9,9,9], l2: [9,9,9,9] }, expected: [8,9,9,9,0,0,0,1], functionCall: 'addTwoNumbers(createLinkedList([9,9,9,9,9,9,9]), createLinkedList([9,9,9,9]))' }
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    
}`,
      python: `def addTwoNumbers(l1, l2):
    pass`,
      cpp: `ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    
}`,
      java: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    
}`
    },
    hints: ['Keep track of a carry variable.', 'Iterate through both lists simultaneously, adding the values of the nodes and the carry. Create a new node with the sum % 10, and update carry to sum / 10.'],
    companies: ['Amazon', 'Bloomberg', 'Microsoft'],
    acceptance: 41,
    isPremium: true,
    tier: 'premium',
    faangFrequency: 99,
    isFaang: true,
    topCompany: 'Amazon',
    order: 105
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
