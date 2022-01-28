require(["esri/config", "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Measurement",
  "esri/widgets/LayerList",
  "esri/widgets/Search",
  "esri/widgets/Legend",
  "esri/widgets/BasemapGallery",
  "esri/geometry/Point",
  "esri/widgets/Expand"], function (esriConfig, Map, MapView, FeatureLayer, Measurement, LayerList, Search, Legend, BasemapGallery, Point, Expand) {
    const map1 = new Map({
      basemap: "topo-vector" // Basemap layer service
    });
    const view = new MapView({
      map: map1,
      center: [15.182258, 53.465789], // Longitude, latitude
      zoom: 8, // Zoom level
      container: "map" // Div element
    });
    //warstwy
    const krajobrazowy = new FeatureLayer({
      url: "https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/warstwy_zip/FeatureServer",
    });
    const narodowy = new FeatureLayer({
      url: "https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/warstwy_zip/FeatureServer/1",
    });
    const obrys = new FeatureLayer({
      url: "https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/warstwy_zip/FeatureServer/2",
    });

    //popup

    const popupKrajobrazowe = {
      "title": "Park krajobrazowy",
      "content": "<b>Nazwa:</b> {nazwa}<br><b>Powierzchnia:</b> {Shape_Area}<br>",
    }
    const trailheadsKrajobrazowe = new FeatureLayer({
      url: "https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/warstwy_zip/FeatureServer",
      outFields: ["nazwa", "Shape_Area"],
      popupTemplate: popupKrajobrazowe
    });
    const popupNarodowe = {
      "title": "Park Narodowy",
      "content": "<b>Nazwa:</b> {nazwa}<br><b>Powierzchnia:</b> {Shape_Area}<br>",
    }
    const trailheadsNarodowe = new FeatureLayer({
      url: "https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/warstwy_zip/FeatureServer/1",
      outFields: ["nazwa", "Shape_Area"],
      popupTemplate: popupNarodowe
    });
    //Measurement
    const measurment = new Measurement({
      view: view,
      activeTool: "distance"
    });
    //LayerList
    const layerList = new LayerList({
      view: view
    });
    let expLayer = new Expand({
      view: view,
      content:layerList
    })
      view.ui.add(expLayer, "top-left");
  
    //Search
    const sources = [{
      url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer"
    }];
    const searchWidget = new Search({
      view: view,
      sources: sources
    });
    view.ui.add(searchWidget, {
      position: "top-right",
      index: 2
    });
    //Legend
    view.when(() => {
      // get the first layer in the collection of operational layers in the WebMap
      // when the resources in the MapView have loaded.
      const featureLayer = map1.layers.getItemAt(0);
      const legend = new Legend({
        view: view,
        layerInfos: [
          {
            layer: featureLayer,
            title: "Park Krajobrazowy"
          }

        ]
      });
      view.ui.add(legend, "bottom-left");
    });
    //basemapgallery
    const basemapGallery = new BasemapGallery({
      view: view,
    });
    let expGal = new Expand({
      view:view,
      content: basemapGallery
    });
    view.ui.add(expGal,"bottom-right");
    //linki
    let barlienckik= new Point({
      latitude: 52.9,
      longitude: 15.316667
    });
    let drawskik = new Point ({
      latitude: 53.650775550000006,
      longitude:16.16589709046181
    });
    let wolinskip = new Point({
      latitude:53.976066200000005,
      longitude:14.54062329913811
    });
    let drawienskip = new Point({
      latitude:53.11296175,
      longitude:15.885129302729716
    });
    let barlinecki = document.getElementById("barlinecki");
    let drawski = document.getElementById("drawski");
    let wolinski = document.getElementById("wolinski");
    let drawienski = document.getElementById("drawienski"); 
    
    let zooom={
      duration:2000
    };
    barlinecki.addEventListener("click", function(){
      view.goTo({
        target: barlienckik,
        zoom: 10,
      }, zooom);
    });
    drawski.addEventListener("click", function(){
      view.goTo({
        target: drawskik,
        zoom: 10,
      }, zooom);
    });
    wolinski.addEventListener("click", function(){
      view.goTo({
        target:wolinskip,
        zoom:10,
      }, zooom);
    });
    drawienski.addEventListener("click", function(){
      view.goTo({
        target:drawienskip,
        zoom: 10,
      });
    });
    view.ui.add(measurment, "top-left");
    map1.add(krajobrazowy);
    map1.add(narodowy);
    map1.add(obrys);
    map1.add(trailheadsKrajobrazowe);
    map1.add(trailheadsNarodowe);

  });