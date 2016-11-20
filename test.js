let Graph =  require('./vdt/graph');


//let nodes = [1,2,3,4,5,6,7];
//let edges = [[1,2,1],[1,4,5],[3,4,2],[3,5,3],[4,6,1],[2,3,1]];
//let graph = new Graph(nodes,edges);
//console.log(Object.getOwnPropertyNames(Graph.prototype));
//console.log(graph.getAdjacencyList());
//console.log(graph.getDfsList());
//console.log(graph.hasCircle());
//console.log(graph.getBfsList());
//graph.addNode();
//graph.addEdge([4,1,1]);
//console.log(graph.getAdjacencyList());
//console.log(graph.hasCircle());
//console.log(graph.getShortCut());

let nodes = [1,2,3,4,5];
let edges = [[1,2,10],[1,5,5],[2,3,1],[2,5,2],[3,4,4],[4,3,6],[4,1,7],[5,2,3],[5,3,9],[5,4,2]];
let graph = new Graph(nodes,edges);
console.log(graph.getShortCut());
