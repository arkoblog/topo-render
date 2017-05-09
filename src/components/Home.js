var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var ReactDOM = require('react-dom')
var npl_boundary = require('../data/npl_boundary');
var L = require('leaflet');
// var JMOutput = require('../data/JM_Subset')
var JMOutput2 = require('../data/JM_Output_Mouse_262070')


require('leaflet-boundary-canvas')
require('leaflet.vectorgrid')
require('../css/mapStyles.css')


var baseMapUrl2 = 'https://raw.githubusercontent.com/jedi-Knight/Maps-of-Nepal/v2/nepal-districts-vdcs/{z}/{x}/{y}.png'
var baseMapUrl = 'https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png'
var esri_topo = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
// Load Components


var Home = React.createClass({
    getInitialState: function() {
        return {}
    },

    _loadMap : function () {
        var map = this.map = L.map(ReactDOM.findDOMNode(this), {scrollWheelZoom: false,attributionControl: false}).setView([28.207, 83.992], 8);
        
        L.control.attribution({position: 'bottomright', prefix:false}).addTo(map);
        var Esri_WorldTopoMap = L.TileLayer.boundaryCanvas(esri_topo, {
            boundary: npl_boundary,
            // attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        }).addTo(map);

        var baseLayer = L.tileLayer(baseMapUrl2, {
            attribution: 'Developed by <a target = "_blank" href="http://kathmandulivinglabs.org">Kathmandu Living Labs</a> <br>  <a href = "http://leafletjs.com" >Leaflet</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors '
        }).addTo(map)



        var getColor = function(fClass) {
            if (fClass == 1) {
                return '#ff3f00'
            } else if (fClass == 2) {
                return '#ffb400'
            } else {
                return '#000000'
            }
        }


        var getLegendColor = function(fClass) {
            if (fClass == 1) {
                return 'rgba(255, 63, 0,0.8)'
            } else if (fClass == 2) {
                return '#ffb400'
            } else {
                return 'rgba(100,100,100,0.2)'
            }
        }


        var getOpacity = function(fClass) {
            // console.log(fClass)
            if (fClass == 1) {
                return 0.8
            } else if (fClass == 2) {
                return 0.8
            } else {
                return 1
            }
        }


        var legend = L.control({position: 'bottomleft'});

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [1,2,3],
                labels = ["High", "Moderate", "Low"];


            // loop through our density intervals and generate a label with a colored square for each interval
            div.innerHTML += '<div class="legend-description">Probability of Species Occurence</div>'
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<div class="legend-parent"><i class="legend-icon fa fa-circle"  style = " color: ' + getLegendColor(grades[i]) + ' " aria-hidden="true"></i>   <span class="legend-label">'+ labels[i] + '</span><br/></div>';
            }
            // console.log(div)
            return div;
        }.bind(this);

        legend.addTo(map);


        var vectorGridBg = L.vectorGrid.slicer( npl_boundary, {
            rendererFactory: L.svg.tile,
            vectorTileLayerStyles: {

                sliced: function(properties, zoom) {
                    return {
                        fillColor: '#888',
                        fillOpacity: 0.2,
                        stroke: true,
                        fill: true,
                        color: 'black',
                        weight: 0,
                    }
                }
            },
            interactive: true,
            getFeatureId: function(f) {
                // return f.properties.wb_a3;
            }
        }).addTo(map)

        var vectorGrid = L.vectorGrid.slicer( JMOutput2, {
            rendererFactory: L.svg.tile,
            vectorTileLayerStyles: {

                sliced: function(properties, zoom) {
                    // console.log(Object.keys(properties))
                    var p = properties[Object.keys(properties)[0]]
                    return {
                        fillColor: getColor(p),
                        fillOpacity: getOpacity(p),
                        stroke: true,
                        fill: true,
                        color: 'black',
                        weight: 0,
                    }
                }
            },
            interactive: true,
            getFeatureId: function(f) {
                // return f.properties.wb_a3;
            }
        }).addTo(map)

    },
    componentDidMount: function() {
        this._loadMap();
    },
    render: function() {
        return (
                <div id="map" className = "sidebar-map" style={{height:"100vh"}}>
                </div>
        )
    }
})

module.exports = Home;
