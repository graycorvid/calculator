# calculator
This one doesn't require a long introduction: basic calculator made with HTML, SCSS and JavaScript. 
3 diffrent color themes avaible.
Next on the to do list:
- add backspace button
- allow keyboard input

## Additional information:
Simple calculator that allows numbers up to 7 digits in length as input. The result is rounded to 2 decimal places. 


***IMPORTANT:*** as of right now the calculator does NOT follow order of operations - it calculates the result in order of used operators!

## Thoughts:
So far the biggest challenge was taking numbers and operators and making an actual mathematical equastion out of them.
After some trial and error I decided make two arrays: one for numbers and the other for operators.
Then I used **.reduce()** method on the numbersArray and used if statements to compare each sign =/-/*/÷ with content of the operatorsArray. 

Second issue was controling wheter or not buttons are responsive to clicks.
I made sure that you can't use multiple "." dots in one number or at the end of the number. I applied the same logic to operator buttons.
