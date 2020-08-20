import React from 'react'
import { Grid, Message } from 'semantic-ui-react'

const Confirmed = () => (
  <Grid centered>
    <Message
      success
      header='Your email address has been successfully confirmed'
      content='You may now log-in with the email you have chosen'
    />
  </Grid>
)

export default Confirmed