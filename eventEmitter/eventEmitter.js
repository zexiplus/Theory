class EventEmitter {
	constructor() {
		this.listener = {};
	}
	on(eventName, cb) {
		if (!this.listener[eventName]) {
			this.listener[eventName] = []
		}
		this.listener[eventName].push(cb)
	}
	emit(eventName, value) {
		if (eventName in this.listener) {
			this.listener[eventName].forEach((cb) => {
				cb.call(null, value)
			})
		} else {
			console.log(`can not trigger event${eventName}`)
		}
	}
	off(eventName) {
		if (eventName in this.listener) {
			this.listener[eventName] = null
		}
	}
}