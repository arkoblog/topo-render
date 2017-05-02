var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var ReactDOM = require('react-dom')
var L = require('leaflet');
var JMOutput = require('../data/JM_Output_v2')

var baseMapUrl2 = 'https://raw.githubusercontent.com/jedi-Knight/Maps-of-Nepal/v2/nepal-districts-vdcs/{z}/{x}/{y}.png'
var currentDistricts = ['nuwakot', 'sindhupalchowk', 'dolakha', 'gorkha', 'dhading']
var baseMapUrl = 'https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png'

// Load Components

// var MyMap = require('./Maps')


var Home = React.createClass({
    getInitialState: function() {
        return {}
    },
    _loadMap : function () {
            // var map = this.map = L.map(ReactDOM.findDOMNode(this), {scrollWheelZoom: false,attributionControl: false}).setView([28.207, 85.992], 7);
            // var baseLayer = L.tileLayer(baseMapUrl, {
            //         attribution: 'Developed by <a target = "_blank" href="http://kathmandulivinglabs.org">Kathmandu Living Labs</a> <br>  <a href = "http://leafletjs.com" >Leaflet</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors '
            // }).addTo(map);
            // console.log(JMOutput)
            JMOutput.features.map(function(item, i){
                if (item.properties.Class1 == 1) {
                    item.properties.fClass=1
                } else if (item.properties.Class2 == 2) {
                    item.properties.fClass=2
                } else {
                    item.properties.fClass=3
                }
                delete item.properties.Class1
                delete item.properties.Class2
                delete item.properties.Class3
                console.log(item.properties)
            })


            this.JMOutput = JMOutput
            var data = JSON.stringify(JMOutput);
            var blob = new Blob([data], {type: "application/json"});
            var url  = URL.createObjectURL(blob);

            var a = document.createElement('a');
            a.download    = "JMNewOutput.json";
            a.href        = url;
            a.textContent = "Download backup.json";

            document.getElementById('container').appendChild(a);
            // var JMOutputLayer = L.geoJSON(JMOutput).addTo(map);
    },
    componentDidMount: function() {
        this._loadMap();
    },
    render: function() {
        return (
            <div>
            <div id = "container" ></div>

            </div>
        )
    }
})

module.exports = Home;
