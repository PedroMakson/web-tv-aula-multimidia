'use client'

import { ReactNode, RefObject, createContext, useEffect, useRef, useState } from "react";
import videos, { Video } from "../data/video";

type HomeContextData = {
    videoURL: string;
    playing: boolean;
    totalTime: number;
    currentTime: number;
    videoRef: RefObject<HTMLVideoElement>
    canvasRef: RefObject<HTMLCanvasElement>
    playPause: () => void;
    configCurrentTime: (time: number) => void;
    configVideo: (index: number) => void;
    changeVolume: (volume: number) => void;
    mute: boolean;
    changeIconMute: () => void;
    volume: number;
    nextVideo: () => void;
    fullScreen: boolean;
    changeFullScreen: () => void;
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({ children }: ProviderProps) => {
    const [videoURL, setVideoURL] = useState("");
    const [videoIndex, setVideoIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [volume, setVolume] = useState(0);
    const [mute, setMute] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    useEffect(() => {
        configVideo(videoIndex);
    }, []);

    const configVideo = (index: number) => {
        const currentIndex = index % videos.length;
        const currentVideo: Video = videos[currentIndex];
        setVideoURL(currentVideo.videoURL);
        setVideoIndex(currentIndex);
    };

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.onloadeddata = () => {
                setTotalTime(video.duration);
                setCurrentTime(video.currentTime);

                if (playing) {
                    video.play();
                }
            };

            video.ontimeupdate = () => {
                setCurrentTime(video.currentTime);
            };

            video.onended = () => {
                configVideo(videoIndex + 1);
            };
        }
        draw();
    }, [videoURL]);

    const configCurrentTime = (time: number) => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = time;
        setCurrentTime(time);
    };

    const playPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (playing) {
            setPlaying(false);
            video.pause();
        } else {
            setPlaying(true);
            video.play();
            draw();
        }
    };

    const draw = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        if (playing) {
            requestAnimationFrame(draw);
        }
    };

    const changeVolume = (volume: number) => {
        const video = videoRef.current;
        if (!video) return;

        if (volume > 0) {
            setMute(false);
            video.muted = false;
        }
        if (volume === 0 && video.volume > 0) {
            setMute(true);
            video.muted = true;
        }

        setVolume(volume);
        video.volume = volume;
    };

    const changeIconMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !mute;
        video.volume = 0;

        setVolume(0);
        setMute(!mute);
    };

    const nextVideo = () => {
        configVideo(videoIndex + 1);
    };

    const changeFullScreen = () => {
        const element = document.fullscreenElement;

        if (!element) {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.requestFullscreen().then(() => setFullScreen(true));
            }
        } else {
            document.exitFullscreen().then(() => setFullScreen(false));
        }
    };

    return (
        <HomeContext.Provider value={{
            videoURL,
            playing,
            totalTime,
            currentTime,
            videoRef,
            canvasRef,
            playPause,
            configCurrentTime,
            configVideo,
            changeVolume,
            mute,
            changeIconMute,
            volume,
            nextVideo,
            fullScreen,
            changeFullScreen
        }}>
            {children}
        </HomeContext.Provider>
    );
};

export default HomeContextProvider;