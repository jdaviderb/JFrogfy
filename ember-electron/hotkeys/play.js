const subscriptions = [];

export function subscribe(callback) {
  subscriptions.push(callback);
}

export function fire(message) {
  subscriptions.forEach((callback) => callback(message));
}