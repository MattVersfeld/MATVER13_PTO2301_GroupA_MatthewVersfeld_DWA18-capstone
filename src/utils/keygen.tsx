// @ts-nocheck

/*
  * This function, 'generateCode', generates a random code of a specified length,
  * composed of numeric characters. The generated code is formatted into groups
  * of four digits separated by hyphens.
  *
  * Parameters:
  *  - length: The desired length of the generated code.
  *
  * Steps:
  *  1. Initialize an empty string 'result' to store the generated code.
  *  2. Define the characters pool containing only numeric characters.
  *  3. Generate a random numeric character for each position in the code based on the specified length.
  *  4. Format the generated code into groups of four digits separated by hyphens.
  *  5. Return the formatted code.
  *
  * Note:
  *  - The code generation is achieved by iterating over the specified length,
  *    picking random numeric characters from the characters pool, and concatenating them.
  *  - The result is then formatted using a regular expression to create groups of four digits.
*/
export default function generateCode(length) {
    let result = "";
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        result += characters[Math.floor(Math.random() * characters.length)];
    }

    result = result.match(/\d{1,4}/g).join("-");
    return result;
}