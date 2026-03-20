import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { RiEdit2Fill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';

import { formatDuration } from '@/utils/formatDuration';
import { getNotesByLesson, updateNote, deleteNote } from '@/services/noteService';
import Button from '@/components/Button';

import styles from './NoteModal.module.scss';

const cx = classNames.bind(styles);

export default function NoteModal({ open, onClose, lessonId }) {
    const [notes, setNotes] = useState([]);
    const [order, setOrder] = useState('desc');
    const [editingId, setEditingId] = useState(null);
    const [editingContent, setEditingContent] = useState('');

    const fetchNotes = async () => {
        if (!lessonId) return;

        try {
            const res = await getNotesByLesson(lessonId, order);
            setNotes(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (open) fetchNotes();
    }, [open, lessonId, order]);

    const handleEdit = (note) => {
        setEditingId(note.id);
        setEditingContent(note.content);
    };

    const handleSaveEdit = async () => {
        try {
            await updateNote(editingId, { content: editingContent });
            setEditingId(null);
            fetchNotes();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteNote(id);
            fetchNotes();
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
                        <select value={order} onChange={(e) => setOrder(e.target.value)}>
                            <option value="desc">Mới nhất</option>
                            <option value="asc">Cũ nhất</option>
                        </select>

                        <button onClick={onClose}>✕</button>
                    </div>
                </div>

                {/* LIST */}
                <div className={cx('list')}>
                    {notes?.length === 0 && <div className={cx('empty')}>Bạn chưa có ghi chú nào</div>}

                    {notes?.map((note) => (
                        <div key={note.id} className={cx('note-item')}>
                            {/* HEADER */}
                            <div className={cx('note-header')}>
                                <div className={cx('note-info')}>
                                    <span
                                        className={cx('time')}
                                        onClick={() => {
                                            window.dispatchEvent(
                                                new CustomEvent('seek-to-time', {
                                                    detail: { time: note.timestamp },
                                                }),
                                            );
                                            onClose();
                                        }}
                                    >
                                        {formatDuration(note.timestamp)}
                                    </span>

                                    {/* TITLE (fake link UI) */}
                                    <span className={cx('title')}>{note.lesson_title || 'Bài học'}</span>
                                </div>

                                <div className={cx('tools')}>
                                    <RiEdit2Fill onClick={() => handleEdit(note)} />
                                    <MdDelete onClick={() => handleDelete(note.id)} />
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
                    ))}
                </div>
            </div>
        </div>
    );
}
