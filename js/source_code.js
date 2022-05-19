var myMap;
var googleSat;
var easybtn;
var mysidebar;
var marker;
var info;
var geojson;
var searchLayer;
var layer;
var searchControl;
var searchLayer;

$(document).ready(function(){

    //create map object

    myMap = L.map('map_div',{center:[8.957424, 125.596873],zoom: 19, zoomControl: false, attributionControl: false, 
        maxBounds: [[8.960525, 125.591470],[8.947069, 125.593348],[8.949179, 125.604671],[8.961631, 125.600104]]});
    
    //add_basemap_layer
    googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{ maxZoom: 22, subdomains:['mt0','mt1','mt2','mt3'] });

    myMap.addLayer(googleSat);



    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }

   // Custom icon class without iconUrl
   var LeafIcon = L.Icon.extend({
    options: {
       iconSize:     [38, 95],
       shadowSize:   [50, 64],
       iconAnchor:   [22, 94],
       shadowAnchor: [4, 62],
       popupAnchor:  [-3, -76]
    }
});


    var featuresLayer = new L.GeoJSON(line);
    
    var searchControl = new L.control.search({
        position: 'topright',
        layer: featuresLayer,
        zoom: 26,
        marker: false
    });

    myMap.addControl( searchControl );

  

    easybtn = L.easyButton('glyphicon glyphicon-play',function(){
       mysidebar.toggle();
    }).addTo(myMap);

    mysidebar = L.control.sidebar('side-bar').addTo(myMap);
    
 
    function onEachFeature(feature, layer) {
        
        layer.on({
            mouseover: function(e){
                layer.setIcon(myIcon)
            },
            mouseout: function(e){
                layer.setIcon(IconStyleTwo)
            },
            click: dynamicSidepanel
            
        });   
    }

    function dynamicSidepanel(e){
         
        mysidebar.show();
            mysidebar.setContent(`

                        
                <div class = "container">
                <p class="close" onclick="mysidebar.hide()"><i class="bi bi-chevron-double-right">Back</i></p>            
                                <img class="myimage" src=${e.target.feature.properties.image}>
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                                <br> 
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                                <br> 
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                                 

                                              
                                        <div class = "row">
                                            <h2>${e.target.feature.properties.title}</h2>
                                            <p><span style='color:gray'>${e.target.feature.properties.category}</span></P>
                                            <hr>
                                        </div>
                                        
                                        <div class = "row">
                                            <h5>Description</h5>
                                            <hr>
                                        </div>

                                        <div class = "row">
                                        <p>${e.target.feature.properties.info}</p>

                                      
                                        </div>

                                        
                                    
                                </div>            
                        </div>

                      
                </div>`);
        
    }

    //------setStyle-------//
    
    // create custom icon

    var myIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25,41],
        iconAnchor: [12,41],
        popupAnchor: [1, -34],
        shadowSize: [41,41]

    });

        IconStyleTwo = L.icon({
            iconUrl: 'lib/leaflet/images/marker-icon.png'
        });
    
    //------polygon style-----//
    function style(feature){
        return{
            radius: 20,
            color:'transparent',
            fillColor:'transparent',
            fillopacity: 0
        };
    }

    L.geoJSON(line, {
        onEachFeature: onEachFeature
    }).addTo(myMap);

    L.geoJSON(polygon, {
        style: function(feature){
            return {

                radius: 20,
                color:"transparent",
                fillColor:"transparent",
                fillopacity: 0 
            }
        },
        onEachFeature: function (feature, layer){
            //layer.bindPopup(feature.properties.name), 
            layer.bindTooltip(feature.properties.name,{
                permanent : true,
                direction : "center",
                className : "no-background",

            }),
            that = this;

        }
    }).addTo(myMap);

    //---Hide--Sidebar--//

    myMap.on('click', function(){

        mysidebar.hide();    

    });

  
})