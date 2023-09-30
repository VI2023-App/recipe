import './App.css';
import ImageUpload from './components/ImageUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          My token = {window.token}
          </p>
      </header>
      <ImageUpload />
    </div>
  );
}

export default App;
