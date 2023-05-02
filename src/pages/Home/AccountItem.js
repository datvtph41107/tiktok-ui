import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '~/components/Image';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import Video from './Video';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as WrapperPoppers } from '~/components/Poper';
import AccountVideo from './AccountVideo';
import { useEffect, useMemo, useState } from 'react';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const videoPreview = (attrs) => {
        return (
            <div tabIndex="-1" {...attrs}>
                <WrapperPoppers>
                    <AccountVideo data={data} />
                </WrapperPoppers>
            </div>
        );
    };

    return (
        <div>
            <div className={cx('video-infor')}>
                <Tippy interactive delay={[600, 200]} offset={[-2, 0]} placement="bottom-start" render={videoPreview}>
                    <Image className={cx('avatar')} src={data.user.avatar} />
                </Tippy>

                <div className={cx('item-infor')}>
                    <div className={cx('nickname')}>
                        <strong className={cx('name-infor')}>{data.user.nickname}</strong>
                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        <span className={cx('fullname')}>Tien Dat</span>
                    </div>
                    <div className={cx('des')}>
                        Chả biết ai làm lọt bài này của mình 🥹 đăng lên tặng ae lỗi tại mưa Lê Bảo Remix
                    </div>
                    <Video data={data} />
                </div>
                <div>
                    <Button outline>Follow</Button>
                </div>
            </div>
        </div>
    );
}

export const useElementOnScreen = (options, targetRef) => {
    const [isVisibile, setIsVisible] = useState();
    const callbackFunction = (entries) => {
        const [entry] = entries; //const entry = entries[0]
        setIsVisible(entry.isIntersecting);
    };
    const optionsMemo = useMemo(() => {
        return options;
    }, [options]);
    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, optionsMemo);
        const currentTarget = targetRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [targetRef, optionsMemo]);
    return isVisibile;
};

export default AccountItem;
