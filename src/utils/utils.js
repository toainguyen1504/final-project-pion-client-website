// Hàm lấy chữ cái đầu tiên của từ cuối cùng trong tên
export function getInitial(name = '') {
    const parts = name.trim().split(' ');
    const lastWord = parts[parts.length - 1];
    return lastWord.charAt(0).toUpperCase();
}
