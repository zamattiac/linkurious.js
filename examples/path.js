/**
 * computeAndDrawPath(srcId, destId, boundaryColor, pathColor)
 * Calls the A* plugin (astar)to return a path, and then colors nodes and edges along path
 *
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
                var edge = s.graph.edges(getEdgeId(path[i - 1].id, path[i].id));
                if (edge) {
                    edge.color = pathColor;
                }
                else if (edge = s.graph.edges(getEdgeId(path[i - 1].id, path[i].id))) {
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

var getEdgeId = function (nodeId1, nodeId2) {
    var edges = s.graph.edges();
    var edge;
    for (var i = 0; i < edges.length; i++) {
        edge = edges[i];
        if (edge["source"] === nodeId1) {
            if (edge["target"] === nodeId2) {
                return edge["id"];
            }
        }
        if (edge["target"] === nodeId1) {
            if (edge["source"] === nodeId2) {
                return edge["id"];
            }
        }
    }
};
