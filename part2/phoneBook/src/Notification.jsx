const Notification = ({message})=>{

  const overallColor = message.includes("failed")? "red":"green"

  const notiStyle = {
    color: overallColor,
    backgroundColor:"light-grey",
    border:`${overallColor} 5px solid`,
    padding:"10px"


  }

  if(!message)return null;

  return (
    <div style={notiStyle}>
      {message}
    </div>
  )
}

export default Notification;