export default function formatParams(path) {
  
    const words = path.replace(/-/g, ' ').split(' ');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}