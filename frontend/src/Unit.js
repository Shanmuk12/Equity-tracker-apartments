import React, { PureComponent } from 'react';
import { Card, Grid, Statistic, Image } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          unit: 'day',
          unitStepSize: 1,
          displayFormats: {
            'day': 'MMM DD'
          },
          max: Date.now()
        }
      }
    ],
    yAxes: [
      {
        type: 'linear',
        ticks: {
          callback: value => Math.floor(value) === value ? '$' + value : null
        }
      }
    ]
  }
}

class Unit extends PureComponent {

  getData = () => {
    return {
      datasets: [
        {
          label: 'Price',
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointHitRadius: 10,
          data: this.props.unit.Prices.map(p => ({ t: p.DateRetrieved, y: p.Price }))
        }
      ]
    }
  }

  render() {
    const currentPrice = this.props.unit.Prices[this.props.unit.Prices.length - 1];
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            <span style={{textDecoration: this.props.unit.IsAvailable ? 'none' : 'line-through'}}>
            {this.props.unit.UnitID} - Listed {moment(this.props.unit.Prices[0].DateRetrieved).fromNow()}
            </span>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Grid centered columns={2}>
            <Grid.Column>
              <Statistic size="tiny" label={`${currentPrice.TermLength} months`} value={`$${currentPrice.Price}`} />
              <p>{this.props.unit.Bed} bed {this.props.unit.Bath} bath</p>
              <p>{this.props.unit.Sqft} sqft {this.props.unit.Floor}</p>
              <p>Available {this.props.unit.AvailableDate}</p>
              <p>{this.props.unit.Description}</p>
            </Grid.Column>
            <Grid.Column>
              <Image src={this.props.unit.Floorplan} centered style={{ maxHeight: '400px' }} />
            </Grid.Column>
          </Grid>
          <div style={{ height: '200px' }}>
            <Line
              data={this.getData()}
              height={200}
              options={options}
            />
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default Unit;