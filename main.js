function minimumMoves(arr1, arr2) {
    let totalMoves = 0;

    for (let i = 0; i < arr1.length; i++) {
        // Convert both numbers to strings to compare digit by digit
        let strNum1 = arr1[i].toString();
        let strNum2 = arr2[i].toString();

        for (let j = 0; j < strNum1.length; j++) {
            // Calculate the number of moves needed for each digit
            totalMoves += Math.abs(parseInt(strNum1[j]) - parseInt(strNum2[j]));
        }
    }

    return totalMoves;
}
const arr1 = [123, 543];
const arr2 = [321, 279];

console.log(minimumMoves(arr1, arr2)); // Output: 16
