import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
function App() {

  const [mass, setMass] = useState("")
  const [height, setHeight] = useState("")
  const [total, setTotal] = useState(0)
  const [status, setSatus] = useState("")
  const [isMass, setIsMass] = useState(true)
  const [isHeight, setIsHeight] = useState(true)
  const validate = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(!!e.target.value.match('^[0-9]*$'));
    if (!!e.target.value.match('^[0-9]*$')) {
      if (e.target.name == 'mass') {
        setMass(e.target.value)
        setIsMass(true)
      }
      else {
        setHeight(e.target.value)
        setIsHeight(true)
      }
    }
    else {
      if (e.target.name == 'mass') {
        setMass(e.target.value)
        setIsMass(false)
      }
      else {
        setHeight(e.target.value)
        setIsHeight(false)
      }
    }
  }

  const handleReset = () => {
    setMass("")
    setHeight("")
    setTotal(0)
    setIsMass(true)
    setIsHeight(true)
  }

  const handleCalculate = () => {
    if(height && mass){
      const heightMeter = height /100
      const value = mass / (heightMeter * heightMeter)
      setTotal(value.toFixed(2))
        if(value<18.5){
          setSatus("Under Weight")
        }
        else if(value>=18.5 && value<24.9){
          setSatus("Normal Weight")
        }
        else if(value>=25 && value<29.9){
          setSatus("Over Weight")
        }
        else{
          setSatus("Obese")
        }
    }
    else{
      alert("please fill your input box")
      total(0)
      setSatus("")
    }
  }
  return (
    <>
      <div className='body'>
        <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
          <div style={{ width: '400px' }} className="p-5 bg-light rounded">
            <h2>BMI Calculator</h2>
            <h6>Calculate your BMI</h6>
            <div className="my-3">
              <TextField id="standard-basic" name='height' value={height} label="Height (cm)" variant="standard" className='w-100' onChange={(e) => validate(e)} />
              {!isHeight && <span className='text-danger'>*invalid input</span>}
            </div>
            <div className="my-3">
              <TextField id="standard-basic" name='mass' value={mass} label="Weight (kg)" variant="standard" className='w-100' onChange={(e) => validate(e)} />
              {!isMass && <span className='text-danger'>*invalid input</span>}
            </div>
            <div className='mb-3 d-flex justify-content-between'>
              <Button onClick={handleCalculate} style={{ width: '120px', height: '40px' }} variant="contained" disabled={isMass && isHeight ? false : true} color="success">
                CALCULATE
              </Button>
              <Button style={{ width: '120px', height: '40px' }} onClick={handleReset} variant="contained" color="error">
                RESET
              </Button>
            </div>
            { total !== 0 && (<div className='input'>
              <div style={{ height: '80px' }} className="d-flex justify-content-center align-items-center flex-column">
                <h3>Your BMI: {total}</h3>
                <h6>Status: {status}</h6>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  )
}
export default App