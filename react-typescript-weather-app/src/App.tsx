import { useState } from "react"
import Title from './components/Title';
import Form from './components/Form';
import Results from './components/results';
import './App.css';
import { type } from "@testing-library/user-event/dist/type";

type ResultsStateType = {
    country: string
    cityName: string
    temperature: string
    conditionText: string
    icon: string
}

function App() {
  const [city, setCity] = useState<string>("")
  const [results, setResults] = useState<ResultsStateType>({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: ""
  })
  const getWeather = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch(`https://api.weatherapi.com/v1/current.json?key=c1c73d3ee095428fb9775848221412&q=${city}&aqi=no`)
      .then(res => res.json())
      .then(data => {
        setResults({
          country: data.location.country,
          cityName: data.location.name,
          temperature: data.current.temp_c,
          conditionText: data.current.condition.text,
          icon: data.current.condition.icon
        })
      })
  }
  return (
    <div className="test">
      <Title />
        <Form setCity={ setCity } getWeather= {getWeather} />
      <Results results={ results } />
    </div>
  );
}

export default App;
