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
    
    if(calc.num.length < 16){
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : calc.num % 1 === 0
            ? Number(calc.num + value)
            : calc.num + value,
        
            res: !calc.sign ? 0 :calc.res,
      });
    };
  };

  const resetHandler = 0;

  const invertClickHandler = 0;

  const percentClickHandler = 0;

  const equalsClickHandler = 0;

  //When *-/+ is pressed
  const signClickHandler = (e) => {
    e.preventDefault();
     
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