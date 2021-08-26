import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import Skeleton from 'react-loading-skeleton';

const LoaderComponent = () => (
  <div>
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
  </div>
)

export default LoaderComponent 