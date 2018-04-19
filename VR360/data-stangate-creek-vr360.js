var APP_DATA = {
  scenes: [
    {
      id: "0-stangate-creek",
      name: "Stangate Creek",
      northOffset: 0.17220867291827346,
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true
        },
        {
          tileSize: 512,
          size: 512
        },
        {
          tileSize: 512,
          size: 1024
        },
        {
          tileSize: 512,
          size: 2048
        }
      ],
      faceSize: 1767.5,
      initialViewParameters: {
        yaw: -2.6515728573782305,
        pitch: 0.0992631138850335,
        fov: 1.3329003941545943
      },
      linkHotspots: [],
      infoHotspots: []
    }
  ],
  name: "Stangate Creek",
  settings: {
    tilePath: "https://images.yotstop.com/file/yotstop/VR360/tiles/stangate-creek/",
    mouseViewMode: "drag",
    autorotateEnabled: true,
    fullscreenButton: true,
    viewControlButtons: false,
    debugger:false,
    compass: true
  }
};
