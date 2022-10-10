import React from 'react'
import { Button, Header, Icon } from 'semantic-ui-react'


function Modal() {
  const [open, setOpen] = React.useState(false)

  function Reducer(state, action) {
    switch (action.type) {
      case 'OPEN_MODAL':
        return { open: true, dimmer: action.dimmer }
      case 'CLOSE_MODAL':
        return { open: false }
      default:
        throw new Error()
    }
  }

  return (
    <div>
      <Modal
        closeIcon
        open={open}
        trigger={<Button>Show Modal</Button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Header icon='archive' content='Archive Old Messages' />
        <Modal.Content>
          <p>
            Your inbox is getting full, would you like us to enable automatic
            archiving of old messages?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => setOpen(false)}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' onClick={() => setOpen(false)}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default Modal 