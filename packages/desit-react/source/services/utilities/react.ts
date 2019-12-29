export const getElementName = (element: any) => {
    if (typeof element === 'string') {
        return element;
    }

    if (typeof element === 'object') {
        return element.type;
    }

    return (
        element.displayName ||
        element.name ||
        'Unknown'
    );
}
