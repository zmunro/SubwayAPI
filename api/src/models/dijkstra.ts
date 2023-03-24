/**
 * Encapsulates a graph node/vertex
 * Holds references to connected nodes with weights
 */
class GraphNode {

    private outNodes = new Map<GraphNode, number>();

    constructor(
        private value: string
    ) {}

    getValue(): string {
        return this.value;
    }

    getOutNodes(): Map<GraphNode, number> {
        return this.outNodes;
    }

    /**
     * Add a connection to a node, then add node to this
     * Both weights will be the same
     */
    addConnectionTo(node: GraphNode, weight: number): void {
        this.outNodes.set(node, weight);
        if (!node.isConnectedTo(this)) {
            node.addConnectionTo(this, weight);
        }
    }

    isConnectedTo(node: GraphNode): boolean {
        return this.outNodes.has(node);
    }
}

/**
 * Encapsulate a response for finding the shortest path
 */
class ShortestPath {

    constructor(
        public path: GraphNode[],
        public cost: number
    ) {}
}

/**
 * Store the function in a class as a static method
 */
class Dijkstra {

    /**
     * Find the shortest path
     * Return an object which contains the path and sum of weights
     */
    public static findShortestPath(startNode: GraphNode, endNode: GraphNode): ShortestPath {
        //smallest weights between startNode and all other nodes
        const smallestWeights = new Map<GraphNode, number>();
        //for convenience, mark distance from startNode to itself as 0
        smallestWeights.set(startNode, 0);

        //implicit graph of all nodes and previous node in ideal paths
        const prevNodes = new Map<GraphNode, GraphNode>();

        //use queue for breadth first search
        //for convenience, we'll use an array, but linked list would be preferred
        const nodesToVisitQueue: GraphNode[] = [];

        //record visited nodes with a set
        const visitedNodes = new Set<GraphNode>();
        visitedNodes.add(startNode);

        let currentNode = startNode;

        //loop through nodes
        while (true) {
            //get the shortest path so far from start to currentNode
            const dist = smallestWeights.get(currentNode)!;

            //iterate over current child's nodes and process
            const childNodes = currentNode.getOutNodes();
            for (const [childNode, weight] of childNodes) {

                //add node to queue if not already visited
                if (!visitedNodes.has(childNode)) {
                    nodesToVisitQueue.push(childNode);
                }

                //check the distance from startNode to currentNode + thisNode
                const thisDist = dist + weight;

                //if we already have a distance to childNode, compare with this distance
                if (prevNodes.has(childNode)) {
                    //get the recordest smallest distance
                    const altDist = smallestWeights.get(childNode)!;

                    //if this distance is better, update smallest distance + prev node
                    if (thisDist < altDist) {
                        prevNodes.set(childNode, currentNode);
                        smallestWeights.set(childNode, thisDist);
                    }
                } else {
                    //if there is no distance recoded yet, add now
                    prevNodes.set(childNode, currentNode);
                    smallestWeights.set(childNode, thisDist);
                }
            } 

            //mark that we've visited this node
            visitedNodes.add(currentNode);

            //exit if done
            if (nodesToVisitQueue.length === 0) {
                break;
            }

            //pull the next node to visit, if any
            currentNode = nodesToVisitQueue.shift()!;   
        }

        //get the shortest path into an array
        const path: GraphNode[] = [];

        currentNode = endNode;
        while (currentNode !== startNode) {
            path.push(currentNode);

            currentNode = prevNodes.get(currentNode)!;
        }
        path.push(startNode);

        //reverse the path so it starts with startNode
        path.reverse();
        const cost = smallestWeights.get(endNode)!;
        return new ShortestPath(path, cost);
    }
}