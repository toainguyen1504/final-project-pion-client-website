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
                    zaloUrl="https://zalo.me/3594539674294848476"
                    phoneNumbers={[
                        { label: 'Hotline Pion English', number: '0899363369' },
                        { label: 'Hotline Pion Chinese', number: '0899108678' },
                        { label: 'Hotline du học', number: '0901900677' },
                    ]}
                    facebookPages={[
                        { name: 'Tiếng Anh Pion', url: 'https://www.facebook.com/ngoaingupion' },
                        {
                            name: 'Tiếng Trung Pion',
                            url: 'https://www.facebook.com/tiengtrungpion',
                        },
                        {
                            name: 'Du học Pion Global',
                            url: 'https://www.facebook.com/duhocpion/',
                        },
                    ]}
                />
                <FloatButton.BackTop visibilityHeight={1000} duration={200} style={{ bottom: 72, right: 16 }} />
            </main>
            <Footer />
        </div>
    );
}

export default SidebarRightLayout;
