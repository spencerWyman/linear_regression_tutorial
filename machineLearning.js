// Brute force approach to Machine Learning

// returns true of false based on whether the given string compiles
// Does such a thing exist? Of course! You use it every time you run your code!
function compiles(code) { ... }

// recursively enumerates all possible strings up to a certain size,
// ignoring strings that don't compile
// Remember rock paper scissors? This uses a similar technique to
// enumerate every combination.
function allPossiblePrograms(maxSize) {
  const programs = [];
  const alphabet = [' ', ';','!', '...', 'a', 'b', '...']; 
  function generate(charsLeft, program) {
    if (charsLeft === 0) return;
    if (compiles(program)) { programs.append(program); }
    for (let char of alphabet) {
      generate(charsLeft - 1, program + char);
    }
  }

  generate(maxSize, '');
  return programs; 
}

// given a prediction function, the loss function tells you how good it is
// golf scoring rules – lower numbers are better
function loss(data, predictor) {
  let totalLoss = 0;
  for (let datum of data) {
    const x, y = datum;
    const prediction = predictor(x);
    totalLoss += Math.abs(prediction - y);
  }
}

// iterate through all possible programs, choose the best one!
function learningAlgorithm(data, maxSize) {
  let bestProgram;
  let bestLoss = Infinity;
  for (let predictor of allPossiblePrograms(maxSize)) {
    if (loss(data, predictor) < bestLoss) {
      bestProgram = predictor;
    }
  }
  return bestProgram;
}

/* 
This is a horribly inefficient algorithm however. In particular domains, 
we can do much better. However, most algorithms follow the same conceptual pattern.
The things to remember are these three pieces:
   1. A way of generating all possible candidate programs. 
   2. A way of determining how good a candidate is.
   3. A way of choosing better candidates.
*/



//---------- CAVEATS ----------

/* String-Program Duality:
Ok, so the outputs of allPossiblePrograms aren't actually runnable programs, but strings.
We can get around that by positing another magic function, execute,
which will execute a given string and given arguments
*/

function execute(code, ...args) { ... }

const sayGreetingString = "(greeting) => { console.log(greeting); }";
execute(sayGreetingString, "Hello World"); // will print "Hello World"



/* Arguments, not Arrays:
In practice, the first piece to remember "A way of generating all possible candidate programs"
will NOT look like a program that creates every possible program of interest. Usually we won't be storing
very many programs in memory at all! Instead we 'parametrize' our programs using higher order functions. 
In other words, what we want is an algorithm that *can* generate any possible program of interest, not
one that *will* generate any possible program of interest.

The difference is that this program will stop as soon as it reaches the desired program
and will not store all possible programs in memory.
This is much more feasible in practice, although this program in particular is
still not very helpful, since the programNumber doesn't give you much
information about what the program actually *does*.
*/
function parametrizedPrograms(programNumber) {
  let programCount = 0;
  const alphabet = [' ', ';','!', '...', 'a', 'b', '...']; 
  function generate(program) {
    if (programCount === programNumber) return program;
    if (compiles(program)) { programCount++; }
    for (let char of alphabet) {
      return generate(program + char);
    }
  }
  return generate('');
}
