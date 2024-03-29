(function () {
  var exports = {};
  ('use strict');
  Object.defineProperty(exports, '__esModule', { value: true });
  var _createClass = (function () {
    function e(e, t) {
      for (var a = 0; a < t.length; a++) {
        var i = t[a];
        i.enumerable = i.enumerable || false;
        i.configurable = true;
        if ('value' in i) i.writable = true;
        Object.defineProperty(e, i.key, i);
      }
    }
    return function (t, a, i) {
      if (a) e(t.prototype, a);
      if (i) e(t, i);
      return t;
    };
  })();
  function _classCallCheck(e, t) {
    if (!(e instanceof t)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var ImageDrop = (exports.ImageDrop = (function () {
    function e(t) {
      var a =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, e);
      this.quill = t;
      this.handleDrop = this.handleDrop.bind(this);
      this.handlePaste = this.handlePaste.bind(this);
      this.quill.root.addEventListener('drop', this.handleDrop, false);
      this.quill.root.addEventListener('paste', this.handlePaste, false);
    }
    _createClass(e, [
      {
        key: 'handleDrop',
        value: function e(t) {
          t.preventDefault();
          if (
            t.dataTransfer &&
            t.dataTransfer.files &&
            t.dataTransfer.files.length
          ) {
            if (document.caretPositionFromPoint) {
              var a = document.getSelection();
              var i = document.caretPositionFromPoint(t.clientX, t.clientY);
              a.setBaseAndExtent(
                i.startContainer,
                i.startOffset,
                i.startContainer,
                i.startOffset
              );
            }
            this.readFiles(t.dataTransfer.files, this.insert.bind(this));
          }
        },
      },
      {
        key: 'handlePaste',
        value: function e(t) {
          var a = this;
          if (
            t.clipboardData &&
            t.clipboardData.items &&
            t.clipboardData.items.length
          ) {
            this.readFiles(t.clipboardData.items, function (e) {
              var t = a.quill.getSelection();
              if (t) {
              } else {
                setTimeout(function () {
                  return a.insert(e);
                }, 0);
              }
            });
          }
        },
      },
      {
        key: 'insert',
        value: function e(t) {
          var a =
            (this.quill.getSelection() || {}).index || this.quill.getLength();
          this.quill.insertEmbed(a, 'image', t, 'user');
        },
      },
      {
        key: 'readFiles',
        value: function e(t, a) {
          [].forEach.call(t, function (e) {
            if (
              !e.type.match(
                /^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i
              )
            ) {
              return;
            }
            var t = new FileReader();
            t.onload = function (e) {
              a(e.target.result);
            };
            var i = e.getAsFile ? e.getAsFile() : e;
            if (i instanceof Blob) {
              t.readAsDataURL(i);
            }
          });
        },
      },
    ]);
    return e;
  })());
  window.Quill.register('modules/imageDrop', exports.ImageDrop);
})();
