//1. Understanding merge sort
//Given the following list of numbers 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40

//What is the resulting list that will be sorted after 3 recursive calls to mergesort?
//[21, 1]
//What is the resulting list that will be sorted after 16 recursive calls to mergesort?
//[16, 49, 39, 27, 43, 34, 46, 40]
//What are the first 2 lists to be merged?
//21 and 1 will merge first, followed by 26 and 45
//Which two lists would be merged on the 7th merge?
//The 7th merge would be [1 2 9 21 26 28 29 45]

//2. Understanding quicksort
//1) Suppose you are debugging a quicksort implementation that is supposed to sort an array in ascending order. After the first partition step has been 
//completed, the contents of the array is in the following order: 3 9 1 14 17 24 22 20. Which of the following statements is correct about the partition step? 
//Explain your answer.

//The pivot could have been 17, but could not have been 14 false
//The pivot could have been either 14 or 17 True
//Neither 14 nor 17 could have been the pivot false
//The pivot could have been 14, but could not have been 17 false
//appears that the the items to left and right of 14 and 17 are less than or greater than

//2) Given the following list of numbers 14, 17, 13, 15, 19, 10, 3, 16, 9, 12 show the resulting list after the second partitioning according to the quicksort algorithm.
//When using the last item on the list as a pivot
//first partition [10, 3, 9], 12, [14, 17, 13, 15, 19, 16] second partition: [3, 9], 10, 12, [14, 13, 15], 16, [17, 19]
//When using the first item on the list as a pivot
//first partition: [13, 10, 3, 9, 12], 14, [17, 15, 19, 16] second partition: [10, 3, 9, 12], 13, 14, [15, 16], 17, [19]

//3. Implementing quicksort
//Write a function qSort that sorts a dataset using the quicksort algorithm. The dataset to sort is: 89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 
//33 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 
//9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5.

function qSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = qSort(array, start, middle);
    array = qSort(array, middle + 1, end);
    return array;
};

function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};

function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

console.log(qSort([89, 30, 25, 32, 72, 70, 51, 42, 25,
    24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14,
    33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93,
    98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85,
    63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88,
    3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17,
    69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87,
    49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]));

//4. Implementing merge sort
//Write a function mSort that sorts the dataset above using the merge sort algorithm

function mSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mSort(left);
    right = mSort(right);
    return merge(left, right, array);
};

function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};

console.log(mSort([89, 30, 25, 32, 72, 70, 51, 42, 25,
    24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14,
    33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93,
    98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85,
    63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88,
    3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17,
    69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87,
    49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]));

//5. Sorting a linked list using merge sort
//Given a Linked List, sort the linked list using merge sort. You will need your linked list class from previous lesson to create the list and use 
//all of its supplemental functions to solve this problem.

class _Node {
    constructor(value, next) {
      this.value=value;
      this.next=next;
    }
  }

class LinkedList {
    constructor() {
        this.head = null;
    }
    insertFirst(item) {
        this.head = new _Node(item, this.head);
    }
    insertLast(item) {
        if (this.head === null) { 
            this.insertFirst(item);
        }
        else {
            let tempNode = this.head;
            while (tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null);
        }
    }
    insertBefore(newItem, nextItem) {
        let currNode = this.head;
        let previousNode = this.head;
        if (!this.head) {
            return null;
        }
        if (this.head.value === nextItem) {
            this.insertFirst(newItem);
          }
        while ((currNode !== null) && (currNode.value !== nextItem)) {
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
          }
        else {let newNode = new _Node(newItem, previousNode.next)
        previousNode.next = newNode;
            return;
        }
  }
    insertAfter(newItem, prevItem) {
        let currNode = this.head;
        if (!this.head) {
            return null;
        }
        while ((currNode !== null) && (currNode.value !== prevItem)) {
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        if (prevItem.next === null) {
            this.insertLast(newItem);
            return;
          }
        else {let newNode = new _Node(newItem, currNode.next)
        currNode.next = newNode;
            return;
        }
    }
    insertAt(newItem, pos) {
        let currNode = this.head;
        let stepper = 0;
        if (!this.head) {
            return null;
        }
        while (stepper !== pos) {
            stepper++;
            currNode = this.head.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
          }
        if (stepper === pos) {
            this.insertAfter(newItem, currNode.value);
            return;
        }
    }
    find(item) { 
        // Start at the head
        let currNode = this.head;
        // If the list is empty
        if (!this.head) {
            return null;
        }
        // Check for the item 
        while (currNode.value !== item) {
            /* Return null if it's the end of the list 
               and the item is not on the list */
            if (currNode.next === null) {
                return null;
            }
            else {
                // Otherwise, keep looking 
                currNode = currNode.next;
            }
        }
        // Found it
        return currNode;
    }
    remove(item){ 
        // If the list is empty
        if (!this.head) {
            return null;
        }
        // If the node to be removed is head, make the next node head
        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }
        // Start at the head
        let currNode = this.head;
        // Keep track of previous
        let previousNode = this.head;

        while ((currNode !== null) && (currNode.value !== item)) {
            // Save the previous node 
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        previousNode.next = currNode.next;
    }
    insertCycle(newItem, nextItem) {
        let currNode = this.head;
        let previousNode = this.head;
        let prevPrevNode = this.head;
    
        while((currNode !== null) && (currNode.value !== nextItem)) {
          prevPrevNode = previousNode;
          previousNode = currNode;
          currNode = currNode.next;
        }
    
        let newNode = new _Node(newItem, prevPrevNode);
        previousNode.next = newNode;
      }
}

    const getListSize = (list) => {
        let counter = 0;
        let tempNode=list.head;
        while (tempNode !== null) {
            counter++;
            tempNode=tempNode.next;
        }
        return counter;
      };
      
      const mSortLL = (list) => {
        const listSize = getListSize(list);
        if (listSize <= 1) {
          // console.log('returning list '+list)
          return list
        }
        const mid = Math.floor(listSize/2)
        let leftList = new LinkedList
        let rightList = new LinkedList
        let tempNode = list.head
        for (let i=0; i<mid; i++) {
          leftList.insertLast(tempNode.value)
          tempNode = tempNode.next
        }
        rightList.head = tempNode
        // console.log('before mSort left is '+leftList)
        leftList = mSortLL(leftList)
        // console.log('after mSort left is '+leftList)
        // console.log('before mSort right is '+rightList)
        rightList = mSortLL(rightList)
        // console.log('after mSort right is '+rightList)
        return mergeLL(leftList, rightList)
      }
      
      const mergeLL = (left, right) => {
        let leftNode = left.head
        let rightNode = right.head
        let mergedList = new LinkedList
        if(leftNode.value <= rightNode.value) {
          mergedList.insertFirst(leftNode.value)
          leftNode = leftNode.next
        } else {
          mergedList.insertFirst(rightNode.value)
          rightNode = rightNode.next
        }
        let mergedNode = mergedList.head
        while (leftNode && rightNode) {
          if (leftNode.value <= rightNode.value) {
            mergedList.insertLast(leftNode.value)
            mergedNode = mergedNode.next
            leftNode = leftNode.next
          } else if (rightNode.value < leftNode.value) {
            mergedList.insertLast(rightNode.value)
            mergedNode = mergedNode.next
            rightNode = rightNode.next
          } else console.log('oops')
        }
        while (leftNode) {
          mergedList.insertLast(leftNode.value)
          mergedNode = mergedNode.next
          leftNode = leftNode.next
        }
        while (rightNode) {
          mergedList.insertLast(rightNode.value)
          mergedNode = mergedNode.next
          rightNode = rightNode.next
        }
        return mergedList
      }

//6. Bucket sort
//Write an O(n) algorithm to sort an array of integers, where you know in advance what the lowest and highest values are. You can't use arr.splice(), 
//shift() or unshift() for this exercise.
const bucketArray = [4, 5, 3, 1, 9, 8, 6, 7, 2, 9, 9, 3]
const bSort = (min, max, arr) => {
  const range = max-min;
  let buckets = []
  for (let i=0; i<= range; i++) {
    buckets.push([])
  }
  for (let j=0; j< bucketArray.length; j++) {
    buckets[arr[j]-1].push(arr[j])
  }
  return(buckets.reduce((acc, val) => acc.concat(val), []))
}
console.log(bSort(1, 9, bucketArray));

//7. Sort in place
//Write an algorithm to shuffle an array into a random order in place (i.e., without creating a new array).
const array = [4, 5, 3, 1, 9, 8, 6, 7, 2, 9, 9, 3]
const arrayRandomizer = (arr) => {
    for (let i=0; i< arr.length; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length)
      swap(arr, arr[i], arr[randomIndex])
    }
    return arr
  }
  console.log(arrayRandomizer(array));

//8. Sorting books
//Imagine that I gave you 20 books to sort in alphabetical order. Express this as an algorithm and then implement your algorithm.
//Sorting strings in alphabetical order is the same as sorting numbers in qSort.
const books = ['A Tale of Two Cities', 'Fellowship of the Ring', 'The Two Towers', 'Return of the King', 'Game of Thrones', 'Crown of Swords', 'Clash of Kings', 
'Feast For Crows', 'Storm of Swords', 'A Dance With Dragons', 'Artemis Fowl', 'The Davinci Code', 'Red Badge of Courage', 'There is a monster at the end of this book', 
'Twilight', 'Shadowmancer', 'The Coulour of Magic', 'Guards! Guards!', 'Mort', 'Reaper Man']
console.log(qSort(books));