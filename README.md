# XML DOM Constants, JavaScript component

## Description
`autopulous-xdom` is a JavaScript module that provides constants to work with `XMLHttpRequest.responseXML` Extensible Markup Language (XML) Document Object Model (DOM) nodes (aka XML DOM nodes).

## License
The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## API
`namespaceSeparator`

* the character used to separated the namespace qualifier of an XML node name

`nodeTypes`

* an enum that contains the numerical value of the XDOM node types (e.g. element nodes have a nodeType of 1, text nodes have a node type of 3)

`nodeTypeKeys`

* a convenience array of the `nodeTypes` keys (numeric keys as string precede the textual 'descriptive' keys)
 
`nodeTypeNames`

* an array of text strings that correspond to the numeric key values of the `nodeTypes` enum - intended for pretty printing of node type names (as opposed to just using the textual 'descriptive' keys)

`XDom.isNodeType()`

* validates that the number passed corresponds to a nodeType

`XDom.isNodeTypeKey()`

* validates that the passed string is either a numerical or 'descriptive' textual nodeTypes key value

`XDom.nodeType()`

* safely access a nodeType by its nodeTypeKey

`XDom.nodeTypeKey()`

* safely access a nodeTypeKey by index

`XDom.nodeTypeName()`

* safely access a nodeTypeName by index

### Usage

Import one or more `xdom` members, as follows:

```
import {XDom, nodeTypes, nodeTypeNames, nodeTypeKeys, namespaceSeparator} from './xdom';
```

Use the module member, as follows:

```
function processtNode(node:Node) {
   var nodeType:number = node.nodeType;

   if (nodeTypes.ELEMENT === nodeType) {
      ...
   }
}
```

_The unit tests (which are part of the https://github.com/autopulous/xdom.git GitHub repository) provide usage examples of `autopulous-xdom`._

## Getting Started
1. Create or open your `package.json` project file
2. Add an `autopulous-xdom` entry to the dependencies list:
```
"dependencies": {"autopulous-xdom": "latest"}
```
3. Use `npm` to install the component in the node module library home:
```
npm install
```
## References

* [XML DOM Reference](https://msdn.microsoft.com/en-us/library/ms764730) (Microsoft)
* [XML DOM enumerated constants](https://msdn.microsoft.com/en-us/library/ms766473) (Microsoft)
* [XML DOM - The Element Object](http://www.w3schools.com/xml/dom_element.asp) (W3 Schools)