export function debounce(func: () => void, delay: number): () => void;
export function debounce<P1>(func: (p1: P1) => void, delay: number): (p1: P1) => void;
export function debounce(func: (...args: any[]) => void, delay: number): (...args: any[]) => void {
    let timeout: number = null;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => { func.apply(null, args); }, delay);
    };
}