import { onUpdateCurrentTag } from '@/app/actions/on-update-current-tag-action'

export default function UpdateCurrentTimeButton() {
  return (
    <form action={onUpdateCurrentTag} className="p-2">
      <button className="bg-blue-800 p-2 rounded-md cursor-pointer active:opacity-60 transition-opacity">Atualizar data atual</button>
    </form>
  )
}
