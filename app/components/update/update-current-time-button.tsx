'use client'

interface UpdateCurrentTimeButtonProps {
    onUpdate: () => void
}

export default function UpdateCurrentTimeButton({ onUpdate }: UpdateCurrentTimeButtonProps) {
    return (
        <div className="p-2" >
            <button className="bg-blue-800 p-2 rounded-md cursor-pointer active:opacity-60 transition-opacity" type="button" onClick={onUpdate} >Atualizar data atual</button>
        </div>
    )
}