import { Button, Divider } from "antd";
import { useEffect, useRef, useState } from 'react'
import './iconfont/iconfont.css'
import './App.css'
import classNames from 'classnames'



function App() {
  const today=new Date()
  const todayNum=today.getTime()
  const [ commentList, setCommentList ] = useState([])
  const[text,setText]=useState('')
  const[date,setDate]=useState('')

  const[flag,setFlag]=useState(false)
  let id=0

  const handlPublish=()=>{
    if(date!==''&&text!==''){
    setCommentList([
      ...commentList,{
        item:text,
        date:date,
        id:Math.random(),
        check:false
      }
    ])
    setFlag(true)
  }
  else{
    alert('输错了')
  }
  setText('')
  setDate('')
  }

  function Item ({ item, date,did}){
    const timestamp = new Date(date).getTime()
    const[acheck,setCheck]=useState(false)
    const handlDel=(did)=>{
      console.log(did);
      if(acheck===true)
      setCommentList(commentList.filter(item => item.id !== did))
    }

    const changeCheck=()=>{
      if(acheck){
      setCheck(false)
      }
      else{
      setCheck(true)
      }
    }
    
    return(
      <div className="incident">
      <div className={classNames({in_font:acheck===false&&timestamp<todayNum},{in_font_normal:acheck===false&&timestamp>=todayNum},{check_font:acheck===true})}>
        <p>{item}</p>
        <p>{date}</p>
        </div>
      <div className="left">
      <input type="checkbox" onChange={changeCheck}></input>
      <button className="delete iconfont icon-ashbin" onClick={()=>handlDel(did)} ></button>
      </div>
    </div>
    )
}
  console.log(text);
  console.log(date);
  return (
    <div className="App">
      <h1 className='title'>To Do List</h1>
      <div className='input_block'>
      <input type='text' className='input_first' placeholder="输入任务名称" value={text} onChange={(e)=>setText(e.target.value)}></input>
      </div>


      <div className='input_block'>
      <input type="date" className='input_second' value={date} onChange={(e)=>setDate(e.target.value)}></input>
      <Button type="primary" className="button_add" style={{paddingRight:'40px'} } onClick={handlPublish}>添加</Button>
      </div>
      
      
      <div className={classNames('body',{body_active:flag===false})}>
      {commentList.map(item => <Item key={item.id} item={item.item} date={item.date} did={item.id}/>)}
      </div>

    </div>
  )
 }


export default App;
