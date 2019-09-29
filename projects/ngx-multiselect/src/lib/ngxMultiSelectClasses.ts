export const multiSelectPrefix = 'ngx-multiselect-';

export const prefix = (items) => {
    const result = {}
    for (const i in items) {
        result[toCamelCase(items[i])] = multiSelectPrefix + items[i]
    }
    return result
};

const toCamelCase =  (str) => {
    str = str.toLowerCase().split('-');
    for (var i = 1; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join('');
};

export const multiSelectClasses = prefix([
    'container',
    'select-box',
    'selected-list',
    'selected-item',
    'arrow-up',
    'arrow-down',
    'dropdown-list',
    'select-all',
    'arrow-up',
    'arrow-down',
    'angle-up',
    'angle-down',
    'option-list',
    'option-wrapper',
    'select-wrapper',
    'checkbox-wrapper',
    'checkbox',
    'checkbox-label',
    'item-label',
    'item-icon',
    'items-count'
]);
