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

function BlogLayout({ children, tocData = [], breadcrumbTitle = '', parentPath = '', parentLabel = '' }) {
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
                    <Breadcrumb
                        title={breadcrumbTitle}
                        parentPath={parentPath || undefined}
                        parentLabel={parentLabel || undefined}
                    />
                </div>
                <div className={cx('container')}>
                    <div className={cx('sidebar')}>
                        <TableOfContents items={updatedTocData} />
                    </div>
                    <div className={cx('content')}>{children}</div>
                    <FloatingButtons
                        zaloUrl="https://zalo.me/3594539674294848476"
                        phoneNumbers={[
                            { label: 'Hotline Pion English', number: '0899363369' },
                            { label: 'Hotline Pion Chinese', number: '0899108678' },
                            { label: 'Hotline du học', number: '0901900677' },
                        ]}
                        facebookPages={[
                            { name: 'Tiếng Anh Pion', url: 'https://www.facebook.com/tienganhpionhoainhon/' },
                            {
                                name: 'Pion Global Bình Định',
                                url: 'https://www.facebook.com/duhocpion',
                            },
                            {
                                name: 'Pion Global HCM',
                                url: 'https://www.facebook.com/duhocpionhcm/',
                            },
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
