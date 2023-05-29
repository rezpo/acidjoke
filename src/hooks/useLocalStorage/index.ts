const useLocalStorage = () => {
    const store = (item: string, value: any) => {
        localStorage.setItem(item, JSON.stringify(value));
        return value;
    };

    const load = (item: string) => {
        const value = localStorage.getItem(item);
        return value && JSON.parse(value);
    };

    const remove = (item: string) => {
        localStorage.removeItem(item);
        return { item, deleted: true };
    };

    const validSession = () => {
        const session = load("user");

        if (session) {
            const now = Date.now();
            const time = now - session.timeStamp;
            const timeDiff = time / (1000 * 60);
            return timeDiff < 20;
        } else {
            return false;
        }
    };

    return { store, load, remove, validSession };
};

export default useLocalStorage;
