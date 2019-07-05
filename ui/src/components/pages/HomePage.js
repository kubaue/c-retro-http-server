import React from "react";
import PageWithRouting from '../PageWithRouting';

export class HomePage extends React.Component {

  render () {
    return (
      <PageWithRouting title={'Home'}>
        <div>Home</div>
      </PageWithRouting>
    );
  }
}