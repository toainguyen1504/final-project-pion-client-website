import React from 'react';
import { Table, Typography, Popover, Button, Grid } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import styles from '@/components/CustomTable/CustomTable.module.scss';

const cx = classNames.bind(styles);
const { Title } = Typography;
const { useBreakpoint } = Grid;

const ChinaCSCATable = ({ slug }) => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    if (slug !== 'csca-tai-pion') return null;

    // Raw data grouped by subject
    const rawData = [
        {
            subject: 'Tiếng Trung Văn học',
            totalHours: '144h',
            courses: [
                {
                    key: '1',
                    courseType: 'Cấp tốc',
                    sessionsPerWeek: '5',
                    hoursPerSession: '3',
                    totalWeeks: '10',
                },
                {
                    key: '2',
                    courseType: 'Bán cấp tốc',
                    sessionsPerWeek: '3',
                    hoursPerSession: '1.5',
                    totalWeeks: '32',
                },
            ],
        },
        {
            subject: 'Tiếng Trung Thương mại',
            totalHours: '128h',
            courses: [
                {
                    key: '3',
                    courseType: 'Cấp tốc',
                    sessionsPerWeek: '5',
                    hoursPerSession: '3',
                    totalWeeks: '9',
                },
                {
                    key: '4',
                    courseType: 'Bán cấp tốc',
                    sessionsPerWeek: '3',
                    hoursPerSession: '1.5',
                    totalWeeks: '28',
                },
            ],
        },
        {
            subject: 'Tiếng trung Khoa học Kỹ thuật',
            totalHours: '144h',
            courses: [
                {
                    key: '5',
                    courseType: 'Cấp tốc',
                    sessionsPerWeek: '5',
                    hoursPerSession: '3',
                    totalWeeks: '10',
                },
                {
                    key: '6',
                    courseType: 'Bán cấp tốc',
                    sessionsPerWeek: '3',
                    hoursPerSession: '1.5',
                    totalWeeks: '32',
                },
            ],
        },
        {
            subject: 'Tiếng Trung Y học',
            totalHours: '144h',
            courses: [
                {
                    key: '7',
                    courseType: 'Cấp tốc',
                    sessionsPerWeek: '5',
                    hoursPerSession: '3',
                    totalWeeks: '10',
                },
                {
                    key: '8',
                    courseType: 'Bán cấp tốc',
                    sessionsPerWeek: '3',
                    hoursPerSession: '1.5',
                    totalWeeks: '32',
                },
            ],
        },
        {
            subject: 'Toán',
            totalHours: '144h',
            courses: [
                {
                    key: '9',
                    courseType: 'Cấp tốc',
                    sessionsPerWeek: '5',
                    hoursPerSession: '3',
                    totalWeeks: '10',
                },
                {
                    key: '10',
                    courseType: 'Bán cấp tốc',
                    sessionsPerWeek: '3',
                    hoursPerSession: '1.5',
                    totalWeeks: '32',
                },
            ],
        },
        {
            subject: 'Vật lý',
            totalHours: '144h',
            courses: [
                {
                    key: '11',
                    courseType: 'Cấp tốc',
                    sessionsPerWeek: '5',
                    hoursPerSession: '3',
                    totalWeeks: '10',
                },
                {
                    key: '12',
                    courseType: 'Bán cấp tốc',
                    sessionsPerWeek: '3',
                    hoursPerSession: '1.5',
                    totalWeeks: '32',
                },
            ],
        },
        {
            subject: 'Hóa học',
            totalHours: '144h',
            courses: [
                {
                    key: '13',
                    courseType: 'Cấp tốc',
                    sessionsPerWeek: '5',
                    hoursPerSession: '3',
                    totalWeeks: '10',
                },
                {
                    key: '14',
                    courseType: 'Bán cấp tốc',
                    sessionsPerWeek: '3',
                    hoursPerSession: '1.5',
                    totalWeeks: '32',
                },
            ],
        },
    ];

    // Flattened data for Table
    const data = rawData.flatMap((group) =>
        group.courses.map((course, index) => ({
            key: course.key,
            subject: group.subject,
            totalHours: group.totalHours,
            courseType: course.courseType,
            sessionsPerWeek: course.sessionsPerWeek,
            hoursPerSession: course.hoursPerSession,
            totalWeeks: course.totalWeeks,
            rowSpan: index === 0 ? group.courses.length : 0,
        })),
    );

    const columns = [
        {
            title: 'Môn học',
            dataIndex: 'subject',
            key: 'subject',
            align: 'center',
            onCell: (_, index) => ({
                rowSpan: data[index].rowSpan,
            }),
        },
        {
            title: 'Tổng thời gian học',
            dataIndex: 'totalHours',
            key: 'totalHours',
            align: 'center',
            onCell: (_, index) => ({
                rowSpan: data[index].rowSpan,
            }),
        },
        {
            title: <>&nbsp;&nbsp;&nbsp;Khóa&nbsp;học&nbsp;&nbsp;&nbsp;</>,
            dataIndex: 'courseType',
            key: 'courseType',
            align: 'center',
        },
        {
            title: 'Số buổi/tuần',
            dataIndex: 'sessionsPerWeek',
            key: 'sessionsPerWeek',
            align: 'center',
        },
        {
            title: 'Số giờ/buổi',
            dataIndex: 'hoursPerSession',
            key: 'hoursPerSession',
            align: 'center',
        },
        {
            title: 'Tổng thời gian (tuần)',
            dataIndex: 'totalWeeks',
            key: 'totalWeeks',
            align: 'center',
        },
    ];

    const mainColumns = columns.filter((col) => ['subject', 'totalHours'].includes(col.dataIndex));

    const extraColumns = columns.filter((col) =>
        ['courseType', 'sessionsPerWeek', 'hoursPerSession', 'totalWeeks'].includes(col.dataIndex),
    );

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
            <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                Lộ trình luyện thi CSCA tại&nbsp;Pion
            </Title>
            <Table
                columns={finalColumns}
                dataSource={data}
                pagination={false}
                bordered
                rowClassName={(_, index) => cx(Math.floor(index / 2) % 2 === 0 ? 'even-row' : 'odd-row')}
                scroll={isMobile ? undefined : { x: '100%' }}
            />
        </div>
    );
};

export default ChinaCSCATable;
