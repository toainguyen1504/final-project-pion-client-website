import axios from 'axios';
import { BASE_URL, MEDIA_BASE_URL } from '@/constants';
import { slugify } from '@/utils';

// sinh TOC từ rawHtml
export async function processContentAndGenerateToc(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // handle img
    const imgTags = doc.querySelectorAll('img');
    if (imgTags.length > 0) {
        const mediaRes = await axios.get(`${BASE_URL}/media`);
        const mediaList = mediaRes.data.data || mediaRes.data;

        const mediaMap = {};
        mediaList.forEach((media) => {
            const filename = media.meta?.filename;
            if (filename) mediaMap[filename] = media;
        });

        imgTags.forEach((img) => {
            const src = img.getAttribute('src');
            const filename = src?.split('/').pop();
            const matchedMedia = mediaMap[filename];
            const mediumPath = matchedMedia?.meta?.variants?.medium?.path;

            if (!matchedMedia) {
                // console.warn('Không tìm thấy media cho ảnh:', filename);
                return;
            }

            if (mediumPath) {
                const fullUrl = `${MEDIA_BASE_URL}/${mediumPath}`;
                img.setAttribute('src', fullUrl);
            }
        });
    }

    // assign id and create tocData
    const headings = Array.from(doc.querySelectorAll('h2, h3'));
    const toc = [];

    let currentH2 = null;
    let sectionCount = 1;
    let subsectionCount = 1;

    headings.forEach((el) => {
        const text = el.textContent.trim();
        const id = slugify(text, {
            lower: true,
            locale: 'vi',
            remove: /[*+~.()'"!:@]/g,
        });

        el.setAttribute('id', id);

        if (el.tagName === 'H2') {
            currentH2 = {
                text: `${sectionCount}. ${text}`,
                href: `#${id}`,
                children: [],
            };
            toc.push(currentH2);
            sectionCount++;
            subsectionCount = 1;
        } else if (el.tagName === 'H3' && currentH2) {
            currentH2.children.push({
                text: `${sectionCount - 1}.${subsectionCount}. ${text}`,
                href: `#${id}`,
            });
            subsectionCount++;
        }
    });

    return {
        processedHtml: doc.body.innerHTML,
        tocData: toc,
    };
}
