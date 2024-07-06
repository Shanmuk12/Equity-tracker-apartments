import React, { PureComponent } from 'react';
import { Card, Accordion } from 'semantic-ui-react';
import Unit from './Unit'

class Building extends PureComponent {
  getPanels = () => {
    return this.props.building.UnitTypes.filter(ut => !!ut.Units).map(ut => {
      return {
        key: ut.Name,
        title: ut.Name,
        content: ut.Units.map((u, i) => (<Unit key={u.UnitID} unit={u} />))
      }
    })
  }


  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {this.props.building.Name}
          </Card.Header>
        </Card.Content>
        <Card.Content>

          <Accordion panels={this.getPanels()} exclusive={false} styled fluid />
        </Card.Content>
      </Card>
    );
  }
}

export default Building;