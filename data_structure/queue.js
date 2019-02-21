class CircleQueue {
  constructor(length) {
    this.head = 0 // 对头索引
    this.tail = 0 // 队尾索引
    this.size = 0 // 当前队列大小
    this.queue = new Array(length + 1)
  }
  isEmpty() {
    return (this.head === this.tail === 0)
  }
  isFull() {
    return (this.size + 1) === this.queue.length
  }
  enqueue(item) {
    if ((this.tail + 1) % this.size === this.head) {

    }
    this.tail ++
    this.queue[this.tail] = item
  }
}