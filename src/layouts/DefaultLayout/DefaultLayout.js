import classNames from 'classnames/bind';
import { FloatButton } from 'antd';

import NavTop from '@/layouts/components/NavTop';
import Header from '@/layouts/components/Header';
import Footer from '@/layouts/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { useScrollHeader } from '@/hooks';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { hideNavTop, showHeader } = useScrollHeader();

    return (
        <div className={cx('wrapper')}>
            <NavTop hidden={hideNavTop} />
            <Header visible={showHeader} />
            {/* Breadcrumb */}
            <main className={cx('container')}>
                <div className={cx('content')}>{children}</div>
                <FloatingButtons
                    zaloUrl="https://zalo.me/0899363369"
                    phoneNumber="0899363369"
                    facebookPages={[
                        {
                            name: 'Trung tâm tiếng Trung',
                            url: 'https://www.facebook.com/duhocpion',
                        },
                        { name: 'Trung tâm tiếng Anh', url: 'https://www.facebook.com/tienganhpionhoainhon/' },
                    ]}
                />
                <FloatButton.BackTop visibilityHeight={1000} duration={200} style={{ bottom: 72, right: 16 }} />
            </main>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
