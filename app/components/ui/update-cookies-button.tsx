import { onUpdateCookies } from '@/app/actions/on-update-cookies-action'

export default function UpdateCookies() {
  return (
    <form action={onUpdateCookies} className="p-2">
      <button className="bg-blue-800 p-2 rounded-md cursor-pointer active:opacity-60 transition-opacity">Atualizar Cookies</button>
    </form>
  )
}
