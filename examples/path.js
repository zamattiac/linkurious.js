/*
 computeAndDrawPath(
 getNodeId(0, 0),
 getNodeId(6, 9),
 "#900",
 "#F00"
 );
 */
function computeAndDrawPath(srcId, destId, boundaryColor, pathColor) {
    var path = s.graph.astar(srcId, destId, {
        undirected: true
    });
    if (path) {
        for (var i = 0; i < path.length; i++) {
            path[i].color = pathColor;
            if (i > 0) {
                var edge = s.graph.edges(path[i - 1].id + path[i].id);
                if (edge) {
                    edge.color = pathColor;
                }
                else if (edge = s.graph.edges(path[i].id + path[i - 1].id)) {
                    edge.color = pathColor;
                }
            }
        }
    }
    var srcNode = s.graph.nodes(srcId),
        destNode = s.graph.nodes(destId);
    srcNode.color = boundaryColor;
    destNode.color = boundaryColor;
    s.refresh();
    return path;
}

//TODO: make agnostic
var getEdgeId = function (nodeId1, nodeId2) {
    return nodeId1 + nodeId2;
};
