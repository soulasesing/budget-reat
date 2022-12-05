import React from 'react'
import { Grid, GridColumn, Icon, Segment } from 'semantic-ui-react'

function EntryLine({ description, value, isExpense=false }) {
  return (
    <Segment color={isExpense ? 'red' : 'green'}>
    <Grid columns={3} textAlign='right'>
      <Grid.Row>
        <GridColumn width={10} textAlign="left">
            {description}
            </GridColumn>
        <GridColumn width={3} textAlign="right">
            {value}
        </GridColumn>
        <GridColumn width={3}>
          <Icon name="edit" bordered />
          <Icon name="trash" bordered/>
        </GridColumn>
      </Grid.Row>
    </Grid>
  </Segment>
  )
}

export default EntryLine