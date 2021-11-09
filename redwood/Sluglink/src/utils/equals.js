export const shallowEquals = (obj1, obj2) => {
    for(const key in obj1) {
        if(obj1[key] != obj2[key]) {
            return false;
        }
    }
    return true;
};

export const propertiesAreEqual = (obj1, obj2, properties) => {
    for(const property of properties) {
        if(obj1[property] != obj2[property]) {
            return false;
        }
    }
    return true;
};