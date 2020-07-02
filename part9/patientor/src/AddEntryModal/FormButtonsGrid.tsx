import React from 'react'
import { Grid, Button } from "semantic-ui-react";

interface Props {
    onCancel: () => void
    dirty: boolean
    isValid: boolean
}

export const FormButtonsGrid: React.FC<Props>= ({onCancel, dirty, isValid}) => {
    return (<Grid>
        <Grid.Column floated="left" width={5}>
          <Button type="button" onClick={onCancel} color="red">
            Cancel
          </Button>
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <Button
            type="submit"
            floated="right"
            color="green"
            disabled={!dirty || !isValid}
          >
            Add
          </Button>
        </Grid.Column>
      </Grid>)
}
