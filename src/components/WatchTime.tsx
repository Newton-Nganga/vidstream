
type Props ={
    runtime:number
}
export default function WatchTime({ runtime }: Props) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const time = `${hours}H ${minutes}Min`;
  return <span>{time}</span>;
}
