import classNames from 'classnames/bind';
import { FloatButton } from 'antd';
import NavTop from '@/layouts/components/NavTop';
import Header from '@/layouts/components/Header';
import Footer from '@/layouts/components/Footer';
import RelatedSidebar from '@/layouts/components/RelatedSidebar';
import FloatingButtons from '@/components/FloatingButtons';
import { useScrollHeader } from '@/hooks';
import styles from './SidebarRightLayout.module.scss';

const cx = classNames.bind(styles);

function SidebarRightLayout({ children }) {
    const { hideNavTop, showHeader } = useScrollHeader();

    return (
        <div className={cx('wrapper')}>
            <NavTop hidden={hideNavTop} />
            <Header visible={showHeader} />
            <main className={cx('container')}>
                <div className={cx('content')}>{children}</div>
                <div className={cx('sidebar')}>
                    <RelatedSidebar />
                </div>
                <FloatingButtons
                    zaloUrl="https://zalo.me/0899363369"
                    phoneNumber="0899363369"
                    facebookPages={[
                        { name: 'Trung tâm tư vấn du học', url: 'https://www.facebook.com/duhocpionglobal/' },
                        { name: 'Trung tâm ngoại ngữ', url: 'https://www.facebook.com/ngoaingupionacademy/' },
                    ]}
                />
                <FloatButton.BackTop visibilityHeight={1000} duration={200} style={{ bottom: 72, right: 16 }} />
            </main>
            <Footer />
        </div>
    );
}

export default SidebarRightLayout;
