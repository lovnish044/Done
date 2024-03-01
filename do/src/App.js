
import {useEffect,useState} from "react";
import axios from "axios";
function App() {

 const [data,setData]=useState([]);
 useEffect(()=>{
  const fecthdata =  async ()=>{
   try{
  const response = await axios.get("http://localhost:5000/api/v1/booklist")
  setData(response.data.book)
   }catch(error){
    console.log(error)
   }
  }
  fecthdata()
 },[])

 const eventType= async (events,book)=>{
  try{
    const response = await axios.post(`http://localhost:5000/api/v1/createEvent?book_id=${book}&&event=${events}`)
  
     }catch(error){
      console.log(error)
     }
    }
 
  return (
    <div>
    
    {
      data.map((book,index)=>{
        return (
      <table key={index}>
        <tr>
          <th>Book NAme</th>
          <th>Book Copy</th>
          <th>ChecKbOx</th>
          <th>Return</th>
        </tr>
        <tr>
          <td>{book.BookName}</td>
          <th>{book.NumberOfCopies}</th>
          <th><button onClick={()=>eventType("checkout",book._id)}>Check</button></th>
          <th><button onClick={()=>eventType("return",book._id)}>Return</button></th>
        </tr>
      </table>
        )

      })
    }
    </div>
  );
}

export default App;
