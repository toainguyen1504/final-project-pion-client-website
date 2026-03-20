import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import { Skeleton, Popconfirm } from 'antd';

import { formatDuration } from '@/utils/formatDuration';
import { getNotesByCourse, getNotesByLesson, updateNote, deleteNote } from '@/services/noteService';
import Button from '@/components/Button';

import styles from './NoteModal.module.scss';

const cx = classNames.bind(styles);

export default function NoteModal({ open, onClose, lessonId, courseId }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState('desc');
    const [editingId, setEditingId] = useState(null);
    const [editingContent, setEditingContent] = useState('');
    const [scope, setScope] = useState('lesson'); // 'lesson' | 'course'
    const cacheRef = useRef({});
    const getKey = () => `${scope}-${lessonId}-${courseId}-${order}`;

    // Get note list
    const fetchNotes = async () => {
        if (scope === 'lesson' && !lessonId) return;
        if (scope === 'course' && !courseId) return;

        const key = getKey();

        // nếu có cache -> dùng luôn
        if (cacheRef.current[key]) {
            setNotes(cacheRef.current[key]);
            return;
        }

        try {
            setLoading(true);

            let res;

            if (scope === 'lesson') {
                res = await getNotesByLesson(lessonId, order);
            } else {
                res = await getNotesByCourse(courseId, order);
            }

            const data = res.data || [];

            console.log('Note data: ', data);
            cacheRef.current[key] = data; // save cache

            setNotes(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // auto fetch nếu mở modal
    useEffect(() => {
        if (!open) return;

        fetchNotes();
    }, [lessonId, courseId, order, scope, open]);

    // modal auto refresh
    useEffect(() => {
        const handler = async () => {
            // clear cache
            cacheRef.current = {};

            try {
                setLoading(true);

                let res;

                if (scope === 'lesson') {
                    res = await getNotesByLesson(lessonId, order);
                } else {
                    res = await getNotesByCourse(courseId, order);
                }

                const data = res.data || [];

                const key = `${scope}-${lessonId}-${courseId}-${order}`;
                cacheRef.current[key] = data;

                setNotes(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        window.addEventListener('note-created', handler);

        return () => {
            window.removeEventListener('note-created', handler);
        };
    }, []);

    // EDIT
    const handleEdit = (note) => {
        setEditingId(note.id);
        setEditingContent(note.content);
    };

    // SAVE
    const handleSaveEdit = async () => {
        try {
            // await updateNote(editingId, { content: editingContent });
            // fetchNotes();
            const updated = await updateNote(editingId, {
                content: editingContent,
            });

            setNotes((prev) => prev.map((n) => (n.id === editingId ? { ...n, content: updated.content } : n))); // update UI ngay
            setEditingId(null);
            cacheRef.current = {}; // clear cache
        } catch (err) {
            console.error(err);
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        try {
            await deleteNote(id);
            // fetchNotes();
            setNotes((prev) => prev.filter((n) => n.id !== id)); // update UI ngay
            cacheRef.current = {}; // clear cache
        } catch (err) {
            console.error(err);
        }
    };

    if (!open) return null;

    return (
        <div className={cx('overlay')} onClick={onClose}>
            <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
                {/* HEADER */}
                <div className={cx('header')}>
                    <h2>Ghi chú của tôi</h2>

                    <div className={cx('actions')}>
                        <select value={scope} onChange={(e) => setScope(e.target.value)}>
                            <option value="lesson">Trong bài học hiện tại</option>
                            <option value="course">Trong tất cả bài học</option>
                        </select>

                        <select value={order} onChange={(e) => setOrder(e.target.value)}>
                            <option value="desc">Mới nhất</option>
                            <option value="asc">Cũ nhất</option>
                        </select>

                        <button onClick={onClose}>✕</button>
                    </div>
                </div>

                {/* LIST */}
                <div className={cx('list')}>
                    {loading ? (
                        <Skeleton active paragraph={{ rows: 3 }} />
                    ) : notes?.length === 0 ? (
                        <div className={cx('empty')}>Bạn chưa có ghi chú nào</div>
                    ) : (
                        notes?.map((note) => (
                            <div key={note.id} className={cx('note-item')}>
                                {/* HEADER */}
                                <div className={cx('note-header')}>
                                    <div className={cx('note-info')}>
                                        <span className={cx('time')}>{formatDuration(note.timestamp)}</span>

                                        {/* TITLE ( link to lesson at time) */}
                                        <span
                                            className={cx('title')}
                                            onClick={() => {
                                                window.dispatchEvent(
                                                    new CustomEvent('navigate-to-note', {
                                                        detail: {
                                                            lessonId: note.lesson_id,
                                                            time: note.timestamp,
                                                        },
                                                    }),
                                                );

                                                onClose();
                                            }}
                                        >
                                            {note.lesson_title || '----'}
                                        </span>
                                    </div>

                                    <div className={cx('tools')}>
                                        <RiEdit2Fill onClick={() => handleEdit(note)} />
                                        <Popconfirm
                                            title="Xóa ghi chú này?"
                                            description="Hành động này không thể hoàn tác"
                                            okText="Xóa"
                                            cancelText="Hủy"
                                            okType="danger"
                                            okButtonProps={{ danger: true }}
                                            placement="left"
                                            onConfirm={() => handleDelete(note.id)}
                                        >
                                            <MdDelete />
                                        </Popconfirm>
                                    </div>
                                </div>

                                {/* CONTENT */}
                                {editingId === note.id ? (
                                    <div className={cx('edit-box')}>
                                        <textarea
                                            value={editingContent}
                                            onChange={(e) => setEditingContent(e.target.value)}
                                        />

                                        <div className={cx('edit-actions')}>
                                            <Button
                                                rounded
                                                small
                                                className={cx('cancel-btn')}
                                                onClick={() => setEditingId(null)}
                                            >
                                                HỦY BỎ
                                            </Button>

                                            <Button
                                                rounded
                                                small
                                                primary
                                                className={cx('save-btn')}
                                                onClick={handleSaveEdit}
                                            >
                                                LƯU LẠI
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('content-box')}>{note.content}</div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
