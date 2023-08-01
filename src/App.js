import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import BarStacked from "./components/BarStacked";
import SelectProject from "./components/SelectProject";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      data: [],
      loadingText: "Chart loading...",
      errorText: "",
      projectSelected: "",
    };
  }

  getEnergyData = async (uuid) => {
    await fetch(`/api/energy?uuid=${uuid}`)
      .then((res) => res.json())
      .then((result) => {
        result.forEach((element, index) => {
          if (element.label === "Energie totale")
            result.splice(index, index + 1);
        });
        this.setState({ data: result });
      })
      .catch(() =>
        this.setState({ errorText: "An error as occured during loading data" })
      )
      .finally(() => this.setState({ loadingText: "" }));
  };

  handleChange = (event) => {
    this.setState({ projectSelected: event.target.value });
    this.getEnergyData(event.target.value);
  };

  componentDidMount() {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((result) => {
        if (result.length) {
          this.setState({
            projects: result,
            projectSelected: result[0].uuid,
          });
          this.getEnergyData(result[0].uuid);
        }
      });
  }

  render() {
    const { projects, data, loadingText, errorText, projectSelected } =
      this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Project list:</p>
          <SelectProject
            label="Project selected"
            handleChange={this.handleChange}
            projects={projects}
            projectSelected={projectSelected}
          />
          <p>Data size: {data.length}</p>
          {loadingText || errorText ? (
            <p style={{ color: errorText ? "red" : "" }}>
              {loadingText || errorText}
            </p>
          ) : (
            <BarStacked data={data} />
          )}
        </header>
      </div>
    );
  }
}

export default App;
