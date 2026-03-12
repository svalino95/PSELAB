import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Especialidades from './components/Especialidades/Especialidades'
import Productos from './components/Productos/Productos'
import DiferencialSection from './components/DiferencialSection/DiferencialSection'
import Proyectos from './components/Proyectos/Proyectos'
import Contacto from './components/Contacto/Contacto'
import Footer from './components/Footer/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Especialidades />
        <Productos />
        <DiferencialSection />
        <Proyectos />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
