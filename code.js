function tsp_hk(distance_matrix) {
  const n = distance_matrix.length;
  const memo = Array.from({ length: n }, () => Array(1 << n).fill(-1));

  // Helper function to find the shortest path
  function visit(city, visited) {
    if (visited === (1 << n) - 1) {
      return distance_matrix[city][0]; // Return to start city
    }
    if (memo[city][visited] !== -1) {
      return memo[city][visited];
    }

    let minDistance = Infinity;
    for (let nextCity = 0; nextCity < n; nextCity++) {
      // Check if the city has been visited
      if (!(visited & (1 << nextCity))) {
        const distance = distance_matrix[city][nextCity] + visit(nextCity, visited | (1 << nextCity));
        minDistance = Math.min(minDistance, distance);
      }
    }

    memo[city][visited] = minDistance;
    return minDistance;
  }

  // Start the tour from each city and return the minimum
  let result = Infinity;
  for (let startCity = 0; startCity < n; startCity++) {
    result = Math.min(result, visit(startCity, 1 << startCity));
  }
  return result;
}

