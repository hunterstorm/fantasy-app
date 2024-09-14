export default function formatParams(path) {
    const words = path.replace(/[-_]/g, ' ').split(' ');
    return words.map(word => {
        if (word.length === 2) {
            return word.toUpperCase(); 
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}
