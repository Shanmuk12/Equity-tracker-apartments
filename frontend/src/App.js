import React, { Component } from 'react';
import { Card, Form, Grid, Header, Menu, Rail, Segment, Sticky, Checkbox } from 'semantic-ui-react';
import Building from './Building';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      priceMin: 0,
      priceMax: 5000,
      sqftMin: 0,
      sqftMax: 5000,
    };
  }


  componentDidMount() {
    const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';
    fetch(API_BASE + '/api/prices')
      .then(res => res.json())
      .then(buildings => {
        buildings.forEach(building => {
          building.UnitTypes.forEach(ut => {
            if (ut.Units) {
              ut.Units.sort((a, b) => a.Prices[a.Prices.length - 1].Price - b.Prices[b.Prices.length - 1].Price)
            }
          })
        })

        this.setState({ buildings });
      })
  }

  filterList = () => {
    console.log(this.state);
    const newBuildings = this.state.buildings;
    newBuildings.forEach(building => {
      building.UnitTypes.forEach(ut => {
        if (ut.Units) {
          ut.Units = ut.Units.filter(u => {
            const currentPrice = u.Prices[u.Prices.length - 1].Price;
            return currentPrice >= this.state.priceMin && currentPrice <= this.state.priceMax &&
              u.Sqft >= this.state.sqftMin && u.Sqft <= this.state.sqftMax;
          })

          console.log(ut.Units);
        }
      })
    })
    console.log(newBuildings);
    this.setState({ buildings: newBuildings }, this.forceUpdate);
  }


  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(name, value);

    this.setState({
      [name]: parseInt(value, 10)
    }, () => {
      this.filterList();
    });

  }


  render() {
    return (
      <div className="App">
        <Menu inverted>
        </Menu>

        <Grid centered columns={1} container>
          <Grid.Column>
            <Rail close='very' position='left' style={{ paddingTop: '2rem' }}>
              <Sticky>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      Filters
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Form>
                      <Segment vertical>
                        <Header as="h4">Unit Type</Header>
                        <Form.Field>
                          <Checkbox label='Studio' />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox label='1 Bed' />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox label='2 Bed' />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox label='3 Bed' />
                        </Form.Field>
                      </Segment>
                      <Segment vertical>
                        <Header as="h4">Price</Header>
                        <Form.Group widths='equal'>
                          <Form.Input name="priceMin" value={this.state.priceMin} onChange={this.handleInputChange} fluid label='Min' placeholder='Min' type="number" min="0" />
                          <Form.Input name="priceMax" value={this.state.priceMax} onChange={this.handleInputChange} fluid label='Max' placeholder='Max' type="number" min="0" />
                        </Form.Group>
                      </Segment>
                      <Segment vertical>
                        <Header as="h4">Sqft</Header>
                        <Form.Group widths='equal'>
                          <Form.Input name="sqftMin" value={this.state.sqftMin} onChange={this.handleInputChange} fluid label='Min' placeholder='Min' type="number" min="0" />
                          <Form.Input name="sqftMax" value={this.state.sqftMax} onChange={this.handleInputChange} fluid label='Max' placeholder='Max' type="number" min="0" />
                        </Form.Group>
                      </Segment>
                    </Form>
                  </Card.Content>
                </Card>
              </Sticky>
            </Rail>


            {this.state.buildings.map((b, i) => <Building key={b.Name} fluid building={b} />)}
          </Grid.Column>
        </Grid>


      </div>
    );
  }
}

export default App;
