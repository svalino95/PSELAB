import Navbar from '../src/components/Navbar/Navbar'
import Hero from '../src/components/Hero/Hero'
import Especialidades from '../src/components/Especialidades/Especialidades'
import Productos from '../src/components/Productos/Productos'
import DiferencialSection from '../src/components/DiferencialSection/DiferencialSection'
import Proyectos from '../src/components/Proyectos/Proyectos'
import Contacto from '../src/components/Contacto/Contacto'
import Footer from '../src/components/Footer/Footer'

export default function Page() {
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
