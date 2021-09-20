function main() {
    const wrap = document.querySelector(".wrap-video")
    const videoPlayer = document.getElementById("video-player");

    const progressBar = document.getElementById("progress-bar");
    const currTime = document.getElementById("curr-time");
    const durationTime = document.getElementById("duration");

    const bigPlayButton = document.getElementById("big_button");
    const actionButton = document.getElementById("action");
    const muteButton = document.getElementById("mute");
    const volumeScale = document.querySelector(".volume");
    const speedSelect = document.querySelector(".speed");
    const fullscreenButton = document.getElementById("fullscreen");
    let countClick = [];

    actionButton.addEventListener('click', videoAct);
    videoPlayer.addEventListener('click', videoAct);
    videoPlayer.addEventListener('timeupdate', videoProgress);
    progressBar.addEventListener('click', videoChangeTime);
    muteButton.addEventListener('click', videoMute);
    volumeScale.addEventListener('change', videoChangeVolume);
    speedSelect.addEventListener('change', videoChangeSpeed);
    document.addEventListener('keydown', keyboard);
    
    function videoAct() {
        if (videoPlayer.paused) {
            videoPlayer.play();
            actionButton.setAttribute("class", "action_play");
            bigPlayButton.setAttribute("class", "big_button_off");
        }
        else {
            videoPlayer.pause();
            actionButton.setAttribute("class", "action_pause");
            bigPlayButton.setAttribute("class", "big_button_on");
        }
        if (durationTime.innerHTML == "00:00") {
            durationTime.innerHTML = videoTime(videoPlayer.duration);
        }
    }

    function videoTime(time) {
        time = Math.floor(time);
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        let minutesVal = minutes;
        let secondsVal = seconds;
        if (minutes < 10) {
            minutesVal = '0' + minutes;
        }
        if (seconds < 10) {
            secondsVal = '0' + seconds;
        }
        return minutesVal + ":" + secondsVal;
    }

    function videoProgress() {
        progress = videoPlayer.currentTime / videoPlayer.duration;
        progressBar.value = progress * 100;
        currTime.innerHTML = videoTime(videoPlayer.currentTime);
    }

    function videoChangeTime(e) {
        var bounds = e.target.getBoundingClientRect();
        let mouseX = e.clientX - bounds.left;

        let progress = mouseX / progressBar.offsetWidth;
        videoPlayer.currentTime = videoPlayer.duration * progress;
    }

    function videoUpTime(e) {
        videoPlayer.currentTime += 10;

    }

    function videoDownTime(e) {
        videoPlayer.currentTime -= 10;

    }

    function videoChooseTime(e) {
        let volumeNumber = event.key * 10;
        console.log(volumeNumber);
        videoPlayer.currentTime = (volumeNumber * videoPlayer.duration) / 100;

    }

    function videoChangeVolume() {
        videoPlayer.volume = volumeScale.value / 100;
        if (videoPlayer.volume == 0) {
            muteButton.setAttribute('class', 'mute_true');
        } else {
            muteButton.setAttribute('class', 'mute_false');
        }
    }

    function videoMute() {
        if (videoPlayer.volume === 0) {
            videoPlayer.volume = volumeScale.value / 100;
            muteButton.setAttribute('class', "mute_false");
        }
        else {
            videoPlayer.volume = 0;
            muteButton.setAttribute('class', "mute_true");
        }
    }

    function videoChangeSpeed() {
        let speed = speedSelect.value / 100;
        videoPlayer.playbackRate = speed;
    }
    function videoBoostSpeed() {
        if (speedSelect.value === "200") {
            return;
        }
        let nb = Number(speedSelect.value);
        speedSelect.value = nb + 25;
        videoChangeSpeed();
    }

    function videoDownsizeSpeed() {
        if (speedSelect.value === "25") {
            return;
        }
        let nb = Number(speedSelect.value);
        speedSelect.value = nb - 25;
        videoChangeSpeed();
    }

    function NextFrame() {
        videoPlayer.currentTime += (1 / 29.97);
    }

    volumeScale.value = 50;
    videoChangeVolume();


    function isFullScreen() {
        return !!( document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    }

    function handleFullscreen() {
        if (isFullScreen()) {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();

            setFullscreen(false);
        }
        else {
            if (videoPlayer.requestFullscreen) videoPlayer.requestFullscreen();
            else if (videoPlayer.mozRequestFullScreen) videoPlayer.mozRequestFullScreen();
            else if (videoPlayer.webkitRequestFullScreen) videoPlayer.webkitRequestFullScreen();
            else if (videoPlayer.msRequestFullscreen) videoPlayer.msRequestFullscreen();

            setFullscreen(true);
        }
    }

    function setFullscreen() {
        videoPlayer.setAttribute('data-fullscreen', !!state);
    }


    fullscreenButton.addEventListener('click', function (e) {
        handleFullscreen();
    });

    

    function keyboard(event) {
            countClick.push(event.key);
            if (event.key === ' ') {
            videoAct();
            return;
        }
        else if ((event.key === 'k')||(event.key === 'л')) {
            videoAct();
            return;
        }
        else if ((event.key === "m")||(event.key === 'ь')) {
            videoMute();
            return;
        }
        else if ((event.key === "f")||(event.key === 'а')) {
            handleFullscreen();
            return;
        }
        else if ((event.key === ".")||(event.key === 'ю')) {
            NextFrame();
            return;
        }
        else if ((countClick[countClick.length - 2] === ">") && (countClick[countClick.length - 1] === "Shift")||(countClick[countClick.length - 2] === "Ю")) {
            videoBoostSpeed();
            return;
        }
        else if ((countClick[countClick.length - 2] === "<") && (countClick[countClick.length - 1] === "Shift")||(countClick[countClick.length - 2] === "Б")) {
            videoDownsizeSpeed();
            return;
        }
        
        else if ((event.key == "l")||(event.key === 'д')) {
            videoUpTime();
            return;
        }
        else if ((event.key == "j")||(event.key === 'о')) {
            videoDownTime();
            return;
        }
        else if ((event.key >= 0) && (event.key < 10)) {
            videoChooseTime();
            return;
        }
    }


    


}

window.addEventListener('load', function (event) {
    main();
});