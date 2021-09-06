alert('Hello World!');

const Feed = {
    "1588291200-a": {
        "id": "J8iXjOxI0fWJWckJK8cGjZzm7Rd2",
        "message": "old"
    },
    "1593580504-d": {
        "id": "J8iXjOxI0fWJWckJK8cGjZzm7Rd2",
        "message": "hello"
    },
};

const feedRefactoring = function (obj) {
    let regExp = /^(.+)-(.+)/;
    for (let key of Object.keys(obj)) {
        obj[key].time = parseInt(key.replace(regExp, '$1'), 10);
    }
};

console.log(JSON.stringify(Feed, null, 4));
console.log(' ');

feedRefactoring(Feed);

console.log(JSON.stringify(Feed, null, 4));
