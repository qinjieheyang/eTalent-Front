class BrowserStorage {
    public localSave(key: string, dto: object) {
        const text = JSON.stringify(dto);
        if(text.length> 5000000){
            throw new Error("BrowserStorage.localSave（），dto尺寸不能超过5M");
        }
        localStorage[key] = text;
    }
    public localGet(key: string) {
        const val = localStorage[key];
        if (val == null) {
            return null;
        }
        const obj = JSON.parse(val);
        return obj;
    }

    public localDelete(key: string) {
        localStorage.removeItem(key);
    }

    // --------------------------

    public sessionSave(key: string, dto: object) {
        const text = JSON.stringify(dto);
        if(text.length> 100000){
            throw new Error("BrowserStorage.sessionSave（），dto尺寸不能超过100K");
        }
        sessionStorage[key] = text;
    }
    public  sessionGet(key: string) {
        const val = sessionStorage[key];
        if (val == null) {
            return null;
        }
        const obj = JSON.parse(val);
        return obj;
    }

    public sessionDelete(key: string) {
        sessionStorage.removeItem(key);
    }
}

const UtilBrowserStorage = new BrowserStorage();
export { UtilBrowserStorage };



