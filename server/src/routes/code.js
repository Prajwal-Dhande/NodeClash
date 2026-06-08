const express = require('express')
const router = express.Router()
const { runTestCases } = require('../services/codeService')
const authMiddleware = require('../middleware/authmiddleware')

// Hardcoded fallback problems
const FALLBACK_PROBLEMS = {
  'two-sum': {
    title: 'Two Sum',
    testCases: [
      { input: { nums: [2,7,11,15], target: 9 }, expected: [0,1], functionCall: 'twoSum([2,7,11,15], 9)' },
      { input: { nums: [3,2,4], target: 6 }, expected: [1,2], functionCall: 'twoSum([3,2,4], 6)' },
      { input: { nums: [3,3], target: 6 }, expected: [0,1], functionCall: 'twoSum([3,3], 6)' },
    ]
  },
  'valid-parentheses': {
    title: 'Valid Parentheses',
    testCases: [
      { input: { s: '()' }, expected: true, functionCall: 'isValid("()")' },
      { input: { s: '()[]{}' }, expected: true, functionCall: 'isValid("()[]{}")' },
      { input: { s: '(]' }, expected: false, functionCall: 'isValid("(]")' },
      { input: { s: '([)]' }, expected: false, functionCall: 'isValid("([)]")' },
    ]
  },
  'merge-intervals': {
    title: 'Merge Intervals',
    testCases: [
      { input: { intervals: [[1,3],[2,6],[8,10],[15,18]] }, expected: [[1,6],[8,10],[15,18]], functionCall: 'merge([[1,3],[2,6],[8,10],[15,18]])' },
      { input: { intervals: [[1,4],[4,5]] }, expected: [[1,5]], functionCall: 'merge([[1,4],[4,5]])' },
    ]
  },
  'best-time-to-buy-stock': {
    title: 'Best Time to Buy and Sell Stock',
    testCases: [
      { input: { prices: [7,1,5,3,6,4] }, expected: 5, functionCall: 'maxProfit([7,1,5,3,6,4])' },
      { input: { prices: [7,6,4,3,1] }, expected: 0, functionCall: 'maxProfit([7,6,4,3,1])' },
      { input: { prices: [1,2] }, expected: 1, functionCall: 'maxProfit([1,2])' },
    ]
  },
  'contains-duplicate': {
    title: 'Contains Duplicate',
    testCases: [
      { input: { nums: [1,2,3,1] }, expected: true, functionCall: 'containsDuplicate([1,2,3,1])' },
      { input: { nums: [1,2,3,4] }, expected: false, functionCall: 'containsDuplicate([1,2,3,4])' },
      { input: { nums: [1,1,1,3,3,4,3,2,4,2] }, expected: true, functionCall: 'containsDuplicate([1,1,1,3,3,4,3,2,4,2])' },
    ]
  },
  'maximum-subarray': {
    title: 'Maximum Subarray',
    testCases: [
      { input: { nums: [-2,1,-3,4,-1,2,1,-5,4] }, expected: 6, functionCall: 'maxSubArray([-2,1,-3,4,-1,2,1,-5,4])' },
      { input: { nums: [1] }, expected: 1, functionCall: 'maxSubArray([1])' },
      { input: { nums: [5,4,-1,7,8] }, expected: 23, functionCall: 'maxSubArray([5,4,-1,7,8])' },
    ]
  },
  'climbing-stairs': {
    title: 'Climbing Stairs',
    testCases: [
      { input: { n: 2 }, expected: 2, functionCall: 'climbStairs(2)' },
      { input: { n: 3 }, expected: 3, functionCall: 'climbStairs(3)' },
      { input: { n: 5 }, expected: 8, functionCall: 'climbStairs(5)' },
    ]
  },
  'coin-change': {
    title: 'Coin Change',
    testCases: [
      { input: { coins: [1,5,11], amount: 11 }, expected: 1, functionCall: 'coinChange([1,5,11], 11)' },
      { input: { coins: [2], amount: 3 }, expected: -1, functionCall: 'coinChange([2], 3)' },
      { input: { coins: [1,2,5], amount: 11 }, expected: 3, functionCall: 'coinChange([1,2,5], 11)' },
    ]
  },
  'house-robber': {
    title: 'House Robber',
    testCases: [
      { input: { nums: [1,2,3,1] }, expected: 4, functionCall: 'rob([1,2,3,1])' },
      { input: { nums: [2,7,9,3,1] }, expected: 12, functionCall: 'rob([2,7,9,3,1])' },
      { input: { nums: [2,1,1,2] }, expected: 4, functionCall: 'rob([2,1,1,2])' },
    ]
  },
  'valid-anagram': {
    title: 'Valid Anagram',
    testCases: [
      { input: { s: 'anagram', t: 'nagaram' }, expected: true, functionCall: 'isAnagram("anagram", "nagaram")' },
      { input: { s: 'rat', t: 'car' }, expected: false, functionCall: 'isAnagram("rat", "car")' },
      { input: { s: 'listen', t: 'silent' }, expected: true, functionCall: 'isAnagram("listen", "silent")' },
    ]
  },
  'binary-search': {
    title: 'Binary Search',
    testCases: [
      { input: { nums: [-1,0,3,5,9,12], target: 9 }, expected: 4, functionCall: 'search([-1,0,3,5,9,12], 9)' },
      { input: { nums: [-1,0,3,5,9,12], target: 2 }, expected: -1, functionCall: 'search([-1,0,3,5,9,12], 2)' },
      { input: { nums: [5], target: 5 }, expected: 0, functionCall: 'search([5], 5)' },
    ]
  },
  'longest-substring-without-repeating': {
    title: 'Longest Substring Without Repeating Characters',
    testCases: [
      { input: { s: 'abcabcbb' }, expected: 3, functionCall: 'lengthOfLongestSubstring("abcabcbb")' },
      { input: { s: 'bbbbb' }, expected: 1, functionCall: 'lengthOfLongestSubstring("bbbbb")' },
      { input: { s: 'pwwkew' }, expected: 3, functionCall: 'lengthOfLongestSubstring("pwwkew")' },
    ]
  },
  'number-of-islands': {
    title: 'Number of Islands',
    testCases: [
      { input: { grid: [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]] }, expected: 1, functionCall: 'numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]])' },
      { input: { grid: [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]] }, expected: 3, functionCall: 'numIslands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]])' },
    ]
  },
  'reverse-linked-list': {
    title: 'Reverse Linked List',
    testCases: [
      { input: { head: [1,2,3,4,5] }, expected: [5,4,3,2,1], functionCall: 'reverseList([1,2,3,4,5])' },
      { input: { head: [1,2] }, expected: [2,1], functionCall: 'reverseList([1,2])' },
      { input: { head: [] }, expected: [], functionCall: 'reverseList([])' },
    ]
  },
  'maximum-depth-binary-tree': {
    title: 'Maximum Depth of Binary Tree',
    testCases: [
      { input: { root: [3,9,20,null,null,15,7] }, expected: 3, functionCall: 'maxDepth([3,9,20,null,null,15,7])' },
      { input: { root: [1,null,2] }, expected: 2, functionCall: 'maxDepth([1,null,2])' },
      { input: { root: [] }, expected: 0, functionCall: 'maxDepth([])' },
    ]
  },
  'find-minimum-in-rotated-array': {
    title: 'Find Minimum in Rotated Sorted Array',
    testCases: [
      { input: { nums: [3,4,5,1,2] }, expected: 1, functionCall: 'findMin([3,4,5,1,2])' },
      { input: { nums: [4,5,6,7,0,1,2] }, expected: 0, functionCall: 'findMin([4,5,6,7,0,1,2])' },
      { input: { nums: [11,13,15,17] }, expected: 11, functionCall: 'findMin([11,13,15,17])' },
    ]
  },
  'product-of-array-except-self': {
    title: 'Product of Array Except Self',
    testCases: [
      { input: { nums: [1,2,3,4] }, expected: [24,12,8,6], functionCall: 'productExceptSelf([1,2,3,4])' },
      { input: { nums: [-1,1,0,-3,3] }, expected: [0,0,9,0,0], functionCall: 'productExceptSelf([-1,1,0,-3,3])' },
    ]
  },
  'merge-two-sorted-lists': {
    title: 'Merge Two Sorted Lists',
    testCases: [
      { input: { l1: [1,2,4], l2: [1,3,4] }, expected: [1,1,2,3,4,4], functionCall: 'mergeTwoLists([1,2,4], [1,3,4])' },
      { input: { l1: [], l2: [] }, expected: [], functionCall: 'mergeTwoLists([], [])' },
      { input: { l1: [], l2: [0] }, expected: [0], functionCall: 'mergeTwoLists([], [0])' },
    ]
  },
  'invert-binary-tree': {
    title: 'Invert Binary Tree',
    testCases: [
      { input: { root: [4,2,7,1,3,6,9] }, expected: [4,7,2,9,6,3,1], functionCall: 'invertTree([4,2,7,1,3,6,9])' },
      { input: { root: [2,1,3] }, expected: [2,3,1], functionCall: 'invertTree([2,1,3])' },
    ]
  },
}

// Slug aliases: vault slugs whose base form doesn't match a FALLBACK key exactly
FALLBACK_PROBLEMS['best-time-to-buy-sell-stock'] = FALLBACK_PROBLEMS['best-time-to-buy-stock']
FALLBACK_PROBLEMS['longest-substring-without-repeating-characters'] = FALLBACK_PROBLEMS['longest-substring-without-repeating']

// Additional vault problems with no base equivalent in FALLBACK
FALLBACK_PROBLEMS['valid-palindrome'] = {
  title: 'Valid Palindrome',
  testCases: [
    { input: { s: 'A man, a plan, a canal: Panama' }, expected: true, functionCall: 'isPalindrome("A man, a plan, a canal: Panama")' },
    { input: { s: 'race a car' }, expected: false, functionCall: 'isPalindrome("race a car")' },
    { input: { s: ' ' }, expected: true, functionCall: 'isPalindrome(" ")' },
  ]
}
FALLBACK_PROBLEMS['linked-list-cycle'] = {
  title: 'Linked List Cycle',
  testCases: [
    { input: { head: [3,2,0,-4] }, expected: true, functionCall: 'hasCycle([3,2,0,-4])' },
    { input: { head: [1,2] }, expected: true, functionCall: 'hasCycle([1,2])' },
    { input: { head: [1] }, expected: false, functionCall: 'hasCycle([1])' },
  ]
}
FALLBACK_PROBLEMS['3sum'] = {
  title: '3Sum',
  testCases: [
    { input: { nums: [-1,0,1,2,-1,-4] }, expected: [[-1,-1,2],[-1,0,1]], functionCall: 'threeSum([-1,0,1,2,-1,-4])' },
    { input: { nums: [0,1,1] }, expected: [], functionCall: 'threeSum([0,1,1])' },
    { input: { nums: [0,0,0] }, expected: [[0,0,0]], functionCall: 'threeSum([0,0,0])' },
  ]
}
FALLBACK_PROBLEMS['two-sum-ii'] = {
  title: 'Two Sum II',
  testCases: [
    { input: { numbers: [2,7,11,15], target: 9 }, expected: [1,2], functionCall: 'twoSum([2,7,11,15], 9)' },
    { input: { numbers: [2,3,4], target: 6 }, expected: [1,3], functionCall: 'twoSum([2,3,4], 6)' },
    { input: { numbers: [-1,0], target: -1 }, expected: [1,2], functionCall: 'twoSum([-1,0], -1)' },
  ]
}
FALLBACK_PROBLEMS['search-in-rotated-sorted-array'] = {
  title: 'Search in Rotated Sorted Array',
  testCases: [
    { input: { nums: [4,5,6,7,0,1,2], target: 0 }, expected: 4, functionCall: 'search([4,5,6,7,0,1,2], 0)' },
    { input: { nums: [4,5,6,7,0,1,2], target: 3 }, expected: -1, functionCall: 'search([4,5,6,7,0,1,2], 3)' },
    { input: { nums: [1], target: 0 }, expected: -1, functionCall: 'search([1], 0)' },
  ]
}
FALLBACK_PROBLEMS['kth-largest-element-in-an-array'] = {
  title: 'Kth Largest Element in an Array',
  testCases: [
    { input: { nums: [3,2,1,5,6,4], k: 2 }, expected: 5, functionCall: 'findKthLargest([3,2,1,5,6,4], 2)' },
    { input: { nums: [3,2,3,1,2,4,5,5,6], k: 4 }, expected: 4, functionCall: 'findKthLargest([3,2,3,1,2,4,5,5,6], 4)' },
  ]
}
FALLBACK_PROBLEMS['trapping-rain-water'] = {
  title: 'Trapping Rain Water',
  testCases: [
    { input: { height: [0,1,0,2,1,0,1,3,2,1,2,1] }, expected: 6, functionCall: 'trap([0,1,0,2,1,0,1,3,2,1,2,1])' },
    { input: { height: [4,2,0,3,2,5] }, expected: 9, functionCall: 'trap([4,2,0,3,2,5])' },
  ]
}
FALLBACK_PROBLEMS['course-schedule'] = {
  title: 'Course Schedule',
  testCases: [
    { input: { numCourses: 2, prerequisites: [[1,0]] }, expected: true, functionCall: 'canFinish(2, [[1,0]])' },
    { input: { numCourses: 2, prerequisites: [[1,0],[0,1]] }, expected: false, functionCall: 'canFinish(2, [[1,0],[0,1]])' },
  ]
}
FALLBACK_PROBLEMS['word-search'] = {
  title: 'Word Search',
  testCases: [
    { input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCCED" }, expected: true, functionCall: 'exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")' },
    { input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCB" }, expected: false, functionCall: 'exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB")' },
  ]
}
FALLBACK_PROBLEMS['validate-binary-search-tree'] = {
  title: 'Validate Binary Search Tree',
  testCases: [
    { input: { root: [2,1,3] }, expected: true, functionCall: 'isValidBST([2,1,3])' },
    { input: { root: [5,1,4,null,null,3,6] }, expected: false, functionCall: 'isValidBST([5,1,4,null,null,3,6])' },
  ]
}
FALLBACK_PROBLEMS['median-of-two-sorted-arrays'] = {
  title: 'Median of Two Sorted Arrays',
  testCases: [
    { input: { nums1: [1,3], nums2: [2] }, expected: 2.0, functionCall: 'findMedianSortedArrays([1,3], [2])' },
    { input: { nums1: [1,2], nums2: [3,4] }, expected: 2.5, functionCall: 'findMedianSortedArrays([1,2], [3,4])' },
  ]
}
FALLBACK_PROBLEMS['top-k-frequent-elements'] = {
  title: 'Top K Frequent Elements',
  testCases: [
    { input: { nums: [1,1,1,2,2,3], k: 2 }, expected: [1,2], functionCall: 'topKFrequent([1,1,1,2,2,3], 2)' },
    { input: { nums: [1], k: 1 }, expected: [1], functionCall: 'topKFrequent([1], 1)' },
    { input: { nums: [4,4,4,6,6,2,2,2,2], k: 2 }, expected: [2,4], functionCall: 'topKFrequent([4,4,4,6,6,2,2,2,2], 2)' },
    { input: { nums: [1,2], k: 2 }, expected: [1,2], functionCall: 'topKFrequent([1,2], 2)' },
  ]
}

// DB se problem fetch karo, fallback to hardcoded
// Handles The Elite Archive problems that may have dummy/placeholder test cases
const getProblem = async (problemId) => {
  try {
    const Problem = require('../models/Problem')
    const dbProblem = await Problem.findOne({ slug: problemId, isActive: true })
    if (dbProblem) {
      // Check if test cases are real (not dummy placeholders from seed script)
      const hasRealTests = dbProblem.testCases &&
        dbProblem.testCases.length > 0 &&
        dbProblem.testCases[0].input !== 'dummy' &&
        dbProblem.testCases[0].functionCall !== 'solve()'

      if (hasRealTests) {
        return { title: dbProblem.title, testCases: dbProblem.testCases }
      }

      // Vault problem with dummy test cases — try to find real tests from base slug
      // e.g. 'two-sum-faang' → 'two-sum', 'merge-intervals-faang' → 'merge-intervals'
      const baseSlug = problemId.replace(/-faang$/, '')
      if (baseSlug !== problemId && FALLBACK_PROBLEMS[baseSlug]) {
        console.log(`⚡ Vault problem "${problemId}" has dummy tests, using fallback from "${baseSlug}"`)
        return { title: dbProblem.title, testCases: FALLBACK_PROBLEMS[baseSlug].testCases }
      }

      // Also try DB for the non-faang variant
      const baseProblem = await Problem.findOne({ slug: baseSlug, isActive: true })
      if (baseProblem && baseProblem.testCases?.length > 0 && baseProblem.testCases[0].input !== 'dummy') {
        console.log(`⚡ Vault problem "${problemId}" using test cases from DB problem "${baseSlug}"`)
        return { title: dbProblem.title, testCases: baseProblem.testCases }
      }

      // Last resort: return the DB problem but flag that tests are dummy
      return { title: dbProblem.title, testCases: [], _dummyTests: true }
    }
  } catch (e) {
    console.log('DB fetch failed, using fallback:', e.message)
  }
  return FALLBACK_PROBLEMS[problemId] || null
}

// POST /api/code/run — code run karo
router.post('/run', authMiddleware, async (req, res) => {
  try {
    const { code, language, problemId } = req.body

    if (!code || !language || !problemId) {
      return res.status(400).json({ message: 'Code, language, problemId required' })
    }

    const problem = await getProblem(problemId)
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' })
    }

    if (!problem.testCases || problem.testCases.length === 0) {
      return res.status(400).json({
        message: '⚠️ Test cases for this Premium problem are not yet available. The problem was loaded from the The Elite Archive but has no executable test data. Please try a different problem or contact support.',
        results: []
      })
    }

    const { results, passed, total, complexity } = await runTestCases(
      code, language, problem.testCases
    )

    res.json({
      success: true,
      passed,
      total,
      results,
      complexity,
      allPassed: passed === total
    })

  } catch (error) {
    console.error('Code execution error:', error)
    res.status(500).json({ message: error.message || 'Code execution failed' })
  }
})

// POST /api/code/ai-constraint — Groq AI se constraint generate karo
router.post('/ai-constraint', authMiddleware, async (req, res) => {
  try {
    const { code, problemId, passed, total, roomId } = req.body

    if (!code) {
      return res.status(400).json({ message: 'Code is required' })
    }

    const problem = await getProblem(problemId) || { title: 'DSA Problem' }
    const { generateConstraint } = require('../services/aiService')
    const constraint = await generateConstraint(code, problem, passed, total)

    const io = req.app.get('io')
    const room = roomId || 'demo-room-1'

    if (io) {
      io.to(room).emit('ai_constraint', {
        message: constraint,
        injectedAt: new Date().toISOString()
      })
      console.log(`🤖 AI Constraint → room ${room}: ${constraint}`)
    }

    res.json({ success: true, constraint })

  } catch (error) {
    console.error('AI constraint error:', error)
    res.status(500).json({ message: error.message || 'AI constraint failed' })
  }
})

// POST /api/code/ai-debug — Groq AI debug hint
router.post('/ai-debug', authMiddleware, async (req, res) => {
  try {
    const { code, problemId, errorOutput } = req.body

    if (!code) {
      return res.status(400).json({ message: 'Code is required' })
    }

    const problem = await getProblem(problemId) || { title: 'DSA Problem' }
    const { generateDebugHint } = require('../services/aiService')
    const hint = await generateDebugHint(code, problem, errorOutput)

    res.json({ success: true, hint })

  } catch (error) {
    console.error('AI debug hint error:', error)
    res.status(500).json({ message: error.message || 'AI debug hint failed' })
  }
})

module.exports = router