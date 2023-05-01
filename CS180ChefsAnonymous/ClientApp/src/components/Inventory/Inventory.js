import React from 'react';

const Inventory = (props) =>{

  return (
          <div>
            <h1>Inventory</h1>
    
            <p>This is a simple example of a React component.</p>
          </div>
        );
};

export default Inventory;
// export class Inventory extends Component {
//   static displayName = Inventory.name;

//   constructor(props) {
//     super(props);
//     this.state = { currentCount: 0 };
//     this.incrementInventory = this.incrementInventory.bind(this);
//   }

//   incrementInventory() {
//     this.setState({
//       currentCount: this.state.currentCount + 1
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1>hello</h1>

//         <p>This is a simple example of a React component.</p>
//       </div>
//     );
//   }
// }
