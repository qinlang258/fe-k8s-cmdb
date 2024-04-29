// localStorage.js
const t = import.meta.env.VITE_APP_WEB_TITLE || 'token'
const v = import.meta.env.VITE_APP_WEB_VERSION || '1.0.0'
export default {
    //********普通数据持久化*********
    // 存储数据
    set(key, value) {
        if (typeof value === 'object') {
            // 如果值是对象或数组，先将其转换为 JSON 字符串再存储
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },

    // 获取数据
    get(key) {
        const value = localStorage.getItem(key,);
        try {
            // 尝试解析 JSON 字符串
            return JSON.parse(value);
        } catch (error) {
            // 如果解析失败，则返回原始值
            return value;
        }
    },

    // 删除指定的数据
    remove(key) {
        localStorage.removeItem(key,);
    },

    // 清空所有 ${t}-${v}- 前缀的数据
    clear() {
        const keysToRemove = [];

        for (let i = 0; i < localStorage.length; i++) {
            const storageKey = localStorage.key(i);
            if (regex.test(storageKey)) {
                keysToRemove.push(storageKey);
            }
        }

        keysToRemove.forEach((key) => {
            localStorage.removeItem(key);
        });
    },

    //************系统数据持久化**************
    // 存储数据
    sysSet(value) {
        let storedData = localStorage.getItem(`sys`);

        if (storedData) {
            // 如果本地存储中已有数据，则解析为对象或数组
            storedData = JSON.parse(storedData);

            if (Array.isArray(storedData)) {
                // 如果是数组，则将新值添加到数组末尾
                storedData.push(value);
            } else if (typeof storedData === 'object') {
                // 如果是对象，则将新值合并到对象中
                storedData = {...storedData, ...value};
            }
        } else {
            // 如果本地存储中没有数据，则初始化为新值
            storedData = value;
        }

        // 将存储数据转换为 JSON 字符串并存储到本地
        localStorage.setItem(`sys`, JSON.stringify(storedData));
    },

    // 获取数据
    sysGet() {
        const value = localStorage.getItem(`sys`);
        try {
            // 尝试解析 JSON 字符串
            return JSON.parse(value);
        } catch (error) {
            // 如果解析失败，则返回原始值
            return value;
        }
    },

    // 删除数据
    sysRemove() {
        localStorage.removeItem(`sys`);
    },

};