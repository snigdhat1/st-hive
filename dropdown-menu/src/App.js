import './App.css';

import SelectDropdown from './SelectDropdown';
function App() {

  // Data that will be used to populate the dropdown
  const items = [
    { id: 1, title: 'Option 1' },
    { id: 2, title: 'Option 2' },
    { id: 3, title: 'Option 3' },
    { id: 4, title: 'Option 4' },
    { id: 5, title: 'Option 5' }
  ];

  return (
    <div className='App'>
    <h2>Single Select Dropdown</h2>
    <SelectDropdown items={items} multiSelect={false} />

    <h2>Multi Select Dropdown</h2>
    <SelectDropdown items={items} multiSelect={true} />
  </div>
  );
}

export default App;
