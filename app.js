let Resolutions = {
  '144p': { width: 256, height: 144 },
  '240p': { width: 320, height: 240 },
  '360p': { width: 480, height: 360 },
  '480p': { width: 854, height: 480 },
  '720p': { width: 1280, height: 720 },
  '1080p': { width: 1920, height: 1080 }
}

let mediaConfig = {
  audio: true,
  video: Resolutions['1080p']
};

let stream = null;
let btn = document.getElementById('mediaSettingsBtn')
let stopBtn = document.getElementById('stop')
let resumeBtn = document.getElementById('resume')
let resolutionDropdown = document.getElementById('resolutionDropdown')
let video = document.getElementById('video')

//----------------------------------------------------------------------------------------------------

getMedia = async (constraints) => {
  try 
  {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(stream);
    return stream;
  } 
  catch(e) 
  {
    console.error('Error: ', e);
    return;
  }
}

// Getting media
btn.addEventListener('click', async () => {
  stopStream(stream)
  
  let resolution = resolutionDropdown.value;
  let config = {...mediaConfig}
  config.video = Resolutions[resolution]
  console.log('Config: ', config)

  stream = await getMedia(config)
  if(stream)
    video.srcObject = stream
})

stopBtn.addEventListener('click', () => {
  stopStream(stream)
})

resumeBtn.addEventListener('click', () => {
  resumeStream(stream)
})

stopBtn.addEventListener('click', () => {
  stopStream(stream)
})

resumeBtn.addEventListener('click', () => {
  btn.click()
})

// Changing resolution
resolutionDropdown.addEventListener('change', async () => {
  stopStream(stream)

  let resolution = resolutionDropdown.value;
  let config = {...mediaConfig}
  config.video = Resolutions[resolution]
  console.log('Config: ', config)

  stream = await getMedia(config)
  if(stream)
    video.srcObject = stream
})

stopStream = (stream) => {
  if(stream)
    stream.getTracks().forEach(track => track.stop())
}
