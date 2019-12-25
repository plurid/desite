export const getElementName = (element: any) => {
    if (typeof element === 'object') {
        return element.type;
    }

    return (
        element.displayName ||
        element.name ||
        'Unknown'
    );
}
