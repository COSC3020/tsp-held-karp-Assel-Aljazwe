[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/KdVea3AG)
# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

# Runtime Analysis

## Time Complexity

- **State Exploration**: The algorithm's core operation is exploring states defined by subsets of cities (with $\(2^n\)$ possible subsets due to $\(n\)$ cities) and selecting each city as a potential starting point. This results in a total of $\(n \times 2^n\)$ unique states.
  
- **Per-State Operations**: For each state, the algorithm must decide on the next city to visit, considering up to $\(n-1\)$ possibilities (as it doesn't revisit the starting city within a state). The decision involves calculating the minimum distance from the current subset configuration to the next city, which is a linear operation with respect to $\(n\)$.

The **time complexity**, therefore, is: $$Θ(n^2 \times 2^n)\$$ This reflects the algorithm's thorough approach, examining all subsets of cities and calculating the optimal route within each subset by considering all possible next cities.

## Memory Complexity

- **Memoization Strategy**: To avoid recalculating distances for previously encountered states, the algorithm uses memoization, storing the shortest distance for each combination of a starting city and visited cities subset. Given $\(n\)$ cities and $\(2^n\)$ subsets, the memoization requires storage for $\(n \times 2^n\)$ entries, thus being the primary factor in memory usage.
  
- **Recursion**: The recursive nature of the algorithm also impacts the memory through the call stack. The call stack can grow up to $\(n\)$ levels, corresponding to the maximum number of cities to be visited in sequence. However, compared to memoization storage, the recursion stack's memory impact is minimal.

Thus, the algorithm’s **memory complexity** is: $$Θ(n \times 2^n)\$$ 
This is mainly because of memoization, which saves the solutions for every unique state the algorithm encountered while running.

### Conclusion

The Held-Karp algorithm shows a dynamic programming approach to solving the TSP, addressing the challenge of identifying the shortest route connecting all cities. It divides this complex problem into smaller, more manageable pieces, enabling a step-by-step discovery of the shortest path and using memoization to boost efficiency by avoiding repeat work.
