export function buildQueryString(params?: any): string {
    const args: string[] = [];
    Object.keys(params || { }).forEach(key => encode(key, params[key]));

    var result =  args.join('&');
    return !result ? '' : '?' + result;

    function encode(key: string, value: any) {
        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; ++i) {
                encode(key, value[i]);
            }
        } else if (value != null) {
            const uriKey = encodeURIComponent(key);
            const uriValue = encodeURIComponent(value);
            args.push(uriKey + ((value !== "") ? '=' + uriValue : ''));
        }
    }
}
