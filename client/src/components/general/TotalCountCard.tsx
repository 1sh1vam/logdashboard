type Props = {
  text: string;
  value: string | number;
}

const TotalCountCard = ({ text, value }: Props) => {
  return (
    <div className="text-center bg-neutral-dark rounded-lg px-4 py-2">
        <p className="text-sm text-content-2">{text}</p>
        <p className="text-xl text-content-1">{value}</p>
    </div>
  )
}

export default TotalCountCard