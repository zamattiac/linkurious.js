/**
 * Event handler functions:
 *   Writing to message box
 *   Selecting a node
 *   Path selection
 *   Stop the ForceLayout2 layout
 *   Reset node and edge color to black
 */

function msg(message) {
    $('#msg').html(message);
}

/**
 * Event handler for clicking on a node
 * Displays node information at top
 * Uncomment line to zoom in to node
 */
function select(e) {
    selected = e.data.node;
    // optional: zoom in to node:
    // locate.nodes(selected.id);
    msg(
        Mustache.render(
            '<h4>Selected Node</h4>' +
            '<p>Name: {{name}}</p>' +
            '<p>Full name: {{fullname}}</p>' +
            '<p>Network centrality: {{degree}} ({{ratio}}% of other members)</p>' +
            '<p>Birthday: {{birth}}</p>'
            , {
                "name": selected.label,
                "fullname": selected.name,
                "degree": s.graph.degree(selected.id),
                "ratio": Math.floor(s.graph.degree(selected.id) / (s.graph.nodes().length - 1) * 100),
                "birth": selected.birthday
            }
        ));
}

/**
 * Catches two node clicks as reported by select() click handling
 * Draws path between them, then reports distance and path directions
*/
function selectPath() {
    if (source === null) {
        source = selected.id;
        msg("Select target: ");
    } else if (target === null) {
        target = selected.id;
        var path = computeAndDrawPath(
            source,
            target,
            "#900",
            "#F00"
        );
        var directions = "<br>Path:";
        for (var i = 0; i < path.length; i++) directions += "<br>" + path[i].id;
        msg("Path length: " + (path.length - 1) + directions);
        source = target = null;
        // TODO: this unbind outputs a console error
        s.unbind("clickNode", selectPath);
    }
}

function stopForce() {
    s.stopForceAtlas2();
    $('#force').html("ForceAtlas2");
    force = false;
}

function resetColor() {
    s.graph.nodes().forEach(function (node, i, a) {
        node.color = "black";
    });
    s.graph.edges().forEach(function (edge, i, a) {
        edge.color = "black";
    });
    msg("Message box");
}