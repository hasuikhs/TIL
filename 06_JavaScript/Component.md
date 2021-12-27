# Component

## 1. Basic

- 기본 형태

```javascript
function Component({domId}) {
    this.$target = document.querySelector(`#${domId}`);
    
    this.state = [];
    
    this.setState = nextState => {
        this.state = nextState;
        
        this.render();
    }
    
    this.setEvent = () => {
        // event code
    }
    
    this.render = () => {
        // render code
        
        this.setEvent();
    }
}
```

