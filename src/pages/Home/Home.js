import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import AccountItem from './AccountItem';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as videoService from '~/services/videoService';

const cx = classNames.bind(styles);

const INIT_VALUE = 'for-you';
const pageRandom = Math.floor(Math.random() * 28);

function Home() {
    const [displayVideo, setDisplayVideo] = useState([]);
    const [page, setPage] = useState(pageRandom);
    const [hasMore, setHasMore] = useState(true);
    const [inver, setInver] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // rest of your component code

    useEffect(() => {
        const fetchApi = async () => {
            const result = await videoService.videos({ type: INIT_VALUE, page: page });
            setDisplayVideo(result);
            setInver(false);
        };
        fetchApi();
    }, []);

    const loadMore = async () => {
        const nextPage = page + 1;
        const result = await videoService.videos({ type: INIT_VALUE, page: nextPage });
        if (result.length === 0) {
            setHasMore(false);
        } else {
            setPage(nextPage);
            setDisplayVideo((prevState) => [...prevState, ...result]);
        }
    };
    console.log(inver);
    return (
        <div className={cx('wrapper')}>
            <InfiniteScroll
                dataLength={displayVideo.length}
                next={loadMore}
                hasMore={hasMore}
                inverse={inver}
                loader={<p style={{ textAlign: 'center' }}>Loading...</p>}
            >
                {displayVideo.map((video) => {
                    return <AccountItem key={video.id} data={video} />;
                })}
            </InfiniteScroll>
        </div>
    );
}

export default Home;
