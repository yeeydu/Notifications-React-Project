import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Grid, Image, Label, Segment, Button } from 'semantic-ui-react'

export default function TemplateSelection() {
  let navigate = useNavigate();


  return (
    <div className='select'>
      <Button className='btn-navigate' onClick={() => navigate(-1)} >Back</Button>
      <h2 >Select a Message Template</h2>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column >
            <Link to={"/template/birthday"}>
              <Segment padded className='select-col'>
                <Label attached='top'>Happy Birthday!</Label>
                <Image src='/img/paragraph.png' />
              </Segment>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to={"/template/position"}>
              <Segment padded className='select-col'>
                <Label attached='top'>New Position!</Label>
                <Image src='/img/paragraph.png' />
              </Segment>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to={"/template/late"}>
              <Segment padded className='select-col'>
                <Label attached='top'>Late Notification</Label>
                <Image src='/img/paragraph.png' />
              </Segment>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}





