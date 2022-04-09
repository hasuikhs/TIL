function CustomField({targetId, group, customEvent}) {
  if (!new.target) {
    throw new Error('Create object using new operator.');
  }

  this.$target = document.querySelector(`#${targetId}`);
  this.originElements = [...this.$target.querySelectorAll('li')].map(item => item.cloneNode(deep = true));

  this.$emptyEle = targetId.includes('main') ? this.$target.querySelector('li.cs-field-box__empty').cloneNode(deep = true) : undefined; 

  this.reset = () => {
    this.$target.innerHTML = '';
    this.originElements.forEach(item => this.$target.appendChild(item));

    customEvent && this.event();
  }

  this.setValues = values => {
    if (!customEvent) {
      return false;
    }

    for (const value of values.split(',')) {
      this.$target.closest('.cs-field-wrapper').querySelectorAll('.cs-field-sub ul li').forEach(item => {
        if (item.getAttribute('value') == value) {
          let cloneTgt = item.cloneNode(deep = true);

          this.$target.appendChild(cloneTgt);
          item.remove();
        }
      });
    }

    customEvent && this.event();
  }

  this.getValues = () => {
    return [...this.$target.querySelectorAll('li')].map(item => item.getAttribute('value'));
  }

  this.event = () => {
    let values = this.getValues().filter(item => item);

    if (targetId.includes('main') && values.length == 0) {
      if (!this.$target.childElementCount) this.$target.appendChild(this.$emptyEle);
    } else {
      if (this.$target.querySelector('li.cs-field-box__empty')) this.$target.querySelector('li.cs-field-box__empty').remove();
    }

    customEvent.handler(values);
  }

  this.init = () => {
    Sortable.create(this.$target, {
      group: group,
      animation: 150,
      ghostClass: 'ghost',
      filter: '.cs-field-close-btn',
      onFilter: customEvent && (evt => {
        let [item, ctrl] = [evt.item, evt.target];

        if (Sortable.utils.is(ctrl, '.cs-field-close-btn')) {
          let cloneTgt = item.cloneNode(deep = true);

          item.closest('.cs-field-wrapper').querySelector('.cs-field-sub ul').appendChild(cloneTgt);
          item.parentNode.removeChild(item);

          this.event();
        }
      }),
      onSort: customEvent &&(() => this.event())
    });
  };

  this.init();
}