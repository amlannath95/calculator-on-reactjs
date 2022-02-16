import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import React, {useState} from "react";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign:"",
    num:0,
    res: 0,
  });

  //When numericals are pressed
  const numClickHandler = (e) => {
    console.log(`e is ${e}`)
    e.preventDefault();
    const value = e.target.innerHTML;
    
    if(removeSpaces(calc.num).length < 16){
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
          ? "0"
          : removeSpaces(calc.num) % 1 === 0
          ? toLocaleString(Number(removeSpaces(calc.num + value)))
          : toLocaleString(calc.num + value),
        
            res: !calc.sign ? 0 :calc.res,
      });
    };
  };

  //Resets the value
  const resetHandler = () => {
    setCalc({
      ...calc,
      sign:"",
      num: 0,
      res: 0,
    })
  };

  //Inverts the numner by multiplying it with -1
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    })
    console.log(`calc.num: ${calc.num} calc.res: ${calc.res}`);
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

  setCalc({
    ...calc,
    num: (num /= Math.pow(100, 1)),
    res: (res /= Math.pow(100, 1)),
    sign: "",
  });
};

  //When "="" is pressed 
  const equalsClickHandler = () => {
    console.log('= is pressed')
    if(calc.sign && calc.num){
      const math = (a, b, sign) => 
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res: 
          calc.num === "0" && calc.sign === "/"
            ? "Cannot divide with 0"
            :toLocaleString(math(Number(calc.res), Number(calc.num), calc.sign)),
            sign: "",
            num: 0,
      });
    }
  };

  //When *-/+ is pressed
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    console.log(`calc.res: ${calc.res}  !calc.res: ${!calc.res} calc.num: ${calc.num}`);
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,  
    })
  };

  //It handles decimal point
  const commaClickHandler = (e) => {
    e.preventDefault();

    const value = e.target.innerHTML;
    console.log(`calc.num: ${calc.num}  !calc.num: $${!calc.num}`)
    setCalc({
      ...calc,
      mum:
        !calc.num.toString().includes(".")
        ? calc.num + value
        :calc.num,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  //console.log(`i-${i}  btn-${btn}`);}
                  btn === "C"
                      ? resetHandler
                      : btn === "+-"
                      ? invertClickHandler
                      : btn === "%"
                      ? percentClickHandler
                      : btn === "="
                      ? equalsClickHandler
                      : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                      ? signClickHandler
                      : btn === "."
                      ? commaClickHandler
                      : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;