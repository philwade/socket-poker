/* */ 
"format cjs";
(function(process) {
  (function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.preact = factory());
  }(this, function() {
    'use strict';
    function VNode(nodeName, attributes, children) {
      this.nodeName = nodeName;
      this.attributes = attributes;
      this.children = children;
    }
    var NO_RENDER = {render: false};
    var SYNC_RENDER = {renderSync: true};
    var DOM_RENDER = {build: true};
    var EMPTY = {};
    var EMPTY_BASE = '';
    var HAS_DOM = typeof document !== 'undefined';
    var TEXT_CONTENT = !HAS_DOM || 'textContent' in document ? 'textContent' : 'nodeValue';
    var ATTR_KEY = typeof Symbol !== 'undefined' ? Symbol['for']('preactattr') : '__preactattr_';
    var UNDEFINED_ELEMENT = 'undefined';
    var NON_DIMENSION_PROPS = {
      boxFlex: 1,
      boxFlexGroup: 1,
      columnCount: 1,
      fillOpacity: 1,
      flex: 1,
      flexGrow: 1,
      flexPositive: 1,
      flexShrink: 1,
      flexNegative: 1,
      fontWeight: 1,
      lineClamp: 1,
      lineHeight: 1,
      opacity: 1,
      order: 1,
      orphans: 1,
      strokeOpacity: 1,
      widows: 1,
      zIndex: 1,
      zoom: 1
    };
    function extend(obj, props) {
      for (var i in props) {
        if (hasOwnProperty.call(props, i)) {
          obj[i] = props[i];
        }
      }
      return obj;
    }
    function clone(obj) {
      var out = {};
      for (var i in obj) {
        out[i] = obj[i];
      }
      return out;
    }
    function memoize(fn, mem) {
      mem = mem || {};
      return function(k) {
        return hasOwnProperty.call(mem, k) ? mem[k] : mem[k] = fn(k);
      };
    }
    function delve(obj, key) {
      for (var p = key.split('.'),
          i = 0; i < p.length && obj; i++) {
        obj = obj[p[i]];
      }
      return obj;
    }
    function toArray(obj) {
      var arr = [],
          i = obj.length;
      while (i--)
        arr[i] = obj[i];
      return arr;
    }
    var isFunction = function isFunction(obj) {
      return 'function' === typeof obj;
    };
    var isString = function isString(obj) {
      return 'string' === typeof obj;
    };
    var hasOwnProperty = ({}).hasOwnProperty;
    var empty = function empty(x) {
      return x == null;
    };
    var falsey = function falsey(value) {
      return value === false || value == null;
    };
    function styleObjToCss(s) {
      var str = '';
      for (var prop in s) {
        var val = s[prop];
        if (!empty(val)) {
          if (str)
            str += ' ';
          str += jsToCss(prop);
          str += ': ';
          str += val;
          if (typeof val === 'number' && !NON_DIMENSION_PROPS[prop]) {
            str += 'px';
          }
          str += ';';
        }
      }
      return str;
    }
    function hashToClassName(c) {
      var str = '';
      for (var prop in c) {
        if (c[prop]) {
          if (str)
            str += ' ';
          str += prop;
        }
      }
      return str;
    }
    var jsToCss = memoize(function(s) {
      return s.replace(/([A-Z])/g, '-$1').toLowerCase();
    });
    var toLowerCase = memoize(function(s) {
      return s.toLowerCase();
    });
    var ch = undefined;
    try {
      ch = new MessageChannel();
    } catch (e) {}
    var setImmediate = ch ? function(f) {
      ch.port1.onmessage = f;
      ch.port2.postMessage('');
    } : setTimeout;
    var options = {vnode: function vnode(n) {
        var attrs = n.attributes;
        if (!attrs || isFunction(n.nodeName))
          return;
        var p = attrs.className;
        if (p) {
          attrs['class'] = p;
          delete attrs.className;
        }
        if (attrs['class'])
          normalize(attrs, 'class', hashToClassName);
        if (attrs.style)
          normalize(attrs, 'style', styleObjToCss);
      }};
    function normalize(obj, prop, fn) {
      var v = obj[prop];
      if (v && !isString(v)) {
        obj[prop] = fn(v);
      }
    }
    function optionsHook(name, a, b) {
      return hook(options, name, a, b);
    }
    function hook(obj, name, a, b, c) {
      if (obj[name])
        return obj[name](a, b, c);
    }
    function deepHook(obj, type) {
      do {
        hook(obj, type);
      } while (obj = obj._component);
    }
    var SHARED_TEMP_ARRAY = [];
    function h(nodeName, attributes) {
      var len = arguments.length,
          attributeChildren = attributes && attributes.children,
          children = undefined,
          arr = undefined,
          lastSimple = undefined;
      if (attributeChildren) {
        delete attributes.children;
        if (len < 3)
          return h(nodeName, attributes, attributeChildren);
      }
      for (var i = 2; i < len; i++) {
        var _p = arguments[i];
        if (falsey(_p))
          continue;
        if (!children)
          children = [];
        if (_p.join) {
          arr = _p;
        } else {
          arr = SHARED_TEMP_ARRAY;
          arr[0] = _p;
        }
        for (var j = 0; j < arr.length; j++) {
          var child = arr[j],
              simple = !falsey(child) && !(child instanceof VNode);
          if (simple)
            child = String(child);
          if (simple && lastSimple) {
            children[children.length - 1] += child;
          } else if (!falsey(child)) {
            children.push(child);
          }
          lastSimple = simple;
        }
      }
      var p = new VNode(nodeName, attributes || undefined, children || undefined);
      optionsHook('vnode', p);
      return p;
    }
    function createLinkedState(component, key, eventPath) {
      var path = key.split('.'),
          p0 = path[0],
          len = path.length;
      return function(e) {
        var _component$setState;
        var t = this,
            s = component.state,
            obj = s,
            v = undefined,
            i = undefined;
        if (isString(eventPath)) {
          v = delve(e, eventPath);
          if (empty(v) && (t = t._component)) {
            v = delve(t, eventPath);
          }
        } else {
          v = (t.nodeName + t.type).match(/^input(check|rad)/i) ? t.checked : t.value;
        }
        if (isFunction(v))
          v = v.call(t);
        if (len > 1) {
          for (i = 0; i < len - 1; i++) {
            obj = obj[path[i]] || (obj[path[i]] = {});
          }
          obj[path[i]] = v;
          v = s[p0];
        }
        component.setState((_component$setState = {}, _component$setState[p0] = v, _component$setState));
      };
    }
    var items = [];
    var itemsOffline = [];
    function enqueueRender(component) {
      if (items.push(component) !== 1)
        return;
      (options.debounceRendering || setImmediate)(rerender);
    }
    function rerender() {
      if (!items.length)
        return;
      var currentItems = items,
          p = undefined;
      items = itemsOffline;
      itemsOffline = currentItems;
      while (p = currentItems.pop()) {
        if (p._dirty)
          renderComponent(p);
      }
    }
    function isFunctionalComponent(_ref) {
      var nodeName = _ref.nodeName;
      return isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    function buildFunctionalComponent(vnode, context) {
      return vnode.nodeName(getNodeProps(vnode), context || EMPTY) || EMPTY_BASE;
    }
    function ensureNodeData(node) {
      return node[ATTR_KEY] || (node[ATTR_KEY] = {});
    }
    function getNodeType(node) {
      return node.nodeType;
    }
    function appendChildren(parent, children) {
      var len = children.length,
          many = len > 2,
          into = many ? document.createDocumentFragment() : parent;
      for (var i = 0; i < len; i++) {
        into.appendChild(children[i]);
      }
      if (many)
        parent.appendChild(into);
    }
    function removeNode(node) {
      var p = node.parentNode;
      if (p)
        p.removeChild(node);
    }
    function getAccessor(node, name, value, cache) {
      if (name !== 'type' && name !== 'style' && name in node)
        return node[name];
      var attrs = node[ATTR_KEY];
      if (cache !== false && attrs && hasOwnProperty.call(attrs, name))
        return attrs[name];
      if (name === 'class')
        return node.className;
      if (name === 'style')
        return node.style.cssText;
      return value;
    }
    function setAccessor(node, name, value) {
      if (name === 'class') {
        node.className = value || '';
      } else if (name === 'style') {
        node.style.cssText = value || '';
      } else if (name === 'dangerouslySetInnerHTML') {
        if (value && value.__html)
          node.innerHTML = value.__html;
      } else if (name === 'key' || name in node && name !== 'type') {
        node[name] = value;
        if (falsey(value))
          node.removeAttribute(name);
      } else {
        setComplexAccessor(node, name, value);
      }
      ensureNodeData(node)[name] = value;
    }
    function setComplexAccessor(node, name, value) {
      if (name.substring(0, 2) === 'on') {
        var _type = normalizeEventName(name),
            l = node._listeners || (node._listeners = {}),
            fn = !l[_type] ? 'add' : !value ? 'remove' : null;
        if (fn)
          node[fn + 'EventListener'](_type, eventProxy);
        l[_type] = value;
        return;
      }
      var type = typeof value;
      if (falsey(value)) {
        node.removeAttribute(name);
      } else if (type !== 'function' && type !== 'object') {
        node.setAttribute(name, value);
      }
    }
    function eventProxy(e) {
      var fn = this._listeners[normalizeEventName(e.type)];
      if (fn)
        return fn.call(this, optionsHook('event', e) || e);
    }
    var normalizeEventName = memoize(function(t) {
      return t.replace(/^on/i, '').toLowerCase();
    });
    function getNodeAttributes(node) {
      return node[ATTR_KEY] || getRawNodeAttributes(node) || EMPTY;
    }
    function getRawNodeAttributes(node) {
      var list = node.attributes;
      if (!list || !list.getNamedItem)
        return list;
      return getAttributesAsObject(list);
    }
    function getAttributesAsObject(list) {
      var attrs = undefined;
      for (var i = list.length; i--; ) {
        var item = list[i];
        if (!attrs)
          attrs = {};
        attrs[item.name] = item.value;
      }
      return attrs;
    }
    function isSameNodeType(node, vnode) {
      if (isFunctionalComponent(vnode))
        return true;
      var nodeName = vnode.nodeName;
      if (isFunction(nodeName))
        return node._componentConstructor === nodeName;
      if (getNodeType(node) === 3)
        return isString(vnode);
      return toLowerCase(node.nodeName) === nodeName;
    }
    function getNodeProps(vnode) {
      var props = clone(vnode.attributes),
          c = vnode.children;
      if (c)
        props.children = c;
      var defaultProps = vnode.nodeName.defaultProps;
      if (defaultProps) {
        for (var i in defaultProps) {
          if (hasOwnProperty.call(defaultProps, i) && !(i in props)) {
            props[i] = defaultProps[i];
          }
        }
      }
      return props;
    }
    var nodes = {};
    var normalizeName = memoize(function(name) {
      return name.toUpperCase();
    });
    function collectNode(node) {
      cleanNode(node);
      var name = normalizeName(node.nodeName),
          list = nodes[name];
      if (list)
        list.push(node);
      else
        nodes[name] = [node];
    }
    function createNode(nodeName) {
      var name = normalizeName(nodeName),
          list = nodes[name],
          node = list && list.pop() || document.createElement(nodeName);
      ensureNodeData(node);
      return node;
    }
    function cleanNode(node) {
      removeNode(node);
      if (getNodeType(node) === 3)
        return;
      if (!node[ATTR_KEY]) {
        node[ATTR_KEY] = getRawNodeAttributes(node);
      }
      node._component = node._componentConstructor = null;
    }
    function diff(dom, vnode, context) {
      var originalAttributes = vnode.attributes;
      while (isFunctionalComponent(vnode)) {
        vnode = buildFunctionalComponent(vnode, context);
      }
      if (isFunction(vnode.nodeName)) {
        return buildComponentFromVNode(dom, vnode, context);
      }
      if (isString(vnode)) {
        if (dom) {
          var type = getNodeType(dom);
          if (type === 3) {
            dom[TEXT_CONTENT] = vnode;
            return dom;
          } else if (type === 1) {
            collectNode(dom);
          }
        }
        return document.createTextNode(vnode);
      }
      var out = dom,
          nodeName = vnode.nodeName || UNDEFINED_ELEMENT;
      if (!dom) {
        out = createNode(nodeName);
      } else if (toLowerCase(dom.nodeName) !== nodeName) {
        out = createNode(nodeName);
        appendChildren(out, toArray(dom.childNodes));
        recollectNodeTree(dom);
      }
      innerDiffNode(out, vnode, context);
      diffAttributes(out, vnode);
      if (originalAttributes && originalAttributes.ref) {
        (out[ATTR_KEY].ref = originalAttributes.ref)(out);
      }
      return out;
    }
    function innerDiffNode(dom, vnode, context) {
      var children = undefined,
          keyed = undefined,
          keyedLen = 0,
          len = dom.childNodes.length,
          childrenLen = 0;
      if (len) {
        children = [];
        for (var i = 0; i < len; i++) {
          var child = dom.childNodes[i],
              key = child._component ? child._component.__key : getAccessor(child, 'key');
          if (!empty(key)) {
            if (!keyed)
              keyed = {};
            keyed[key] = child;
            keyedLen++;
          } else {
            children[childrenLen++] = child;
          }
        }
      }
      var vchildren = vnode.children,
          vlen = vchildren && vchildren.length,
          min = 0;
      if (vlen) {
        for (var i = 0; i < vlen; i++) {
          var vchild = vchildren[i],
              child = undefined;
          if (keyedLen) {
            var attrs = vchild.attributes,
                key = attrs && attrs.key;
            if (!empty(key) && hasOwnProperty.call(keyed, key)) {
              child = keyed[key];
              keyed[key] = null;
              keyedLen--;
            }
          }
          if (!child && min < childrenLen) {
            for (var j = min; j < childrenLen; j++) {
              var c = children[j];
              if (c && isSameNodeType(c, vchild)) {
                child = c;
                children[j] = null;
                if (j === childrenLen - 1)
                  childrenLen--;
                if (j === min)
                  min++;
                break;
              }
            }
          }
          child = diff(child, vchild, context);
          if (dom.childNodes[i] !== child) {
            var c = child.parentNode !== dom && child._component,
                next = dom.childNodes[i + 1];
            if (c)
              deepHook(c, 'componentWillMount');
            if (next) {
              dom.insertBefore(child, next);
            } else {
              dom.appendChild(child);
            }
            if (c)
              deepHook(c, 'componentDidMount');
          }
        }
      }
      if (keyedLen) {
        for (var i in keyed) {
          if (hasOwnProperty.call(keyed, i) && keyed[i]) {
            children[min = childrenLen++] = keyed[i];
          }
        }
      }
      if (min < childrenLen) {
        removeOrphanedChildren(children);
      }
    }
    function removeOrphanedChildren(children, unmountOnly) {
      for (var i = children.length; i--; ) {
        var child = children[i];
        if (child) {
          recollectNodeTree(child, unmountOnly);
        }
      }
    }
    function recollectNodeTree(node, unmountOnly) {
      var attrs = node[ATTR_KEY];
      if (attrs)
        hook(attrs, 'ref', null);
      var component = node._component;
      if (component) {
        unmountComponent(component, !unmountOnly);
      } else {
        if (!unmountOnly) {
          if (getNodeType(node) !== 1) {
            removeNode(node);
            return;
          }
          collectNode(node);
        }
        var c = node.childNodes;
        if (c && c.length) {
          removeOrphanedChildren(c, unmountOnly);
        }
      }
    }
    function diffAttributes(dom, vnode) {
      var old = getNodeAttributes(dom) || EMPTY,
          attrs = vnode.attributes || EMPTY,
          name = undefined,
          value = undefined;
      for (name in old) {
        if (empty(attrs[name])) {
          setAccessor(dom, name, null);
        }
      }
      if (attrs !== EMPTY) {
        for (name in attrs) {
          if (hasOwnProperty.call(attrs, name)) {
            value = attrs[name];
            if (!empty(value) && value != getAccessor(dom, name)) {
              setAccessor(dom, name, value);
            }
          }
        }
      }
    }
    var components = {};
    function collectComponent(component) {
      var name = component.constructor.name,
          list = components[name];
      if (list)
        list.push(component);
      else
        components[name] = [component];
    }
    function createComponent(Ctor, props, context) {
      var list = components[Ctor.name],
          len = list && list.length,
          c = undefined;
      for (var i = 0; i < len; i++) {
        c = list[i];
        if (c.constructor === Ctor) {
          list.splice(i, 1);
          var inst = new Ctor(props, context);
          inst.nextBase = c.base;
          return inst;
        }
      }
      return new Ctor(props, context);
    }
    function triggerComponentRender(component) {
      if (!component._dirty) {
        component._dirty = true;
        enqueueRender(component);
      }
    }
    function setComponentProps(component, props, opts, context) {
      var d = component._disableRendering;
      component.__ref = props.ref;
      component.__key = props.key;
      delete props.ref;
      delete props.key;
      component._disableRendering = true;
      if (context) {
        if (!component.prevContext)
          component.prevContext = component.context;
        component.context = context;
      }
      if (component.base) {
        hook(component, 'componentWillReceiveProps', props, component.context);
      }
      if (!component.prevProps)
        component.prevProps = component.props;
      component.props = props;
      component._disableRendering = d;
      if (!opts || opts.render !== false) {
        if (opts && opts.renderSync || options.syncComponentUpdates !== false) {
          renderComponent(component);
        } else {
          triggerComponentRender(component);
        }
      }
      hook(component, '__ref', component);
    }
    function renderComponent(component, opts) {
      if (component._disableRendering)
        return;
      var skip = undefined,
          rendered = undefined,
          props = component.props,
          state = component.state,
          context = component.context,
          previousProps = component.prevProps || props,
          previousState = component.prevState || state,
          previousContext = component.prevContext || context,
          isUpdate = component.base,
          initialBase = isUpdate || component.nextBase;
      if (isUpdate) {
        component.props = previousProps;
        component.state = previousState;
        component.context = previousContext;
        if (hook(component, 'shouldComponentUpdate', props, state, context) === false) {
          skip = true;
        } else {
          hook(component, 'componentWillUpdate', props, state, context);
        }
        component.props = props;
        component.state = state;
        component.context = context;
      }
      component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
      component._dirty = false;
      if (!skip) {
        rendered = hook(component, 'render', props, state, context);
        var childComponent = rendered && rendered.nodeName,
            childContext = component.getChildContext ? component.getChildContext() : context,
            toUnmount = undefined,
            base = undefined;
        if (isFunction(childComponent) && childComponent.prototype.render) {
          var inst = component._component;
          if (inst && inst.constructor !== childComponent) {
            toUnmount = inst;
            inst = null;
          }
          var childProps = getNodeProps(rendered);
          if (inst) {
            setComponentProps(inst, childProps, SYNC_RENDER, childContext);
          } else {
            inst = createComponent(childComponent, childProps, childContext);
            inst._parentComponent = component;
            component._component = inst;
            if (isUpdate)
              deepHook(inst, 'componentWillMount');
            setComponentProps(inst, childProps, NO_RENDER, childContext);
            renderComponent(inst, DOM_RENDER);
            if (isUpdate)
              deepHook(inst, 'componentDidMount');
          }
          base = inst.base;
        } else {
          var cbase = initialBase;
          toUnmount = component._component;
          if (toUnmount) {
            cbase = component._component = null;
          }
          if (initialBase || opts && opts.build) {
            base = diff(cbase, rendered || EMPTY_BASE, childContext);
          }
        }
        if (initialBase && base !== initialBase) {
          var p = initialBase.parentNode;
          if (p && base !== p)
            p.replaceChild(base, initialBase);
        }
        if (toUnmount) {
          unmountComponent(toUnmount, true);
        }
        component.base = base;
        if (base) {
          var componentRef = component,
              t = component;
          while (t = t._parentComponent) {
            componentRef = t;
          }
          base._component = componentRef;
          base._componentConstructor = componentRef.constructor;
        }
        if (isUpdate) {
          hook(component, 'componentDidUpdate', previousProps, previousState, previousContext);
        }
      }
      var cb = component._renderCallbacks,
          fn = undefined;
      if (cb)
        while (fn = cb.pop())
          fn.call(component);
      return rendered;
    }
    function buildComponentFromVNode(dom, vnode, context) {
      var c = dom && dom._component,
          oldDom = dom;
      var isOwner = c && dom._componentConstructor === vnode.nodeName;
      while (c && !isOwner && (c = c._parentComponent)) {
        isOwner = c.constructor === vnode.nodeName;
      }
      if (isOwner) {
        setComponentProps(c, getNodeProps(vnode), SYNC_RENDER, context);
        dom = c.base;
      } else {
        if (c) {
          unmountComponent(c, true);
          dom = oldDom = null;
        }
        dom = createComponentFromVNode(vnode, dom, context);
        if (oldDom && dom !== oldDom) {
          oldDom._component = null;
          recollectNodeTree(oldDom);
        }
      }
      return dom;
    }
    function createComponentFromVNode(vnode, dom, context) {
      var props = getNodeProps(vnode);
      var component = createComponent(vnode.nodeName, props, context);
      if (dom && !component.base)
        component.base = dom;
      setComponentProps(component, props, NO_RENDER, context);
      renderComponent(component, DOM_RENDER);
      return component.base;
    }
    function unmountComponent(component, remove) {
      hook(component, '__ref', null);
      hook(component, 'componentWillUnmount');
      var inner = component._component;
      if (inner) {
        unmountComponent(inner, remove);
        remove = false;
      }
      var base = component.base;
      if (base) {
        if (remove !== false)
          removeNode(base);
        removeOrphanedChildren(base.childNodes, true);
      }
      if (remove) {
        component._parentComponent = null;
        collectComponent(component);
      }
      hook(component, 'componentDidUnmount');
    }
    function Component(props, context) {
      this._dirty = this._disableRendering = false;
      this.prevState = this.prevProps = this.prevContext = this.base = this.nextBase = this._parentComponent = this._component = this.__ref = this.__key = this._linkedStates = this._renderCallbacks = null;
      this.context = context || {};
      this.props = props;
      this.state = hook(this, 'getInitialState') || {};
    }
    extend(Component.prototype, {
      linkState: function linkState(key, eventPath) {
        var c = this._linkedStates || (this._linkedStates = {}),
            cacheKey = key + '|' + (eventPath || '');
        return c[cacheKey] || (c[cacheKey] = createLinkedState(this, key, eventPath));
      },
      setState: function setState(state, callback) {
        var s = this.state;
        if (!this.prevState)
          this.prevState = clone(s);
        extend(s, isFunction(state) ? state(s, this.props) : state);
        if (callback)
          (this._renderCallbacks = this._renderCallbacks || []).push(callback);
        triggerComponentRender(this);
      },
      forceUpdate: function forceUpdate() {
        renderComponent(this);
      },
      render: function render() {
        return null;
      }
    });
    function render(vnode, parent, merge) {
      var existing = merge && merge._component && merge._componentConstructor === vnode.nodeName,
          built = diff(merge, vnode),
          c = !existing && built._component;
      if (c)
        deepHook(c, 'componentWillMount');
      if (built.parentNode !== parent) {
        parent.appendChild(built);
      }
      if (c)
        deepHook(c, 'componentDidMount');
      return built;
    }
    var preact = {
      h: h,
      Component: Component,
      render: render,
      rerender: rerender,
      options: options,
      hooks: options
    };
    return preact;
  }));
})(require('process'));
