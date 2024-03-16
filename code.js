function tsp_hk(distance_matrix) {
    const n = distance_matrix.length;
    // memoization storage to cache solutions
    const memo = new Map(); 
    
    // unique key for each state for memoization
    function getKey(city, visited) {
        return city + ',' + visited;
    }

    // Recursive Helper function for the Held-Karp algorithm
    function visit(city, visited) {
        if (visited === (1 << n) - 1) {
            return 0; // End tour without returning to the start city
        }

        // get memoized result if this state has already been solved.
        const key = getKey(city, visited);
        if (memo.has(key)) {
            return memo.get(key);
        }

        // explore all possible next cities and calculate minimum distance.
        let minDistance = Infinity;
        for (let nextCity = 0; nextCity < n; nextCity++) {
            if (!(visited & (1 << nextCity))) {
                const newVisited = visited | (1 << nextCity);
                const distanceToNextCity = distance_matrix[city][nextCity];
                const totalDistance = distanceToNextCity + visit(nextCity, newVisited);

                minDistance = Math.min(minDistance, totalDistance);
            }
        }

        memo.set(key, minDistance);
        return minDistance;
    }

    let shortestTour = Infinity;
    // Considering all cities as starting points
    for (let startCity = 0; startCity < n; startCity++) {
        const visited = 1 << startCity;
        const tourDistance = visit(startCity, visited);
        shortestTour = Math.min(shortestTour, tourDistance);
    }

    return shortestTour;
}


