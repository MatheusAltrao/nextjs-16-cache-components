
interface CardCurrentTimeProps {
    title: string
    value: string
}

export default function CardCurrentTime({ title, value }: CardCurrentTimeProps) {
    return (
        <div className="bg-zinc-900 rounded-md p-2" >
            <h2>{title}</h2>
            {value}
        </div>
    );
}