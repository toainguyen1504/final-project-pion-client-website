export function formatDuration(seconds, type = 'lesson') {
    if (!seconds && seconds !== 0) return '—';

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    const ss = s.toString().padStart(2, '0');

    switch (type) {
        // CARD COURSE
        // 51h40p
        case 'card': {
            const totalMinutes = Math.floor(seconds / 60);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            if (hours > 0) return `${hours}h${minutes}p`;
            return `${minutes}p`;
        }

        // DETAIL COURSE
        // 01 giờ 34 phút
        case 'detail': {
            const totalMinutes = Math.floor(seconds / 60);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            if (hours > 0) return `${hours.toString().padStart(2, '0')} giờ ${minutes} phút`;
            return `${minutes} phút`;
        }

        // LESSON VIDEO
        // 11:09:36 hoặc 05:36
        case 'lesson': {
            if (h > 0) return `${hh}:${mm}:${ss}`;
            return `${mm}:${ss}`;
        }

        default:
            return `${mm}:${ss}`;
    }
}
