function msg(message) {
    document.getElementById('msg').innerHTML = message;
}

var selected, source = null, target = null;

function select(e) {
    selected = e.data.node.id;
    msg("Selected: " + selected);
}

s.bind('clickNode', select);

// Sets source and target to first two node clicks caught by select()
// Displays path between source and target
function selectPath() {
    if (source === null) {
        reset();
        source = selected;
        msg("Select target: ");
    } else if (target === null) {
        target = selected;
        var path = computeAndDrawPath(
            source,
            selected,
            "#900",
            "#F00"
        );
        var directions = "<br>Path:";
        for (var i = 0; i < path.length; i++) directions += "<br>" + path[i].id;
        msg("Path length: " + (path.length - 1) + directions);
        source = target = null;
        // todo: this outputs an error in console
        s.unbind("clickNode", selectPath);
    }
}

function stopForce() {
    s.stopForceAtlas2();
    document.getElementById('force').innerHTML = "ForceAtlas2";
    force = false;
}

var c = s.camera;

// Listeners
document.getElementById('zoomIn').onclick = function () {
    sigma.misc.animation.camera(c, {
        ratio: c.ratio / c.settings('zoomingRatio')
    }, {
        duration: 100
    });
};

document.getElementById('zoomOut').onclick = function () {
    sigma.misc.animation.camera(c, {
        ratio: c.ratio * c.settings('zoomingRatio')
    }, {
        duration: 100
    });
};

force = false;
document.getElementById('force').onclick = function () {
    if (force) {
        stopForce();
    } else {
        force = true;
        document.getElementById('force').innerHTML = "Running, click to stop...";
        s.startForceAtlas2();
        setTimeout(function () {
            stopForce();
            document.getElementById('force').innerHTML = "ForceAtlas2";
        }, 10000);
    }
};

document.getElementById('circle').onclick = function () {
    stopForce();
    circle(s);
};

// When choosing 'Find Path', this takes the first two node click events
document.getElementById('path').onclick = function () {
    msg("Select source: ");
    s.bind('clickNode', selectPath);
};

function reset() {
    s.graph.nodes().forEach(function (node, i, a) {
        node.color = "black";
    });
    s.graph.edges().forEach(function (edge, i, a) {
        edge.color = "black";
    });
    msg("Message box");
    s.refresh();
}

document.getElementById('reset').onclick = reset;
