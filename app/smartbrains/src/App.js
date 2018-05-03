import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import './App.css';
import Particles from 'react-particles-js';


const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }}};


// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: 'ec8fecd871274b4691a7c55040336891'
});

class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  componentWillMount() {
    document.title = 'SmartBrains'
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {

      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      // do something with response
    },
    function(err) {
      // there was an error
    }
  );

  }

  render() {
    return (
      <div className="App">

        <Particles className='particles' params={particlesOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange}
                      onButtonSubmit={this.onButtonSubmit}/>

        <FaceRecognition imageUrl = {this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
