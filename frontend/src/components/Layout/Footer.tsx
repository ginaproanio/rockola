import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Rockola. Todos los derechos
        reservados.
      </p>
    </footer>
  )
}

export default Footer
