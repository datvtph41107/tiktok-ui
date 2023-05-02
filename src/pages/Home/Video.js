import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useElementOnScreen } from './AccountItem';

const cx = classNames.bind(styles);

function Video({ data }) {
    const videoRef = useRef();
    const [playing, setPlaying] = useState(false);
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    };
    const isVisibile = useElementOnScreen(options, videoRef);
    useEffect(() => {
        if (isVisibile) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisibile]);

    const handleClick = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(!playing);
        } else {
            videoRef.current.play();
            setPlaying(!playing);
            videoRef.removeAttribute('muted');
        }
    };

    return (
        <div className={cx('video-display')}>
            <div>
                <video
                    controls
                    onClick={handleClick}
                    ref={videoRef}
                    width="320"
                    height="574"
                    loop
                    preload="true"
                    muted
                    poster={data.thumb_url}
                >
                    {/* If some browsers require user interaction before playing the video,
                     you can try adding the muted attribute to the video element,  */}
                    <source src={data.file_url} type="video/mp4" />
                </video>
            </div>
        </div>
    );
}

export default Video;
