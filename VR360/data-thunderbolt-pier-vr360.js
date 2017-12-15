var APP_DATA = {
    "scenes": [
        {
            "id": "0-bridge",
            "name": "Thunderbolt Pier",
            "northOffset": -2.073891745586389,
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
                "yaw": 1.4330018581974482,
                "pitch": 0.070601843265095,
                "fov": 1.0744598890658077
            },
            "linkHotspots": [
                {
                    "yaw": 2.974352389304424,
                    "pitch": 0.24707216156253686,
                    "rotation": 0,
                    "target": "1-viewing-platform"
                }
            ],
            "infoHotspots": [

                {
                    "yaw": -0.7990972118095065,
                    "pitch": -0.15106038535763666,
                    "title": "Chatham Historic Dockyard",
                    "text": "<a href='http://thedockyard.co.uk' target='_blank'>www.thedockyard.co.uk</a>"
                },
                {
                    "yaw": 1.6522376292145484, 
                    "pitch": -0.1353026417241665,
                    "title": "Thunderbolt Pier",
                    "text": "No Visitor Mooring",
                    "icon":"img/yotstop.png"
                },
                {

                    "yaw": -1.727405553919489, 
                    "pitch": -0.09382885990824619,
                    "title": "Upnor Sailing Club",
                    "text":"<a href='http://www.upnorsailingclub.co.uk' target='_blank'>www.upnorsailingclub.co.uk</a>" 
                }
            ]
        },
        {
            "id": "1-viewing-platform",
            "name": "Viewing Platform",
            "northOffset":-1.48,
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
                "yaw": -2.2890989856053636,
                "pitch": 0.19444872855396156,
                "fov": 1.382771425238337
            },
            "linkHotspots": [
                {
                    "yaw": 0.7123701423288544,
                    "pitch": 0.2073974012406392,
                    "rotation": 0,
                    "target": "0-bridge",
                    "targetYaw":-0.16
                },
                {
                    "yaw": 1.6934814241494331,
                    "pitch": 0.5335278782917445,
                    "rotation": 7.0685834705770345,
                    "target": "2-working-boats"
                }
            ],
            "infoHotspots": [
                {
                    "yaw": 2.289098487042885,
                    "pitch": -0.2279748983779868,
                    "title": "Chatham",
                    "text": "Town centre"
                },
                {
                    "yaw": -0.769468301865491,
                    "pitch": -0.1,
                    "title": "Medway Yacht Club",
                    "text": "<a href='http://www.medwayachtclub.com' target='_blank'>www.medwayachtclub.com</a>"
                }
            ]
        },
        {
            "id": "2-working-boats",
            "name": "Working Boats",
            "northOffset":-1.8139494324749954,
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
                "yaw": 1.7182148434579236,
                "pitch": 0.09136804288630174,
                "fov": 1.219941123447821
            },
            "linkHotspots": [
                {
                    "yaw": -1.0608326472390548,
                    "pitch": 0.3160040958357353,
                    "rotation": 12.566370614359176,
                    "target": "1-viewing-platform",
                    "targetYaw":-0.87
                },
                {
                    "yaw": 1.8200669433541288,
                    "pitch": 0.2628491865319944,
                    "rotation": 0,
                    "target": "3-pontoon"
                }
            ],
            "infoHotspots": [
                {
                    "yaw": -2.9489547702069316,
                    "pitch": -0.18,
                    "title": "Jacob Marley",
                    "text": "Boat trips"
                }
            ]
        },
        {
            "id": "3-pontoon",
            "name": "Pontoon",
            "northOffset":-2.1462614618822027,
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
                "yaw": 1.5225465559106839,
                "pitch": 0.30987763095225773,
                "fov": 1.1931428853358095
            },
            "linkHotspots": [
                {
                    "yaw": -1.6558904814502604,
                    "pitch": 0.3211501731119668,
                    "rotation": 0,
                    "target": "2-working-boats",
                    "targetYaw":-1.25
                },
                {
                    "yaw": 1.3523778210114639,
                    "pitch": 0.2992495562882631,
                    "rotation": 0,
                    "target": "4-karitas"
                }
            ],
            "infoHotspots": []
        },
        {
            "id": "4-karitas",
            "name": "Karitas",
            "northOffset":-0.10614217057054454,
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
                "yaw": 0.098434645416555,
                "pitch": -0.006997022449127144,
                "fov": 1.426803395360383
            },
            "linkHotspots": [
                {
                    "yaw": 0.010680604872987942,
                    "pitch": 0.1457344806145624,
                    "rotation": 6.283185307179586,
                    "target": "3-pontoon",
                    "targetYaw":-1.69
                }
            ],
            "infoHotspots": [
                {
                    "yaw": 1.578332736310256,
                    "pitch": -0.3832732999987325,
                    "title": "Chatham Historic Dockyard",
                    "text": "<a href='http://thedockyard.co.uk' target='_blank'>www.thedockyard.co.uk</a>"
                },
                {
                    "yaw": -0.44258917731383285,
                    "pitch": -1.3577934012928132,
                    "title": "Top of the Mast",
                    "text": "Nice view up there......"
                }
            ]
        }
    ],
    "name": "ThunderBolt Pier VR360",
    "settings": {
        "tilePath":"tiles/thunderbolt-pier/",
        "mouseViewMode": "drag",
        "autorotateEnabled": true,
        "fullscreenButton": true,
        "viewControlButtons": false,
        "debugger":false,
        "compass":true
    }
};
