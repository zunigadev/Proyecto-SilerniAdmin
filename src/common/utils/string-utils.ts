// src/utils/string-utils.ts
export function toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/gi, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
    );
}
