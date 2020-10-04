### InFix Notation: A mathematical notation in which operators are placed between operands.

### PreFix Notation: Also known as Polish Notation, is a mathematical notation in which operators precede their operands.

### PostFix Notation: Also known as Reverse Polish Notation, is a mathematical notation in which operators follow their operands.

Practically, these are used in calculators, as they increase the speed of calculations.

## Algorithms for conversion

### InFix to PostFix conversion:

1. Scan each element of the expression (X) from left to right and repeat steps 2 to 5 until the stack is empty.
2. If an operand is encountered add it to the resultant string (Y).
3. If a left parenthesis ( "(" ) is encountered then push it to the stack.
4. If an operator is encountered then:
   1. Repeatedly pop from stack and add it to Y which has the same or higher precedence than the next operator.
   2. Push operator to the stack.
5. If a right parenthesis is encountered then:
   1. Repeatedly pop from the stack and to Y until a left parenthesis is encountered.
   2. Pop the left parenthesis.
6. END

### InFix to PreFix conversion:

1. Scan the expression (X) and reverse it, also replace "(" to ")" and vice versa.
2. Perform InFix to PostFix conversion on the reversed expression.
3. Finally, reverse the obtained PostFix expression, resulting in the PreFix expression.
4. END

## Algorithms for evaluations

### PostFix evaluation:

1. Scan the expression (X) from left to right and repeat steps 2 to 4.
2. If an operand is encountered then push the element to stack.
3. If an operator is encountered then pop two operands and evaluate based on the operator.
4. Push the answer to the stack.
5. Finally, pop the element which is the answer.
6. END

### PreFix evaluation:

1. Scan the expression (X) and reverse it.
2. Perform PostFix evaluation on the expression.
3. The resulting value is the answer.
4. END
