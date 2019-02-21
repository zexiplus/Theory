function quickSort(arr) {
  if (arr.length <= 1 ) return arr;
  var privotIndex = Math.floor(arr.length / 2);
  var privot = arr[privotIndex];
  var leftArr = [];
  var rightArr = [];
  
  arr.forEach(function(item) {
    if (item < privot) {
      leftArr.push(item);
    } else {
      rightArr.push(item);
    }
  });

  return quickSort(leftArr).concat(quickSort(rightArr))
}

var testArr = [2,3,5,2];

console.log(quickSort(testArr));