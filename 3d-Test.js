var Viewer;

// All the scenes for the experience
var scenes = {
  Kitchen: {
     default_yaw: 180,
    image: 'images/Pano__blended_fused_med.jpg',
    preview: 'images/P5200105-small.jpg',
    
    
    hotspots: {
      Living: {
        pitch: 0,
        yaw: 80,
        radius: 0.1,
        distance: 1
      },
      Hall: {
        pitch: 0,
        yaw: 150,
        radius: 0.05,
        distance: 1
      },
      //walrus: {
       // pitch: 0,
        //yaw: 170,
        //radius: 0.05,
        //distance: 1
      //}
    }
  },
  Living: {
    default_yaw: 180,
    image: 'images/SAM_100_0328.jpg',
    preview: 'images/SAM_100_0328.jpg',
    hotspots: {
      Hall: {
        pitch: 0,
        yaw: 185,
        radius: 0.1,
        distance: 1
      },
      Kitchen: {
        pitch: 0,
        yaw: 265,
        radius: 0.05,
        distance: 1
      },
 
    }
  },
  Hall: {
    default_yaw: 90,
    image: 'images/Hall',
    preview: 'images/Hall.jpg',
    hotspots: {
      Kitchen: {
        pitch: 0,
        yaw: 180,
        radius: 0.05,
        distance: 1
      },
      Living: {
        pitch: 0,
        yaw: 100,
        radius: 0.05,
        distance: 1
      },
 
    }

  }
};

function onLoad() {
  Viewer = new VRView.Player('#PrettyPics', {
    image: 'images/black.jpg',
    preview: 'images/black.jpg',
    height: '500px',
    width: '1000px',
    is_stereo: true,
    is_yaw_only: true,
    default_yaw: 180 ,
    is_autopan_off: false
  });

  Viewer.on('ready', onVRViewReady);
  
  Viewer.on('click', onHotspotClick);
  Viewer.on('error', onVRViewError);
}

function onVRViewReady(e) {
  console.log('onVRViewReady');
  loadScene('Kitchen');
  
}


function onHotspotClick(e) {
  console.log('onHotspotClick', e.id);
  if (e.id) {
    loadScene(e.id);
  }
}

function loadScene(id) {
  console.log('loadScene', id);

  // Set the image
  Viewer.setContent({
    
    
   
    default_yaw: scenes[id].default_yaw,
    image: scenes[id].image,
    preview: scenes[id].preview,
    is_stereo: false,
    is_autopan_off: true,
    isYawOnly: scenes[id].isYawOnly,
  });

  // Add all the hotspots for the scene
  var newScene = scenes[id];
  var sceneHotspots = Object.keys(newScene.hotspots);
  for (var i = 0; i < sceneHotspots.length; i++) {
    var hotspotKey = sceneHotspots[i];
    var hotspot = newScene.hotspots[hotspotKey];

    Viewer.addHotspot(hotspotKey, {
      pitch: hotspot.pitch,
      yaw: hotspot.yaw,
      radius: hotspot.radius,
      distance: hotspot.distance,
      
    });
  }
}

function onVRViewError(e) {
  console.log('Error! %s', e.message);
}

window.addEventListener('load', onLoad);
