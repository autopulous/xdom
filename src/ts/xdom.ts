module xdom {
    export const namespaceSeparator:string = ':';

    export enum nodeTypes {
        UNDEFINED = 0,
        ELEMENT = 1,
        ATTRIBUTE = 2,
        TEXT = 3,
        CDATA_SECTION = 4,
        ENTITY_REFERENCE = 5,
        ENTITY = 6,
        PROCESSING_INSTRUCTION = 7,
        COMMENT = 8,
        DOCUMENT = 9,
        DOCUMENT_TYPE = 10,
        DOCUMENT_FRAGMENT = 11,
        NOTATION = 12
    }

    export const nodeTypeKeys:string[] = Object.keys(nodeTypes);

    export const nodeTypeNames:string[] = [
        undefined,
        "Element",
        "Attribute",
        "Text",
        "CDATA Section",
        "Entity Reference",
        "Entity",
        "Processing Instruction",
        "Comment",
        "Document",
        "Document Type",
        "Document Fragment",
        "Notation"
    ];

    export function isNodeType(nodeType:number):boolean {
        return null === nodeType || undefined === nodeType ? false : undefined !== nodeTypeKeys[nodeType];
    }

    export function isNodeTypeKey(nodeTypeKey:any):boolean {
        return null === nodeTypeKey || undefined === nodeTypeKey ? false : undefined !== nodeTypes[nodeTypeKey];
    }

    export function nodeType(nodeTypeKey:any):string {
        return null === nodeTypeKey || undefined === nodeTypeKey ? undefined : nodeTypes[nodeTypeKey];
    }

    export function nodeTypeKey(nodeType:number):string {
        return null === nodeType || undefined === nodeType ? undefined : nodeTypeKeys[nodeType];
    }

    export function nodeTypeName(nodeType:number):string {
        return null === nodeType || undefined === nodeType ? undefined : nodeTypeNames[nodeType];
    }
}