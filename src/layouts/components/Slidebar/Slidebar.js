import classNames from 'classnames/bind';
import styles from './Slidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import config from '~/config';
import * as userService from '~/services/userService';
import { useEffect, useState } from 'react';
import SuggestedAccounts from '~/components/SuggestedAccounts/SuggestedAccounts';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
    const [userResult, setUserResult] = useState([]);
    const [isSeeAll, setIsSeeAll] = useState(false);
    const [page, setPage] = useState(INIT_PAGE);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await userService.users({ page, perPage: PER_PAGE });
            setUserResult((prevUsers) => [...prevUsers, ...result]);
        };
        fetchApi();
    }, [page]);

    const handleSeeAll = (isSeeAll) => {
        // console.log(isSeeAll);
        if (page === 2) {
            setIsSeeAll(true);
        }

        if (page < 3) {
            setPage(page + 1);
        } else {
            setUserResult([]);
            setPage(INIT_PAGE);
            setIsSeeAll(false);
        }
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <SuggestedAccounts
                label="Suggested accounts"
                data={userResult}
                onSeeAll={handleSeeAll}
                isSeeAll={isSeeAll}
            />

            <SuggestedAccounts label="Following accounts" data={userResult} />
        </aside>
    );
}

export default Sidebar;
