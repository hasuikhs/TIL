export default class DragManager {
  constructor() {
    if (DragManager.instance) {
      return DragManager.instance;
    }

    this.originRef = this.origin.ref

    this.$target       = null;
    this.$parentTarget = null;

    this.selection    = null;
    this.selectedText = null;
    this.range        = null;
    this.selector     = null;

    this.prevSelectionRect = null;

    this.isDragging = false; // 현재 드래그 진행 중인지 확인 변수

    DragManager.instance = this;

    this.init();
  }

  resetSelectionData() {
    this.$target       = null;
    this.$parentTarget = null;

    this.selection    = null;
    this.selectedText = null;
    this.range        = null;
    this.selector     = null;

    this.prevSelectionRect = null;
  }

  getSelectionData() {
    if (this.selectedText === null) return {};
    return {
      text: this.selectedText,
      selector: this.selector,
      start: this.range && this.range.start,
      end: this.range && this.range.end
    };
  }

  highlightSelectedText() {
    if (this.range) {
      this.targetMemoKey = Math.floor(Math.random() * 10000) + '';
      const preSelectionRange = this.range.cloneRange();

      preSelectionRange.selectNodeContents(this.$parentTarget);
      preSelectionRange.setEnd(this.range.startContainer, this.range.startOffset);

      this.range.start = refineTextByRegex(preSelectionRange.toString()).length;
      this.range.end   = this.range.start + refineTextByRegex(this.range.toString()).length;

      addHightlightElement(this.$parentTarget, this.range.start, this.range.end, this.targetMemoKey, [ DRAG_CONFIG.MEMO_CLASSNAME ]);

      this.selection.removeAllRanges();
    }
  }

  getTextSelection() {
    if (this.isDragging) return;

    const selection = window.getSelection();
    const range     = selection.rangeCount && selection.getRangeAt(0);

    return { selection, range };
  }

  calBubblePosition(event) {
    let xAxis = event.pageX;
    let yAxis = event.pageY;

    const bubbleWidth = this.originRef.offsetWidth;
    const bubbleHeight = this.originRef.offsetHeight;

    const rect = this.range.getBoundingClientRect();
    if (event.type === 'keyup' || event.type === 'keydown') {
      if (rect.top !== this.prevSelectionRect.top) {
        yAxis = window.scrollY + rect.top;
      } else if (rect.bottom !== this.prevSelectionRect.bottom) {
        yAxis = window.scrollY + rect.bottom;
      }

      // if (event.keyCode === 37) {
      //   xAxis = Number(this.originRef.style.left.split('px')[0]) - 7;
      // } else if (event.keyCode === 39) {
      //   xAxis = Number(this.originRef.style.left.split('px')[0]) + 7;
      // }
    } else {
      if (xAxis - bubbleWidth < 0) {
        xAxis = bubbleWidth / 3;
      } else if (window.innerWidth + window.scrollX < xAxis + bubbleWidth * 2) {
        xAxis = window.innerWidth + window.screenX - bubbleWidth * 1.5;
      } else {
        xAxis = xAxis - bubbleWidth / 4;
      }
    }

    this.prevSelectionRect = rect;

    this.originRef.style.left = `${ xAxis }px`;
    this.originRef.style.top = `${ yAxis }px`;
  }

  init() {
    const selectors = [ '#FIELD_OF_THE_INVENTION', '#FIELD_OF_THE_INVENTION_2' ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);

      if (!element) return;

      element.addEventListener('mousedown', () => {
        this.isDragging = false;
      });
      element.addEventListener('mousemove', ({ buttons }) => {
        if (buttons === 1) {
          this.isDragging = true;
        }
      });
      element.addEventListener('mouseup', event => {
        this.isDragging = false;

        const { selection, range } = this.getTextSelection(event);
        const { possible, message } = isPossibleMemo(selection, range, event);

        if (!possible) {
          console.error(message);
        } else {
          this.$target = event.target;
          if (event.type !== 'mouseup') {
            this.$target = range.endContainer.parentNode;
          }
    
          this.$parentTarget = range.commonAncestorContainer;
          if (this.$parentTarget.nodeType === 3) {
            this.$parentTarget = this.$parentTarget.parentNode;
          }
    
          this.selection    = selection;
          this.selectedText = this.selection.toString();
          this.range        = this.selection.getRangeAt(0);
          this.selector     = `${ getSelectorPath(this.$parentTarget, event.currentTarget.id) }`;
    
          this.calBubblePosition(event);
        }
      });
    }
  }
}

function addHightlightElement(element, start, end, memoKey, classNames = []) {
  if (end < start) throw new Error('Incorrect memo data');

  let treeWalker = createTreeWalker(element);
  let currentNode;
  while ((currentNode = treeWalker.nextNode())) {
    const nodeText       = refineTextByRegex(currentNode.nodeValue);
    const nodeTextLength = nodeText.length;

    if (!nodeText) continue;

    if (start >= nodeTextLength) {
      start -= nodeTextLength;
      end   -= nodeTextLength;
    } else {
      const parentNode = currentNode.parentNode;

      const beforeText = nodeText.substring(0, start);
      const targetText = nodeText.substring(start, Math.min(end, nodeTextLength));
      const afterText  = nodeText.substring(Math.min(end, nodeTextLength));

      const beforeTextNode = document.createTextNode(beforeText);
      const targetTextNode = document.createElement('span');
      const afterTextNode  = document.createTextNode(afterText);

      targetTextNode.setAttribute(DRAG_CONFIG.MEMO_TEMP_KEY_ATTRIBUTE, memoKey);
      targetTextNode.textContent = targetText;
      targetTextNode.className = classNames.join(' ');

      for (const ignoreAttribute of DRAG_CONFIG.MEMO_HIGHLIGHT_IGNORE) {
        if (parentNode.hasAttribute(ignoreAttribute)) {
          targetTextNode.classList.add(DRAG_CONFIG.MEMO_STYLE_NONE_CLASSNAME);
        }
      }

      parentNode.replaceChild(afterTextNode, currentNode);
      parentNode.insertBefore(targetTextNode, afterTextNode);
      parentNode.insertBefore(beforeTextNode, targetTextNode);

      start = 0;
      end -= targetText.length + beforeText.length;

      if (end <= 0) break;

      treeWalker = createTreeWalker(element);
      treeWalker.currentNode = afterTextNode;
    }
  }
}

function refineTextByRegex(text) {
  return text.replace(DRAG_CONFIG.COMMON_REGEX, ' ');
}

function getSelectorPath(element, targetId) {
  if (!(element instanceof Element)) return;

  let path = [];
  while (element.nodeType === Node.ELEMENT_NODE) {
    let selector = element.nodeName.toLowerCase();

    if (element.id) {
      selector += `#${ element.id }`;
    } else if (element.getAttribute('num')) {
      selector += `[num="${ element.getAttribute('num') }"]`;
    } else if (element.getAttribute('key')) {
      selector += `[key="${ element.getAttribute('key') }"]`;
    }

    path.unshift(selector);

    if (element.id) break;
    element = element.parentNode;
  }

  return `#${ targetId } ${ path.join() }`;
}

function isPossibleMemo(selection, range, event) {
  const selectionText = selection.toString().trim();

  const initialConditions = [
    {
      check: !range.startContainer || !event.currentTarget.contains(range.startContainer.parentNode) || !event.currentTarget.contains(range.endContainer.parentNode),
      message: 'RANGE'
    },
    {
      check: !selectionText || selectionText.length < DRAG_CONFIG.MIN_CHARACTER_LENGTH,
      message: 'LEAST'
    },
    {
      check: selectionText.length > DRAG_CONFIG.MAX_CHARACTER_LENGTH,
      message: 'MANY'
    },
    {
      check: range.commonAncestorContainer.parentNode.classList.contains(DRAG_CONFIG.MEMO_CLASSNAME),
      message: 'OVERLAP'
    }
  ];

  for (const condition of initialConditions) {
    if (condition.check) {
      return { possible: false, message: condition.message };
    }
  }

  const nodes = getNodesWithinRange(range);
  for (const node of nodes) {
    const nodeName = node.nodeName.toUpperCase();
    const textContent = node.textContent.toUpperCase().trim();

    const nodeConditions = {
      'BUTTON': 'BUTTON',
      'IMG': 'IMAGE',
      'EM': textContent === 'IMAGE' ? 'IMAGE' : '',
      'TR': 'TABLE',
      'TD': 'TABLE',
      'TH': 'TABLE'
    };

    const nodeCondition = nodeConditions[nodeName];
    if (nodeCondition) {
      return { possible: false, message: nodeCondition };
    }

    if (node.classList.contains(DRAG_CONFIG.MEMO_CLASSNAME)) {
      return { possible: false, message: 'OVERLAP' };
    }
  }

  return { possible: true, message: '' };
}

function getNodesWithinRange(range) {
  const nodes = [];
  const treeWalker = createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_ELEMENT);

  let currentNode;
  while ((currentNode = treeWalker.nextNode())) {
    if (range.intersectsNode(currentNode)) {
      nodes.push(currentNode);
    }
  }

  return nodes;
}

function createTreeWalker(element, filter = NodeFilter.SHOW_TEXT) {
  return document.createTreeWalker(element, filter);
}
