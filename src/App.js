
import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import Entrylines from './components/Entrylines';
import MainHeader from './components/MainHeader';
import ModalEdit from './components/ModalEdit';
import NewEntryForm from './components/NewEntryForm';

function App() {
    const [entries, setEntries] = useState(initialEntries);
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [isExpense, setIsExpense] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [entryId, setEntryId] = useState();
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [total, setTotal] = useState(0);
   

    useEffect(() => {
      if(!isOpen && entryId){
        const index = entries.findIndex((entry) => entry.id === entryId );
        const newEntries = [...entries];
        newEntries[index].description = description;
        newEntries[index].value = value;
        newEntries[index].isExpense = isExpense;
        setEntries(newEntries);
        resetEntry();

      }
      // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [isOpen]);

    useEffect(() =>  {
      let totalIncome = 0;
      let totalExpense = 0;
      entries.map(entry => {
        if(entry.isExpense){
        return  (totalExpense += Number(entry.value));
      }
        return (totalIncome += Number(entry.value));
      });
      setTotal(totalIncome - totalExpense);
      setIncomeTotal(totalIncome);
      setExpenseTotal(totalExpense);
      
    }, [entries]);

    

    //const deleteEntry = (id) => {}
    function deleteEntry(id){
      const result = entries.filter(entry => entry.id !== id);
      setEntries(result);
    }

    function editEntry(id){
      console.log(`edit entry with ${id}`);
      if(id){
        const index = entries.findIndex(entry => entry.id === id);
        const entry = entries[index];
        setEntryId(id);
        setDescription(entry.description);
        setValue(entry.value);
        setIsExpense(entry.isExpense);
        setIsOpen(true); 
       
      }

    }

    function addEntry(){
      const result = entries.concat({id: entries.length +1,
      description,
      value,
      isExpense,
      });
      setEntries(result);
     

    }

    function resetEntry(){
      setDescription('');
      setValue('');
      setIsExpense(true);
    }

  return (
    <Container>
      <MainHeader title='Budget' type="h1"/>
      <DisplayBalance title="Your Balance:" value={total} color='black' size='small'/>
    
    <DisplayBalances 
    incomeTotal={incomeTotal} 
    expenseTotal={expenseTotal} 
    />

    <MainHeader title="History" type='h3' />
    <Entrylines 
    entries={entries} 
    deleteEntry={deleteEntry} 
    editEntry={editEntry}/>
    <MainHeader title="Add New Transaction" type='h3' />
    <NewEntryForm 
      addEntry={addEntry}  
      description={description} 
      value={value} 
      isExpense={isExpense}
      setValue={setValue}
      setDescription={setDescription}
      setIsExpense={setIsExpense}/>
    
    <ModalEdit isOpen={isOpen} setIsOpen={setIsOpen} 
     addEntry={addEntry}  
     description={description} 
     value={value} 
     isExpense={isExpense}
     setValue={setValue}
     setDescription={setDescription}
     setIsExpense={setIsExpense}/>

    </Container>
  );
}

export default App;

var initialEntries= [
{   id: 1,
    description: "Work Income",
    value: 1000.00,
    isExpense: false,
},
{   id: 2,
    description: "Water Bill",
    value: 20.00,
    isExpense: true, 
},

{   id: 3,
    description: "Rent",
    value: 300.00,
    isExpense: true, 
},

{   id: 4,
    description: "Power Bill",
    value: 50.00,
    isExpense: true, 
}
]