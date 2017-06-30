/**
 * Event handlers
 */

// Current node selected, path find source/target
var selected = null,
    source = null,
    target = null,
    force = false,
    colors = [
    "#D6C1B0",
    "#9DDD5A",
    "#D06D34",
    "#D28FD8",
    "#5D8556",
    "#71D4C6",
    "#CDCF79",
    "#D8A836",
    "#5E8084",
    "#738ECD",
    "#D36565",
    "#61DC7B",
    "#9B7168",
    "#97C4DE",
    "#A57E42",
    "#D5DA41",
    "#D06B97",
    "#917097",
    "#689534",
    "#90D59B"
];

s.bind('clickNode', select);

/**
 * Zoom listeners (in/out/to fit)
 */
$('#zoomIn').on("click", function () {
    sigma.misc.animation.camera(c, {
        ratio: c.ratio / c.settings('zoomingRatio')
    }, {
        duration: 100
    });
});

$('#zoomOut').on("click", function () {
    sigma.misc.animation.camera(c, {
        ratio: c.ratio * c.settings('zoomingRatio')
    }, {
        duration: 100
    });
});

$('#zoomToFit').click(zoomToFit);

/**
 * ForceAtlas2 listener
 */
$('#force').on("click", function () {
    if (force) {
        stopForce();
    } else {
        force = true;
        $('#force').html("Running, click to stop...");
        s.startForceAtlas2();
        setTimeout(function () {
            stopForce();
            $('#force').html("ForceAtlas2");
        }, 10000);
    }
});

/**
 * Fruchterman-Reingold layout listener
 */
$('#frlayout').click(function () {
    stopForce();
// Bind the events:
    sigma.layouts.fruchtermanReingold.start(s);
});

/**
 * Circular layout listener
 */
$('#circle').on("click", function () {
    stopForce();
    circle(s);
});

/**
 * Pathfind listener
 */
// When choosing 'Find Path', this takes the first two node click events
$('#path').on("click", function () {
    resetColor();
    msg("Select source: ");
    s.bind('clickNode', selectPath);
});


/**
 * Reset listener
 */
$('#reset').on("click", function () {
    resetColor();
    selected = target = source = null;
    circle(s);
    s.refresh();
});

/**
 * Community detect listener
 */
$('#community').on("click", function () {
    louvainInstance = sigma.plugins.louvain(s.graph, {
        setter: function (communityId) {
            this.my_community = communityId;
        }
    });
    s.graph.nodes().forEach(function (node) {
        node.color = colors[node.my_community];
    });
    s.refresh();
});

/**
 * Locate node listener
 */
$('#locate').change(function (e) {
    var nid = e.target[e.target.selectedIndex].value;
    if (nid === 'all') {
        locate.center(1);
    }
    else {
        locate.nodes(nid);
    }
});

/**
 * File upload listener
 */
$('#file').change(function () {
    loadFile(s, 'data/' + this.files[0].name);
});