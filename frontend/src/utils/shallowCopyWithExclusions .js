const shallowCopyWithExclusions  =(obj,excludedKeys)=>{
    return Object.keys(obj).reduce((acc, key) => {
        if (!excludedKeys.includes(key)) {
            acc.push({ name: key, value: obj[key] });
        }
        return acc;
    }, []);
}


export default shallowCopyWithExclusions;