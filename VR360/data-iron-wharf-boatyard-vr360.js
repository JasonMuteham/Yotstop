var APP_DATA = {
  "scenes": [
    {
      "id": "0-faversham-chandlery",
      "name": "Faversham Chandlery",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1944,
      "initialViewParameters": {
        "yaw": 2.639158125864814,
        "pitch": -0.06971356781934013,
        "fov": 1.3329003941545943
      },
      "linkHotspots": [
        {
          "yaw": 2.0058136978889785,
          "pitch": 0.04026664619775033,
          "rotation": 12.566370614359176,
          "target": "1-iron-wharf-boatyard"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-iron-wharf-boatyard",
      "name": "Iron Wharf Boatyard",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1944,
      "initialViewParameters": {
        "yaw": -0.4935156637266207,
        "pitch": -0.0074825991762388355,
        "fov": 1.3329003941545943
      },
      "linkHotspots": [
        {
          "yaw": 3.042487760065373,
          "pitch": 0.1721141214264943,
          "rotation": 5.497787143782138,
          "target": "0-faversham-chandlery"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Iron Wharf Boatyard",
  "settings": {
    "tilePath":"tiles/iron-wharf-boatyard/",
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": true,
    "viewControlButtons": false,
    "debugger":false,
        "compass":false
  }
};
