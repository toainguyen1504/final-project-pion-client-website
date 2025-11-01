import React from 'react';
import { Table, Typography, Popover, Button, Grid } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from './CustomTable.module.scss';

const cx = classNames.bind(styles);
const { Title } = Typography;
const { useBreakpoint } = Grid;

const CustomTable = ({ title, columns, data }) => {
    const screens = useBreakpoint();
    const isMobile = !screens.md; // md = 768px, lg = 992px, xl = 1200px

    // Tách cột chính và phụ
    const mainColumns = columns.filter((col) => ['level', 'curriculum', 'equivalent'].includes(col.dataIndex));

    const extraColumns = columns.filter((col) => ['duration', 'objective'].includes(col.dataIndex));

    // Cột cuối cùng là nút mở Popover
    const actionColumn = {
        title: '',
        key: 'more',
        align: 'center',
        render: (_, record) => {
            const content = (
                <div className={cx('popover-content')}>
                    {extraColumns.map((col) => (
                        <p key={col.key || col.dataIndex}>
                            <strong>{col.title}:</strong>{' '}
                            {col.render ? col.render(record[col.dataIndex], record) : record[col.dataIndex]}
                        </p>
                    ))}
                </div>
            );

            return (
                <Popover content={content} title="Thông tin chi tiết" trigger="click">
                    <Button shape="circle" icon={<MoreOutlined />} />
                </Popover>
            );
        },
    };

    const finalColumns = isMobile ? [...mainColumns, actionColumn] : columns;

    return (
        <div className={cx('table-wrapper')}>
            {title && (
                <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                    {title}
                </Title>
            )}
            <Table
                columns={finalColumns}
                dataSource={data}
                pagination={false}
                bordered
                rowClassName={(record, index) => cx(index % 2 === 0 ? 'even-row' : 'odd-row')}
                scroll={isMobile ? undefined : { x: '100%' }}
            />
        </div>
    );
};

export default CustomTable;
