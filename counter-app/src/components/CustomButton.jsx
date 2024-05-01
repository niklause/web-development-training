
const CustomButton = ({onClick,count}) => {
  return (
    <button onClick={onClick} style={{background:'red'}}>counter is {count}</button>
  )
}

export default CustomButton