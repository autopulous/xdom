// typings install jasmine --ambient

///<reference path="../typings/main/ambient/jasmine/jasmine.d.ts" />
///<reference path="xdom.ts"/>

import nodeTypeKeys = xdom.nodeTypeKeys;
import nodeTypes = xdom.nodeTypes;
import nodeTypeNames = xdom.nodeTypeNames;

import nodeTypeKey = xdom.nodeTypeKey;
import isNodeTypeKey = xdom.isNodeTypeKey;
import nodeTypeName = xdom.nodeTypeName;
import nodeType = xdom.nodeType;

describe('autopulous-xdom unit test suite', () => {
    beforeAll(() => {
        console.log('nodeTypes:' + JSON.stringify(nodeTypes));
        console.log('nodeTypeKeys:' + nodeTypeKeys);
        console.log('nodeTypeNames:' + nodeTypeNames);
    });

    it('should have properly sized constant arrays', () => {
        expect(nodeTypeKeys.length).toEqual(26);
        expect(nodeTypeNames.length).toEqual(13);
    });

    it('should have monotonically ascending numeric member values', () => {
        expect(nodeTypes.UNDEFINED).toEqual(0);

        for (var index:number = nodeTypes.ELEMENT; nodeTypes.NOTATION >= index; index++) {
            expect(+nodeTypeKeys[index]).toEqual(index);
        }
    });

    it('should have monotonically ascending member values addressed by key names', () => {
        expect(nodeTypes[nodeTypeKeys[nodeTypes.NOTATION + 1]]).toEqual(0);

        for (var index:number = nodeTypes.ELEMENT; nodeTypes.NOTATION >= index; index++) {
            expect(nodeTypes[nodeTypeKeys[index + nodeTypes.NOTATION + 1]]).toEqual(index);
        }
    });

    it('should pass numeric nodeKey verification', () => {
        expect(false).toEqual(isNodeTypeKey('13'));

        for (var index:number = nodeTypes.ELEMENT; nodeTypes.NOTATION >= index; index++) {
            expect(true).toEqual(isNodeTypeKey(nodeTypeKeys[index]));
        }
    });

    it('should pass string nodeKey verification', () => {
        expect(false).toEqual(isNodeTypeKey('BOGUS'));

        for (var index:number = nodeTypes.ELEMENT; nodeTypes.NOTATION >= index; index++) {
            expect(true).toEqual(isNodeTypeKey(nodeTypeKeys[index + nodeTypes.NOTATION]));
        }
    });

    it('should be able to retrieve nodeTypeKey by index', () => {
        for (var index:number = nodeTypes.ELEMENT; nodeTypes.NOTATION >= index; index++) {
            expect(index).toEqual(+nodeTypeKey(index));
        }
    });

    it('should be able to retrieve a nodeType using a nodeType (reflexive)', () => {
        for (var index:number = nodeTypes.ELEMENT; nodeTypes.NOTATION >= index; index++) {
            expect(nodeTypeKeys[index + nodeTypes.NOTATION + 1]).toEqual(nodeType(nodeTypeKey(index)));
        }
    });

    it('should be able to retrieve a the text description of a nodeType', () => {
        expect(undefined).toEqual(nodeTypeName(nodeTypes.UNDEFINED));
        expect("Element").toEqual(nodeTypeName(nodeTypes.ELEMENT));
        expect("Notation").toEqual(nodeTypeName(nodeTypes.NOTATION));
        expect(undefined).toEqual(nodeTypeName(nodeTypes.NOTATION + 1));
    });
});
