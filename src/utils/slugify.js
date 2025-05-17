/* eslint-disable no-dupe-keys */
export default function slugify(text) {
    const vietnameseChars = {
        đ: 'd',
        Đ: 'd',
        ơ: 'o',
        Ơ: 'o',
        ụ: 'u',
        Ủ: 'u',
        ồ: 'o',
        ố: 'o',
        ỗ: 'o',
        ộ: 'o',
        ù: 'u',
        ú: 'u',
        ư: 'u',
        ứ: 'u',
        ừ: 'u',
        ỹ: 'y',
        ỳ: 'y',
        à: 'a',
        á: 'a',
        ã: 'a',
        ả: 'a',
        ạ: 'a',
        è: 'e',
        é: 'e',
        ẽ: 'e',
        ẻ: 'e',
        ẹ: 'e',
        ì: 'i',
        í: 'i',
        ĩ: 'i',
        ỉ: 'i',
        ị: 'i',
        ò: 'o',
        ó: 'o',
        õ: 'o',
        ỏ: 'o',
        ọ: 'o',
        ù: 'u',
        ú: 'u',
        ũ: 'u',
        ủ: 'u',
        ụ: 'u',
        ỳ: 'y',
        ý: 'y',
        ỹ: 'y',
        ỵ: 'y',
    };

    // replace
    text = text
        .split('')
        .map((char) => vietnameseChars[char] || char)
        .join('');

    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase();
}
