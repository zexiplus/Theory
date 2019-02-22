function quickSort(arr) {
  if (arr.length <= 1 ) return arr;
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var leftArr = [];
  var rightArr = [];
  
  arr.forEach(function(item) {
    if (item < pivot) {
      leftArr.push(item);
    } else {
      rightArr.push(item);
    }
  });

  return quickSort(leftArr).concat([pivot], quickSort(rightArr))
}

var testArr = [2,3,5,2];

console.log(quickSort(testArr));