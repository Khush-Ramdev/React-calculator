import React from 'react';
import './App.scss'

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expression: '0',
            currentVal: '0',
            result: 0,
            equalTo: false,
        }
        this.onNumberClick = this.onNumberClick.bind(this)
        this.onZeroClick = this.onZeroClick.bind(this)
        this.onClearClick = this.onClearClick.bind(this)
        this.onDivideClick = this.onDivideClick.bind(this)
        this.onMultiplyClick = this.onMultiplyClick.bind(this)
        this.onAddClick = this.onAddClick.bind(this)
        this.onSubtractClick = this.onSubtractClick.bind(this)
        this.onEqualToClick = this.onEqualToClick.bind(this)
        this.onDecimalClick = this.onDecimalClick.bind(this)
        this.onBackSpaceClick = this.onBackSpaceClick.bind(this)
    }

    onClearClick() {
        this.setState((prevState) => ({
            expression: '0',
            result: 0,
            currentVal: '0',
            equalTo: false
        }))
    }

    onZeroClick() {
        if (this.state.expression && this.state.expression[0] != '0') {
            this.setState((prevState) => ({
                expression: prevState.expression + "0",
                currentVal: prevState.currentVal + "0",
                equalTo: false
            }))
        }
    }

    onNumberClick = (number) => () => {
        if (this.state.expression.length == 1 && this.state.expression[0] == '0') {
            this.onBackSpaceClick();
        }
        let regex = /[x/\-+]/
        if (regex.test(this.state.currentVal)) {
            this.setState(() => ({ currentVal: '' }))
        }
        this.setState((prevState) => ({
            expression: prevState.expression + number,
            currentVal: prevState.currentVal + number,
            equalTo: false
        }))
    }
    onDivideClick() {
        if (this.state.expression.length == 1 && this.state.expression[0] == '0') {
            this.onBackSpaceClick();
        }
        if (this.state.expression[this.state.expression.length - 1] == '+' || this.state.expression[this.state.expression.length - 1] == '/' || this.state.expression[this.state.expression.length - 1] == 'x' || this.state.expression[this.state.expression.length - 1] == '-') {
            console.log("divide")
            this.setState((prevState) => ({
                expression: prevState.expression.slice(0, -1)
            }))
        }
        if (this.state.expression[this.state.expression.length - 1] == '-') {
            console.log("working")
            let plusRegex = /([+\-\/x]+)$/g;
            this.setState((prevState) => ({
                expression: prevState.expression.replace(plusRegex, "")
            }))
        }
        this.setState((prevState) => ({
            expression: prevState.expression + "/",
            currentVal: "/",
            equalTo: false
        }))
    }
    onMultiplyClick() {
        if (this.state.expression.length == 1 && this.state.expression[0] == '0') {
            this.onBackSpaceClick();
        }
        if (this.state.expression[this.state.expression.length - 1] == '+' || this.state.expression[this.state.expression.length - 1] == '/' || this.state.expression[this.state.expression.length - 1] == 'x' || this.state.expression[this.state.expression.length - 1] == '-') {
            this.setState((prevState) => ({
                expression: prevState.expression.slice(0, -1)
            }))
        }
        if (this.state.expression[this.state.expression.length - 1] == '-') {
            console.log("working")
            let plusRegex = /([+\-\/x]+)$/g;
            this.setState((prevState) => ({
                expression: prevState.expression.replace(plusRegex, "")
            }))
        }
        this.setState((prevState) => ({
            expression: prevState.expression + "x",
            currentVal: "x",
            equalTo: false
        }))
    }
    onAddClick() {
        if (this.state.expression.length == 1 && this.state.expression[0] == '0') {
            this.onBackSpaceClick();
        }
        if (this.state.expression[this.state.expression.length - 1] == '+' || this.state.expression[this.state.expression.length - 1] == '/' || this.state.expression[this.state.expression.length - 1] == 'x') {
            this.setState((prevState) => ({
                expression: prevState.expression.slice(0, -1)
            }))
        }
        if (this.state.expression[this.state.expression.length - 1] == '-') {
            console.log("working")
            let plusRegex = /([+\-\/x]+)$/g;
            this.setState((prevState) => ({
                expression: prevState.expression.replace(plusRegex, "")
            }))
        }
        this.setState((prevState) => ({
            expression: prevState.expression + "+",
            currentVal: "+",
            equalTo: false
        }))
    }
    onSubtractClick() {
        if (this.state.expression.length == 1 && this.state.expression[0] == '0') {
            this.onBackSpaceClick();
        }
        if (this.state.expression[this.state.expression.length - 1] == '+' || this.state.expression[this.state.expression.length - 1] == '-') {
            this.setState((prevState) => ({
                expression: prevState.expression.slice(0, -1)
            }))

        }
        this.setState((prevState) => ({
            expression: prevState.expression + "-",
            currentVal: "-",
            equalTo: false
        }))
    }
    onDecimalClick() {
        let decimalRegex = /[+\x\/]?\d+\.{1}\d+[+\x\/]?/g
        if (decimalRegex.test(this.state.expression)) {
            if (this.state.expression.length == 1 && this.state.expression[0] == '0') {
                this.onBackSpaceClick();
            }
        }
        if (this.state.expression.length == 1 && this.state.expression[0] == '0') {
            this.onBackSpaceClick();
        }
        if (!(this.state.currentVal.toString()).includes(".")) {
            this.setState((prevState) => ({
                expression: prevState.expression + ".",
                currentVal: prevState.currentVal + "."
            }))
        }
    }
    onBackSpaceClick() { 
        this.setState((prevState) => ({
            expression: prevState.expression.slice(0, -1),
            equalTo: false,
            currentVal: prevState.currentVal.slice(0, -1),
        }))
    }
    onEqualToClick() {
        const valid = /.+[+\-x/].+/g
        if (valid.test(this.state.expression)) {
            const expression = this.state.expression;
            const numRegex = /(\-)?(\.)?\d+(\.\d*)?/g
            const operatorRegex = /([x/])|(?<![\/x])[+-]/g
            const numbers = this.state.expression.match(numRegex)
            let operators = this.state.expression.match(operatorRegex)
            operators = operators.map((operator, index) => {
                if (operator == "-") {
                    return "+";
                }
                return operator;
            });
            while (operators.length !== 0) {
                const operator = operators.shift()
                if (operator === "+") {
                    const num1 = parseFloat(numbers.shift());
                    const num2 = parseFloat(numbers.shift());
                    const result = num1 + num2;
                    numbers.unshift(result);
                    this.setState(() => ({
                        result,
                        currentVal: result.toString()
                    }))
                }
                else if (operator === "x") {
                    const num1 = parseFloat(numbers.shift());
                    const num2 = parseFloat(numbers.shift());
                    const result = num1 * num2;
                    numbers.unshift(result);
                    this.setState(() => ({
                        result,
                        currentVal: result.toString()
                    }))
                }
                else if (operator === "/") {
                    const num1 = parseFloat(numbers.shift());
                    const num2 = parseFloat(numbers.shift());
                    const result = num1 / num2;
                    numbers.unshift(result);
                    this.setState(() => ({
                        result,
                        currentVal: result.toString()
                    }))
                }
            }
            this.setState(() => ({ equalTo: true }))
        }
    }
    render() {
        return (
            <div id="container">
                <div id="title">Calculator</div>
                <div id="result-display">
                    {this.state.equalTo ? `${this.state.expression}=${this.state.result}` : this.state.expression}
                </div>
                <div id="display">
                    {this.state.currentVal}
                </div>
                <div className="button-container">
                    <button name="AC" onClick={this.onClearClick} className="buttons" id="clear">AC</button>
                    <button disabled={this.state.equalTo} onClick={this.onBackSpaceClick} className="buttons" id="Backspa">{"<-"}</button>
                    <button onClick={this.onDivideClick} className="buttons" id="divide">/</button>
                    <button onClick={this.onMultiplyClick} className="buttons" id="multiply">x</button>

                    <button disabled={this.state.equalTo} onClick={this.onNumberClick(7)} className="buttons" id="seven">7</button>
                    <button disabled={this.state.equalTo} onClick={this.onNumberClick(8)} className="buttons" id="eight">8</button>
                    <button disabled={this.state.equalTo} onClick={this.onNumberClick(9)} className="buttons" id="nine">9</button>
                    <button onClick={this.onAddClick} className="buttons" id="add">+</button>

                    <button disabled={this.state.equalTo} onClick={this.onNumberClick(4)} className="buttons" id="four">4</button>
                    <button disabled={this.state.equalTo} onClick={this.onNumberClick(5)} className="buttons" id="five">5</button>
                    <button disabled={this.state.equalTo} onClick={this.onNumberClick(6)} className="buttons" id="six">6</button>
                    <button onClick={this.onSubtractClick} className="buttons" id="subtract">-</button>

                    <button disabled={this.state.equalTo} onClick={this.onNumberClick(1)} className="buttons" id="one">1</button>
                    <button disabled={this.state.equalTo} onClick={this.onNumberClick(2)} className="buttons" id="two">2</button>
                    <button disabled={this.state.equalTo} onClick={this.onNumberClick(3)} className="buttons" id="three">3</button>
                    <button onClick={this.onEqualToClick} className="buttons" id="equals">=</button>

                    <button disabled={this.state.equalTo} onClick={this.onZeroClick} className="buttons" id="zero">0</button>
                    <button disabled={this.state.equalTo} onClick={this.onDecimalClick} className="buttons" id="decimal">.</button>
                </div>
                <div id="title"><a id="profile-link" href="https://khush-ramdev.github.io/" target="_blank">Made By : Khush Ramdev</a></div>
            </div>
        )
    }
}

export default Calculator