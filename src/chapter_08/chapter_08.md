# 8강. Handling Events

---

## 8.1 Event
- 사용자가 버튼을 클릭한 사건
### 8.1.1 Event 이름의 표기법
**DOM의 Event**
```javascript
<button onclick="activate()">
    Activate
</button>
```
**React의 Event**
```javascript
<button onClick={activate}>
    Activate
</button>
```
### 8.1.2 함수 전달 방식의 차이 
DOM에서는 이벤트를 처리할 함수를 문자열로 전달하지만,  
React에서는 함수 그대로 전달


## 8.2 Event Handler
- 어떤 사건이 발생하면, 사건을 처리하는 역할  
- Event Listener

### 8.2.1 Class component
**(1) Binding**
```javascript
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { isToggleOn: true };
        
        // callback에서 `this`를 사용하기 위해서는 바인딩을 필수적으로 해줘야 함 
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? '켜짐' : '꺼짐'}
            </button>
        );
    }
}
```
> **JSX에서 this의 의미에 대해 유의**  
> 바인드를 하는 이유:   
> 자바스크립트에서 기본적으로 클래스 함수들이 바인드되지 않음  
> 바인드를 하지 않으면 this.handleClick은 글로벌 스코프에서 호출됨   
> 글로벌 스코프에서 this.handleClick은 undefined이 되므로 사용 불가
 
**(2) Class field syntax**  
바인드 사용이 귀찮다면?  
Class fields syntax 사용
```javascript
class MyButton extends React.Component {
    // Class field syntax
    handleClick = () => {
        console.log('this is: ', this);
    }
    
    render() {
        return (
            <button onClick={this.handleClick}>
                클릭
            </button>
        );
    }
}
```
**(3) Arrow function**  
바인드, 클래스필드 문법도 사용도 하지 않으려면
핸들러를 넣는 곳에 arrow function 사용 
```javascript
class MyButton extends React.Component {
    handleClick() {
        console.log('this is: ', this);
    }

    render() {
        return (  // Arrow function
            <button onClick={() => this.handleClick()}>
                클릭
            </button>
        );
    }
}
```
이 방식은 myButton 컴포넌트가 렌더링 될 때마다 다른 콜백 함수가 생성되는 문제 발생  
이 콜백 함수가 하위 컴포넌트에 prop으로 넘겨지게 되면 하위 컴포넌트에서 추가적인 렌더링 발생  
-> 성능 문제를 위해 binding, class field syntax 권장 

### 8.2.2 Function component

**(1) 함수 안에 함수**
```javascript
function Toggle(props) {
    const [isToggleOn, setIsToggleOn] = useState(true);
    
    function handleClick() {
        setIsToggleOn((isToggleOn) => !isToggleOn);
    }
    
    return (
        <button onClick={handleClick}>
            {isToggleOn ? "켜짐" : "꺼짐"}
        </button>
    );
}
```

**(2) Arrow function**
```javascript
function Toggle(props) {
    const [isToggleOn, setIsToggleOn] = useState(true);
    
    const handleClick = () => {
        setIsToggleOn((isToggleOn) => !isToggleOn);
    }
    
    return (
        <button onClick={handleClick}>
            {isToggleOn ? "켜짐" : "꺼짐"}
        </button>
    );
}
```
함수 컴포넌트에서는 이벤트를 넣어줄 때 this를 사용하지 않고 onClick에 곧바로 정의한
이벤트 핸들러를 넘기면 됨 

## 8.3 Arguments 전달
- 함수에 전달할 데이터  
- Event handler에 전달할 데이터  
- Parameter

### 8.3.1 Class component
```javascript
<button onClick={(event) => this.deleteItem(id, event)}>삭제하기</button>

<button onClick={this.deleteItem(this, id)}>삭제하기</button>
```
위 코드 두 줄은 모두 동일한 역할을 하지만 하나는 arrow function, 다른 하나는 bind를 사용함  
매개변수 event는 리액트의 이벤트 객체  
두 방법 모두 첫 번째 매개변수는 id, 두 번째 매개변수로 이벤트가 전달됨 

arrow function을 이용한 방법은 명시적으로 이벤트를 두 번째 매개변수로,
bind를 사용한 방법은 이벤트가 자동으로 id 이후에 두 번째 매개변수로 전달됨

_클래스 컴포넌트는 지금은 거의 사용하지 않음_

### 8.3.2 Function component
```javascript
function myButton(props) {
    const handleDelete = (id, event) => {
        console.log(id, event.target)
    };
    
    return (
        <button onClick={(event) => handleDelete(1, event)}>
            삭제하기
        </button>
    );
}
```
매개변수의 순서 무관 