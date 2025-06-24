import classNames from 'classnames/bind';
import { FloatButton } from 'antd';

import { useScrollHeader } from '@/hooks';
import { slugify } from '@/utils';
import NavTop from '@/layouts/components/NavTop';
import Header from '@/layouts/components/Header';
import Footer from '@/layouts/components/Footer';
import TableOfContents from '@/layouts/components/TableOfContents';
import FloatingButtons from '@/components/FloatingButtons';
import Breadcrumb from '@/components/Breadcrumb';
import styles from './BlogLayout.module.scss';

const cx = classNames.bind(styles);

function BlogLayout({ children, tocData = [], breadcrumbTitle = '' }) {
    const { hideNavTop, showHeader } = useScrollHeader();

    const updatedTocData = tocData.map((item) => {
        const cleanedHrefText = item.text.replace(/^\d+(\.\d+)*\.\s*/, '');

        return {
            ...item,
            href: `#${slugify(cleanedHrefText)}`,
            children: item.children?.map((child) => {
                const cleanedChildHrefText = child.text.replace(/^\d+(\.\d+)*\.\s*/, '');
                return {
                    ...child,
                    href: `#${slugify(cleanedChildHrefText)}`,
                };
            }),
        };
    });

    return (
        <div className={cx('wrapper')}>
            <NavTop hidden={hideNavTop} />
            <Header visible={showHeader} />

            <main className={cx('main')}>
                <div className={cx('breadcrumb-wrapper')}>
                    <Breadcrumb title={breadcrumbTitle} />
                </div>
                <div className={cx('container')}>
                    <div className={cx('sidebar')}>
                        <TableOfContents items={updatedTocData} />
                    </div>
                    <div className={cx('content')}>{children}</div>
                    <FloatingButtons
                        zaloUrl="https://zalo.me/0899363369"
                        phoneNumber="0899363369"
                        facebookPages={[
                            {
                                name: 'Trung tâm tiếng Trung Pion',
                                url: 'https://www.facebook.com/tiengtrungpionbinhdinh/',
                            },
                            { name: 'Trung tâm tiếng Anh Pion', url: 'https://www.facebook.com/tienganhpionhoainhon/' },
                        ]}
                    />
                    <FloatButton.BackTop visibilityHeight={1000} duration={200} style={{ bottom: 72, right: 16 }} />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default BlogLayout;
