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
let startBtn = document.getElementById('startStreamBtn')
let stopBtn = document.getElementById('stopStreamBtn')
let resolutionDropdown = document.getElementById('resolutionDropdown')
let errorDiv = document.getElementById('error-container')
let video = document.getElementById('video')

//----------------------------------------------------------------------------------------------------

getMedia = async (constraints) => {
  clearErrors()
  try 
  {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.classList.remove('d-none')
    return stream;
  } 
  catch(e) 
  {
    console.error('Error: ', e);
    video.classList.add('d-none')
    let error = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${e}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `
    errorDiv.innerHTML = error
    return;
  }
}

// Getting media
startBtn.addEventListener('click', async () => {
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

clearErrors = () => {
  errorDiv.innerHTML = ''
}
