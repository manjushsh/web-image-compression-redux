const CacheService = {
    get: (key: string, defaultValue: any = null) => {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            return JSON.parse(storedValue);
        }
        if (defaultValue !== null) {
            CacheService.set(key, defaultValue);
            return defaultValue;
        }
        return null;
    },
    set: (key: string, value: string) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    containsKey: (key: string) => {
        return localStorage.getItem(key) !== null;
    }
};

export default CacheService;