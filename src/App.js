import React ,{useEffect,useState} from 'react';
import Header from './Components/Header/header'
// import Card from './Components/Card/card'
import Characters from './Components/Characters/Characters'
import PanelCharacaters from './Components/Characters/PanelFilter'
import api from './Services/api'
import './App.css';
function App() {
const [characters, setcharacter] = useState([]);
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect( () => {
    handleFetchCharacter();
}, [])

async function handleFetchCharacter(params ) {
  const result = await api.get(`/characters?apikey=417563ee41c935ced99af603ef41c182&ts=1585446000&hash=b446190c6aba9fe5158e98ec796acb6a`,{params})

  const {data} = result.data
  setcharacter(data);
}
  return (
    <div className="App">
       <Header />
       <PanelCharacaters characters={characters} onLoadCharacters={handleFetchCharacter} />
    </div>
  );
}

export default App;
