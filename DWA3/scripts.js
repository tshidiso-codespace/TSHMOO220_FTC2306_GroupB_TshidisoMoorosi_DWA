// @ts-check

/**
 * @typedef {object} Data
 * @property {Array<[string, Array<number>]>} lists - An array of lisy where each list contains a string and an array of numbers
 */
const data = {
	lists: [
		['first', [15, 11, 13, 7, 5]],
		['second', [2, 6, 8, 4, 14, 12, 10]],
		['third', [9, 3, 1]],
	]
}

// Only edit below
/**kkk
 * @type {Array}
 */
let result = []
let firstArray = data.lists[0][1]
let secondArray = data.lists[1][1]
let thirdArray = data.lists[2][1]

/**
 * 
 * @returns {number} returns the largest mumber of the last elements of the lists
 */
const extractBiggest = () => {
    let lastValues = [
        firstArray[firstArray.length-1], 
        secondArray[secondArray.length-1],
        thirdArray[thirdArray.length-1]
    ]
    if (lastValues[0] === undefined) lastValues[0] = 0;
    if (lastValues[1] === undefined) lastValues[1] = 0;
    if (lastValues[2] === undefined) lastValues[2] = 0;

	if (lastValues[0] === Math.max(...lastValues)) {
        firstArray.pop();
        
    }
        else if (lastValues[1] === Math.max(...lastValues)) {
            secondArray.pop();
        }

	else {
        thirdArray.pop();
	}

return(Math.max(...lastValues))
}

// Only edit above

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

console.log(result)  