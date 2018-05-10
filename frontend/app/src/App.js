import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
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
    }
  }
};

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({apiKey: 'ec8fecd871274b4691a7c55040336891'});

class App extends Component {


  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  componentWillMount() {
    document.title = 'SmartBrains'
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})

    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {

      if (response) {
        fetch('http://localhost:3050/findface', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.user.email,
        })
      })
      .then(response => {
        return response.json()})
      .then(user => {
        console.log(user);
        this.setState(Object.assign(this.state.user, { entries: user.entries}))

      })

      this.displayFaceBox(this.calculateFaceLocation(response))
    }})
    .catch(err => console.log(err));

  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }



  render() {
    return (<div className="App">

      <Particles className='particles' params={particlesOptions}/>
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>

      { this.state.route === 'home'
      ?
      <div>
      <Logo/>
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>

      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>

      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
    </div>
      : (this.state.route === 'signin'
      ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
)
  }
    </div>);
  }
}

export default App;
