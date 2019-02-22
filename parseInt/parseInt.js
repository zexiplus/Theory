function myParseInt(num, base) {
  var stringNum = String(num),
      result = 0,
      len = stringNum.length,
      index = 0;
  while (index < len) {
    result += Number(stringNum[len - index - 1]) * Math.pow(base, index);
    index ++;
  }
  result = Number(result);
  return result
}

console.log(myParseInt(202, 3) === parseInt(202, 3))