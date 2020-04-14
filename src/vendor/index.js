function createElement(tag, attr = {}, children = []) {

  const { className, style, textContent, id, onclick } = attr;

  return {
    tag: tag,
    style: style,
    props: {
      children: children,
    },
    className: className,
    id: id,
    onclick: onclick,
    textContent: textContent,
    dom: null,
  };
  }
  
  function render(elem, parentDOMNode) {
  
    const { tag, props, className, style, textContent, id, onclick } = elem;
    const domNode = document.createElement(tag);
     
    elem.dom = domNode;
  
    if (Array.isArray(props.children)) {
      props.children.forEach((child) => {
        mount(child, domNode);
      });
    }
  
    if (typeof elem === 'string') {
      parentDOMNode.appendChild(domNode);
    }
  
    if (typeof props.children === 'string') {
      mount(props.children, domNode);
    }

    if (onclick !== undefined) {
      domNode.onclick = onclick;
    }

    if (className !== undefined) {
      domNode.className = className;
    }

    if (id !== undefined) {
      domNode.id = id;
    }
  
    if (textContent !== undefined) {
      domNode.textContent = textContent;
    }
  
    if (style !== undefined) {
      Object.keys(style).forEach(
        (styleKey) => (domNode.style[styleKey] = style[styleKey]),
      );
    }
    parentDOMNode.appendChild(domNode);
  
    function mount(input, parentDOMNode) {
      if (typeof input === 'string' || typeof input === 'number') {
        mountText(input, parentDOMNode);
      } else {
        render(input, parentDOMNode);
      }
    }
    
    function mountText(text, parentDOMNode) {
      const textNode = document.createTextNode(text);
      parentDOMNode.appendChild(textNode);
    }
  
    return domNode;
  }

export const React = {
    createElement,
    render,
};