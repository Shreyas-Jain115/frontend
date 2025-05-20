export const questionsData = [
  {
    id: 1,
    Array: true,
    title: "Multiply Sum of Two Arrays",
    description:
    "Given two integer arrays, arr1 and arr2, and an integer multiplier, calculate the sum of all elements in both arrays, and then multiply this total sum by the given multiplier. This task tests your ability to iterate through arrays and perform arithmetic operations.",
    difficulty: "Easy",
    avgTime: "10 min",
    totalarray: 2,
    totalint: 1,
    complexity: {
      time: "O(m+n)",
      space: "O(1)",
    },
    containerClass: "container",
    codeTemplate: {
      twoArrays:true,
      functionSignature: `int multiplySum(int arr1[], int size1, int arr2[], int size2, int multiplier) {
        // Your code here
    }`,
    functionName: `multiplySum`,
      template: `
    #include <iostream>
    #include <vector>
    using namespace std;
    
    {{USER_CODE}}
    
    int main() {
         {{TEST_CASES}}
        return 0;
    }
    `,
    lastparam : "multiplier",
    },
    testCases: [
      {
        example: "Test Case 1",
        input: { arr1: "[1, 2]", size1: 2, arr2: "[3, 4]", size2: 2, multiplier: 2 },
        output: "20",
        explanation:
          "Sum of arr1 is 1+2=3, sum of arr2 is 3+4=7. Total sum is 3+7=10. Multiplying by 2 gives 10 * 2 = 20.",
      },
      {
        example: "Test Case 2",
        input: { arr1: "[5]", size1: 1, arr2: "[5]", size2: 1, multiplier: 3 },
        output: "30",
        explanation:
          "Sum of arr1 is 5, sum of arr2 is 5. Total sum is 5+5=10. Multiplying by 3 gives 10 * 3 = 30.",
      },
      {
        example: "Test Case 3",
        input: { arr1: "[-1, 2]", size1: 2, arr2: "[3, -4]", size2: 2, multiplier: 5 },
        output: "0",
        explanation:
          "Sum of arr1 is -1+2=1, sum of arr2 is 3+(-4)=-1. Total sum is 1+(-1)=0. Multiplying by 5 gives 0 * 5 = 0.",
      },
      {
        example: "Test Case 4",
        input: { arr1: "[0, 0]", size1: 2, arr2: "[0, 0]", size2: 2, multiplier: 10 },
        output: "0",
        explanation:
          "Sum of arr1 is 0+0=0, sum of arr2 is 0+0=0. Total sum is 0+0=0. Multiplying by 10 gives 0 * 10 = 0.",
      },
    ],
     tests :[
      { arr1: [1, 2], size1: 2, arr2: [3, 4], size2: 2, multiplier: 2, expected: 20 },
      { arr1: [5], size1: 1, arr2: [5], size2: 1, multiplier: 3, expected: 30 },
      { arr1: [0, 0], size1: 2, arr2: [0], size2: 1, multiplier: 100, expected: 0 },
      { arr1: [10], size1: 1, arr2: [], size2: 0, multiplier: 1, expected: 10 },
      { arr1: [], size1: 0, arr2: [2, 3, 5], size2: 3, multiplier: 2, expected: 20 },
      { arr1: [-6], size1: 1, arr2: [-8], size2: 1, multiplier: 0, expected: 0 },
      { arr1: [1, 2, 3], size1: 3, arr2: [4, 5], size2: 2, multiplier: 1, expected: 15 },
      { arr1: [1, 2, 3], size1: 3, arr2: [4], size2: 1, multiplier: 2, expected: 20 }, // Corrected size2
      { arr1: [10, 20, 30], size1: 3, arr2: [1, 1, 1], size2: 3, multiplier: 1, expected: 63 },
      { arr1: [0], size1: 1, arr2: [1, 2, 3], size2: 3, multiplier: 10, expected: 60 },
      { arr1: [-1, -2], size1: 2, arr2: [3, 4], size2: 2, multiplier: 2, expected: 8 },
      { arr1: [100], size1: 1, arr2: [50], size2: 1, multiplier: 2, expected: 300 },
      { arr1: [1, 2, 3, 4], size1: 4, arr2: [5, 6], size2: 2, multiplier: 0, expected: 0 },
      { arr1: [], size1: 0, arr2: [], size2: 0, multiplier: 100, expected: 0 },
      { arr1: [1], size1: 1, arr2: [1], size2: 1, multiplier: 1, expected: 2 },   // Corrected expected
      { arr1: [2], size1: 1, arr2: [2], size2: 1, multiplier: 2, expected: 8 },
      { arr1: [5, 5], size1: 2, arr2: [5, 5], size2: 2, multiplier: 1, expected: 20 },
      { arr1: [1, 1, 1], size1: 3, arr2: [1, 1, 1], size2: 3, multiplier: 1, expected: 6 },
      { arr1: [3, 3], size1: 2, arr2: [3, 3, 3], size2: 3, multiplier: 2, expected: 30 },
      { arr1: [-1, -2, -3], size1: 3, arr2: [-4, -5], size2: 2, multiplier: 1, expected: -15 },
      { arr1: [10], size1: 1, arr2: [10], size2: 1, multiplier: 10, expected: 200 }, // Corrected expected
      { arr1: [1, 2], size1: 2, arr2: [3, 4, 5], size2: 3, multiplier: 0, expected: 0 },
      { arr1: [99], size1: 1, arr2: [1], size2: 1, multiplier: 1, expected: 100 }, // Corrected expected
      { arr1: [1, 2, 3, 4, 5], size1: 5, arr2: [5, 4, 3, 2, 1], size2: 5, multiplier: 1, expected: 30 },
      { arr1: [1000, 2000], size1: 2, arr2: [3000], size2: 1, multiplier: 3, expected: 18000 }, // Corrected expected
    ]
    
  },
  {
    id: 2,
    Array: true,
    title: "Array Sum Greater Than Threshold",
    description: "Given two integer arrays, arr1 and arr2, and an integer threshold, determine if the sum of all elements in arr1 is strictly greater than the given threshold. Return true if it is, and false otherwise.",
    difficulty: "Easy",
    avgTime: "8 min",
    totalarray: 2,
    totalint: 1,
    complexity: {
      time: "O(m+n)",
      space: "O(1)",
    },
    containerClass: "container",
    codeTemplate: {
      twoArrays:true,
      functionSignature: `bool isSumGreaterThanThreshold(int arr1[], int size1, int arr2[], int size2, int threshold) {
        // Your code here
      }`,
      functionName: `isSumGreaterThanThreshold`,
      
      template: `
      #include <iostream>
      #include <vector>
      #include <numeric> // For std::accumulate
      using namespace std;

      {{USER_CODE}}

      int main() {
          {{TEST_CASES}}
          return 0;
      }
      `,
      lastparam : "threshold",
    },
    testCases: [
      {
        example: "Test Case 1",
        input: { arr1: "[1, 2, 3]", size1: 3, arr2: "[4, 5]", size2: 2, threshold: 5 },
        output: "true",
        explanation: "The sum of elements in arr1 is 1+2+3 = 6, which is greater than the threshold 5.",
      },
      {
        example: "Test Case 2",
        input: { arr1: "[-1, -2]", size1: 2, arr2: "[0]", size2: 1, threshold: -2 },
        output: "false",
        explanation: "The sum of elements in arr1 is -1 + (-2) = -3, which is not greater than the threshold -2.",
      },
      {
        example: "Test Case 3",
        input: { arr1: "[10]", size1: 1, arr2: "[10]", size2: 1, threshold: 10 },
        output: "false",
        explanation: "The sum of elements in arr1 is 10, which is not strictly greater than the threshold 10.",
      },
    ],
    tests: [
      { arr1: [1, 2, 3], size1: 3, arr2: [4, 5], size2: 2, threshold: 5, expected: true },
      { arr1: [-1, -2], size1: 2, arr2: [0], size2: 1, threshold: -2, expected: false },
      { arr1: [10], size1: 1, arr2: [10], size2: 1, threshold: 10, expected: false },
      { arr1: [0, 0, 0], size1: 3, arr2: [1, 1], size2: 2, threshold: -1, expected: true },
      { arr1: [-5, 2, -1], size1: 3, arr2: [3], size2: 1, threshold: -4, expected: false },
    ],
  },
  {
    "id": 3,
    "Array": true,
    "title": "Multiply Absolute Difference of Sums",
    "description": "Given two integer arrays, arr1 and arr2, and an integer multiplier, calculate the absolute difference between the sum of elements in arr1 and the sum of elements in arr2. Then, multiply this absolute difference by the given multiplier. Return the resulting value.",
    "difficulty": "Easy",
    "avgTime": "15 min",
    "totalarray": 2,
    "totalint": 1,
    "complexity": {
      "time": "O(m+n)",
      "space": "O(1)"
    },
    "containerClass": "container",
    "codeTemplate": {
      "twoArrays": true,
      "functionSignature": "int multiplyAbsoluteDifference(int arr1[], int size1, int arr2[], int size2, int multiplier) {\n  // Your code here\n}",
      "functionName": "multiplyAbsoluteDifference",
      "template": "#include <iostream>\n#include <vector>\n#include <cmath>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n  {{TEST_CASES}}\n  return 0;\n}",
      "lastparam": "multiplier"
    },
    "testCases": [
      {
        "example": "Test Case 1",
        "input": { "arr1": "[1, 5]", "size1": 2, "arr2": "[2, 3]", "size2": 2, "multiplier": 3 },
        "output": "3",
        "explanation": "Sum of arr1 is 6, sum of arr2 is 5. Absolute difference is 1. 1 * 3 = 3."
      },
      {
        "example": "Test Case 2",
        "input": { "arr1": "[-1, -2]", "size1": 2, "arr2": "[4, 5]", "size2": 2, "multiplier": 2 },
        "output": "24",
        "explanation": "Sum of arr1 is -3, sum of arr2 is 9. Absolute difference is 12. 12 * 2 = 24."
      },
      {
        "example": "Test Case 3",
        "input": { "arr1": "[10]", "size1": 1, "arr2": "[10]", "size2": 1, "multiplier": 10 },
        "output": "0",
        "explanation": "Both sums are 10. Difference is 0. 0 * 10 = 0."
      }
    ],
    "tests": [
      { "arr1": [1, 5], "size1": 2, "arr2": [2, 3], "size2": 2, "multiplier": 3, "expected": 3 },
      { "arr1": [-1, -2], "size1": 2, "arr2": [4, 5], "size2": 2, "multiplier": 2, "expected": 24 },
      { "arr1": [10], "size1": 1, "arr2": [10], "size2": 1, "multiplier": 10, "expected": 0 },
      { "arr1": [0, 5], "size1": 2, "arr2": [-3, 0], "size2": 2, "multiplier": 5, "expected": 40 },
      { "arr1": [-10, 2], "size1": 2, "arr2": [5, -1], "size2": 2, "multiplier": 1, "expected": 8 }
    ]
  },
  {
    "id": 4,
    "Array": true,
    "title": "Multiply Sum of Even Indexed Elements",
    "description": "Given two integer arrays, arr1 and arr2, and an integer multiplier, calculate the sum of elements at even indices (0, 2, 4, ...) in both arrays. Then, multiply this total sum by the given multiplier. Return the result.",
    "difficulty": "Easy",
    "avgTime": "18 min",
    "totalarray": 2,
    "totalint": 1,
    "complexity": {
      "time": "O(m+n)",
      "space": "O(1)"
    },
    "containerClass": "container",
    "codeTemplate": {
      "twoArrays": true,
      "functionSignature": "int multiplySumOfEvens(int arr1[], int size1, int arr2[], int size2, int multiplier) {\n  // Your code here\n}",
      "functionName": "multiplySumOfEvens",
      "template": "#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n  {{TEST_CASES}}\n  return 0;\n}",
      "lastparam": "multiplier"
    },
    "testCases": [
      {
        "example": "Test Case 1",
        "input": { "arr1": "[1, 2, 3]", "size1": 3, "arr2": "[4, 5, 6]", "size2": 3, "multiplier": 2 },
        "output": "28",
        "explanation": "Even-indexed elements: arr1 → 1+3=4, arr2 → 4+6=10. Total = 14. 14 * 2 = 28."
      },
      {
        "example": "Test Case 2",
        "input": { "arr1": "[10, 20]", "size1": 2, "arr2": "[30]", "size2": 1, "multiplier": 5 },
        "output": "200",
        "explanation": "Even-indexed: arr1 → 10, arr2 → 30. Sum = 40. 40 * 5 = 200."
      },
      {
        "example": "Test Case 3",
        "input": { "arr1": "[-1, 2, -3, 4]", "size1": 4, "arr2": "[5, -6]", "size2": 2, "multiplier": 1 },
        "output": "1",
        "explanation": "Even-indexed: arr1 → -1 + (-3) = -4, arr2 → 5. Total = 1. 1 * 1 = 1."
      }
    ],
    "tests": [
      { "arr1": [1, 2, 3], "size1": 3, "arr2": [4, 5, 6], "size2": 3, "multiplier": 2, "expected": 28 },
      { "arr1": [10, 20], "size1": 2, "arr2": [30], "size2": 1, "multiplier": 5, "expected": 200 },
      { "arr1": [-1, 2, -3, 4], "size1": 4, "arr2": [5, -6], "size2": 2, "multiplier": 1, "expected": 1 },
      { "arr1": [0, 1, 0, 1], "size1": 4, "arr2": [2, 3, 2], "size2": 3, "multiplier": 10, "expected": 40 },
      { "arr1": [5], "size1": 1, "arr2": [-2, 4, -6], "size2": 3, "multiplier": 3, "expected": -3 }
    ]
  },
  
  {
    id: 5,
    Array: true,
    title: "Find Minimum and Maximum in Array",
    description:
      "Given an integer array and its size, return the sum of the minimum and maximum values in the array. This task tests your understanding of array traversal and comparison operations.",
    difficulty: "Easy",
    avgTime: "8 min",
    complexity: {
      time: "O(n)",
      space: "O(1)",
    },
    containerClass: "container",
    codeTemplate: {
      oneArray:true,
      functionSignature: `int minMaxSum(int arr[], int size) {
      // Your code here
  }`,
      template: `
  #include <iostream>
  #include <climits>
  using namespace std;
  
  {{USER_CODE}}
  
  int main() {
     {{TEST_CASES}}
      return 0;
  }
      `,
      lastparam : "size",
      functionName: `minMaxSum`,
    },
    testCases: [
      {
        example: "Test Case 1",
        input: { arr: "[1, 5, 3, 9, 2]", size: 5 },
        output: "10",
        explanation: "Min is 1, Max is 9. Sum = 10."
      },
      {
        example: "Test Case 2",
        input: { arr: "[7]", size: 1 },
        output: "14",
        explanation: "Only one element, sum = 7 + 7 = 14."
      },
      {
        example: "Test Case 3",
        input: { arr: "[-3, -1, -7]", size: 3 },
        output: "-8",
        explanation: "Min is -7, Max is -1. Sum = -8."
      }
    ],
    tests: [
      { arr: [1, 5, 3, 9, 2], size: 5, expected: 10 },
      { arr: [7], size: 1, expected: 14 },
      { arr: [-3, -1, -7], size: 3, expected: -8 },
      { arr: [0, 0], size: 2, expected: 0 },
      { arr: [2, 2, 2], size: 3, expected: 4 }
    ]
  },
  {
    id: 6,
    Array: true,
    title: "Count Even and Odd Numbers",
    description:
      "Given an array of integers and its size, return the count of even and odd numbers. This task tests your ability to traverse arrays and use modulo logic.",
    difficulty: "Easy",
    avgTime: "6 min",
    complexity: {
      time: "O(n)",
      space: "O(1)",
    },
    containerClass: "container",
    codeTemplate: {
      functionSignature: `void countEvenOdd(int arr[], int size, int &evenCount, int &oddCount) {
      // Your code here
  }`,
      template: `
  #include <iostream>
  using namespace std;
  
  {{USER_CODE}}
  
  int main() {
      int arr[] = {1, 2, 3, 4, 5, 6};
      int size = sizeof(arr) / sizeof(arr[0]);
      int even = 0, odd = 0;
      countEvenOdd(arr, size, even, odd);
      cout << "Even: " << even << ", Odd: " << odd << endl;
      return 0;
  }
      `,
    },
    testCases: [
      {
        example: "Test Case 1",
        input: { arr: "[1, 2, 3, 4, 5, 6]", size: 6 },
        output: "[3, 3]",
        explanation: "Even: 2,4,6; Odd: 1,3,5"
      },
      {
        example: "Test Case 2",
        input: { arr: "[2, 4, 6]", size: 3 },
        output: "[3, 0]",
        explanation: "All are even."
      },
      {
        example: "Test Case 3",
        input: { arr: "[1, 3, 5]", size: 3 },
        output: "[0, 3]",
        explanation: "All are odd."
      }
    ],
    tests: [
      { arr: [1, 2, 3, 4, 5, 6], size: 6, expected: [3, 3] },
      { arr: [2, 4, 6], size: 3, expected: [3, 0] },
      { arr: [1, 3, 5], size: 3, expected: [0, 3] },
      { arr: [], size: 0, expected: [0, 0] }
    ]
  },
  {
    id: 7,
    Array: true,
    title: "Product of All Elements Except Self",
    description:
      "Given an array of integers and its size, return an output array such that each element is the product of all elements except itself. Do not use division.",
    difficulty: "Medium",
    avgTime: "20 min",
    complexity: {
      time: "O(n)",
      space: "O(n)",
    },
    containerClass: "container",
    codeTemplate: {
      functionSignature: `void productExceptSelf(int arr[], int size, int result[]) {
      // Your code here
  }`,
      template: `
  #include <iostream>
  using namespace std;
  
  {{USER_CODE}}
  
  int main() {
      int arr[] = {1, 2, 3, 4};
      int size = sizeof(arr) / sizeof(arr[0]);
      int result[4];
      productExceptSelf(arr, size, result);
      for (int i = 0; i < size; i++) {
          cout << result[i] << " ";
      }
      cout << endl;
      return 0;
  }
      `,
    },
    testCases: [
      {
        example: "Test Case 1",
        input: { arr: "[1, 2, 3, 4]", size: 4 },
        output: "[24, 12, 8, 6]",
        explanation: "Each element is product of all others."
      },
      {
        example: "Test Case 2",
        input: { arr: "[2, 3, 4]", size: 3 },
        output: "[12, 8, 6]",
        explanation: "2*3 = 6, 2*4 = 8, etc."
      },
      {
        example: "Test Case 3",
        input: { arr: "[1, 0, 3]", size: 3 },
        output: "[0, 3, 0]",
        explanation: "Zero affects all products."
      }
    ],
    tests: [
      { arr: [1, 2, 3, 4], size: 4, expected: [24, 12, 8, 6] },
      { arr: [2, 3, 4], size: 3, expected: [12, 8, 6] },
      { arr: [1, 0, 3], size: 3, expected: [0, 3, 0] },
      { arr: [1, 1, 1, 1], size: 4, expected: [1, 1, 1, 1] }
    ]
  }
];
