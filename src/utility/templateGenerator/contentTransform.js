// Transform the data from template item content
// parse to DOM then create a content object

export function transformTemplateData(templateData) {
    let formattedContents = [];

    templateData.forEach(templateContent => {
        const nodes = new DOMParser().parseFromString(templateContent.content, 'text/html').body.childNodes;
        formattedContents.push(generateContentObj(nodes));
    });

    let flat = formattedContents.flat(Infinity);
    let documentData = flat.filter(items =>{
      return items != undefined
    });
    
    return documentData;
}

const generateContentObj = (nodeList) => {
    const parentObj = Array.from(nodeList).flatMap((element) => {
      if (element.nodeName === 'P') {
        return {
          type: element.nodeName,
          children: getChildNodes(element.childNodes)
        };
      }
      if (element.nodeName === 'UL') {
        return {
          type: element.nodeName,
          children: getChildListNodes(element.childNodes)
        };
      }
      if (element.nodeName === 'DIV') {
        return {
          type: element.nodeName,
          children: getElementNodes(element),
        };
      }         
    });

    console.log(nodeList);
    console.log('Parent Items', parentObj);
    return parentObj
      
};

const getChildNodes = (children) => {
   
    let childObject = Array.from(children).flatMap((element) => {
      return {
          text: element.innerText || element.nodeValue,
          format: element.nodeName,
          attributes: getChildAttributes(element.attributes),
        };
    });

    let updateChildObject = childObject.map((child) =>{
      let styles = {};
      styles.color = getColor(child.attributes);
      styles.size = getSize(child.attributes);
      styles.bold = checkFormat(child.format);
      return {
        ...child,
        styles: styles
      }
    })

    return updateChildObject
};

const getChildListNodes = (children) => {
   let listItems = Array.from(children);
   let listItemChildren = listItems.find(listItem => listItem).childNodes;

   let childObject = Array.from(listItemChildren).flatMap((element) => {
     return {
         text: element.innerText || element.nodeValue,
         format: element.nodeName,
         attributes: getChildAttributes(element.attributes),
       };
   });

   let updateChildObject = childObject.map((child) =>{
     let styles = {};
     styles.color = getColor(child.attributes);
     styles.size = getSize(child.attributes);
     styles.bold = checkFormat(child.format);
     return {
       ...child,
       styles: styles
     }
   })

   return updateChildObject
};

const getElementNodes = (element) => {
    let elementCollection = [];
    let child = {
      text: element.innerText || element.nodeValue,
      format: element.nodeName,
      attributes: getChildAttributes(element.attributes)
    };

    elementCollection.push(child);

    let updateChild = elementCollection.map((childItem) =>{
      let styles = {};
      styles.color = getColor(childItem.attributes);
      styles.size = getSize(childItem.attributes);
      styles.bold = checkFormat(childItem.format)
      return {
        ...child,
        styles: styles
      }
    })
    return updateChild;
};

const getChildAttributes = (attributes) => {
    let attrContents = attributes != undefined ? Object.keys(attributes) : [];
    if (attrContents.length === 0) {
      return [];
    } else {
      let attrs = {};
      let attrsCollection = Array.from(attributes);
      let attrClass = attrsCollection.find(attr => attr.nodeName === 'class');
      let attrId = attrsCollection.find(attr => attr.nodeName === 'id');
      let attrDataSection = attrsCollection.find(attr => attr.nodeName === 'data-section');
      let attrDataControl = attrsCollection.find(attr => attr.nodeName === 'data-control');

      attrs.class = attrClass ? attrClass['nodeValue'] : null;
      attrs.id = attrId ? attrId['nodeValue'] : null;
      attrs.dataSection = attrDataSection ? attrDataSection['nodeValue'] : null;
      attrs.dataControl = attrDataControl ? attrDataControl['nodeValue'] : null;

      // console.log('attrsCollection',attrsCollection);
      // console.log('attrsCollection', {attrClass});
      // console.log('attrs',attrs);

      return attrs
      
    }
    
};

const getColor = (attrs) => {
    if (attrs.length === 0 || Object.keys(attrs).length === 0 && attrs.constructor === Object) {
      return '000000'
    } else {
      if( attrs.class === 'dynamic-control' ||
          attrs.class === 'dynamic-control inline' ||
          attrs.class === 'dynamic-control block' ) {
        return 'FF0000'
      } else {
        return '000000'
      }
    }
    
};

const getSize = (attrs) => {
    // let attrContents = attrs != undefined ? Object.keys(attrs): [];
    if (attrs.length === 0 || Object.keys(attrs).length === 0 && attrs.constructor === Object) {
        return 24
    } else {
        if(attrs.class === 'ql-size-small' || attrs.class === '\\"ql-size-small\\" ql-size-small') {
        return 14
        } else {
        return 24
        }
    }
};

const checkFormat = (format) => {
    if (format === "STRONG") {
      return true;
    } else {
      return false;
    }
};
