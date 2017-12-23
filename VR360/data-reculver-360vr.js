var APP_DATA = {
  "scenes": [
    {
      "id": "0-west-approach",
      "name": "West Approach",
      "northOffset": 0.6292596901567471,
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
        "yaw": 2.5098559769996864,
        "pitch": 0.017474267963212498,
        "fov": 1.3329003941545943
      },
      "linkHotspots": [
        {
          "yaw": 2.4510236257664166,
          "pitch": 0.05458498113016397,
          "rotation": 0,
          "target": "5-west-end"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-south-tower",
      "name": "South Tower",
      "northOffset":-1.8151,
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
        "yaw": -1.9056555664114043,
        "pitch": 0.13816908683926066,
        "fov": 1.2424983224529278
      },
      "linkHotspots": [
        {
          "yaw": -1.8293748579879683,
          "pitch": 0.18561774715651502,
          "rotation": 0,
          "target": "8-north-tower"
        },
        {
          "yaw": -0.21173158788015556,
          "pitch": 0.21316724619750005,
          "rotation": 0,
          "target": "3-southeast-wall",
          "targetYaw":2.5
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-east-end",
      "name": "East End",
      "northOffset": -1.6841,
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
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 3.061455197761667,
          "pitch": 0.12683674682489077,
          "rotation": 0,
          "target": "7-central-towers"
        },
        {
          "yaw": -1.7455270995841055,
          "pitch": 0.339566476484908,
          "rotation": 0.7853981633974483,
          "target": "4-northeast-wall"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-southeast-wall",
      "name": "Southeast wall",
      "northOffset":0.8773,
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
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.436588000906303,
          "pitch": 0.30220865367707184,
          "rotation": 6.283185307179586,
          "target": "1-south-tower"
        },
        {
          "yaw": -1.1726429202059343,
          "pitch": 0.2571517392641667,
          "rotation": 0,
          "target": "5-west-end",
          "targetYaw":-2.97
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-northeast-wall",
      "name": "Northeast wall",
      "northOffset": 1.639448,
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
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.7008244444001495,
          "pitch": 0.20709796029315442,
          "rotation": 11.780972450961727,
          "target": "2-east-end",
          "targetYaw":2.87,
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-west-end",
      "name": "West End",
      "northOffset":-1.77,
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
        "yaw": 0.0284932532871931,
        "pitch": -0.2394431736397049,
        "fov": 1.3329003941545943
      },
      "linkHotspots": [
        {
          "yaw": 0.9672479047113463,
          "pitch": 0.15421915667652186,
          "rotation": 5.497787143782138,
          "target": "6-southwest-wall"
        },
        {
          "yaw": 3.1066472432433816,
          "pitch": 0.3000106530493767,
          "rotation": 0,
          "target": "0-west-approach",
          "targetYaw":-0.56
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "6-southwest-wall",
      "name": "Southwest wall",
      "northOffset":0.7573,
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
        "yaw": -0.2475950808679972,
        "pitch": -0.07589157511435296,
        "fov": 1.3329003941545943
      },
      "linkHotspots": [
        {
          "yaw": -0.9890904976644226,
          "pitch": 0.18667658668377562,
          "rotation": 0,
          "target": "5-west-end",
          "targetYaw":-2.97
        },
        {
          "yaw": 1.7912455652242514,
          "pitch": 0.17906859511492534,
          "rotation": 0,
          "target": "3-southeast-wall"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "7-central-towers",
      "name": "Central Towers",
      "northOffset":1.5085,
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
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.8529742088842305,
          "pitch": 0.3276414804828285,
          "rotation": 0.7853981633974483,
          "target": "8-north-tower"
        },
        {
          "yaw": -1.2436017831738653,
          "pitch": 0.461871306692224,
          "rotation": 5.497787143782138,
          "target": "1-south-tower",
          "targetYaw":0.133,
        },
        {
          "yaw": 2.8559094642749123,
          "pitch": 0.11661829835817272,
          "rotation": 0,
          "target": "2-east-end"
        },
        {
          "yaw": -2.6430778729095596,
          "pitch": 0.2788914833743359,
          "rotation": 0.7853981633974483,
          "target": "3-southeast-wall"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "8-north-tower",
      "name": "North Tower",
      "northOffset":-2.8904,
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
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.11437954304198428,
          "pitch": 0.1510150663081422,
          "rotation": 0,
          "target": "1-south-tower",
          "targetYaw":0.78,
        },
        {
          "yaw": -1.629763758294768,
          "pitch": 0.15075495418867035,
          "rotation": 0,
          "target": "2-east-end"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Reculver - North Kent Coast",
  "settings": {
    "tilePath": "tiles/reculver/",
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": true,
    "viewControlButtons": false,
    "debugger": true,
    "compass": true
  }
};
