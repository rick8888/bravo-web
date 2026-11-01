import { Button } from 'components/button'
import { FeatureCards } from 'components/feature-cards'
import { Link } from 'components/link'
import { Layout } from 'layouts/default'
import dynamic from 'next/dynamic'
import s from './home.module.scss'

const WebGL = dynamic(
  () => import('components/webgl').then(({ WebGL }) => WebGL),
  { ssr: false }
)

export default function Home() {
  return (
    <Layout
      minimal
      theme="light"
      seo={{
        title: 'Bravo Group — Des solutions pour vos activités',
        description:
          'Découvrez les activités de Bravo Group : gestion des ressources humaines, gestion des stocks et de la logistique, et mise en relation de services avec Uduma.',
      }}
      className={s.home}
    >
      <div className={s.heroShell}>
        <header className={s.header}>
          <Link className={s.brand} href="/" aria-label="Bravo Group, accueil">
            <span className={s.brandMark}>B</span>
            <span className={s.brandName}>
              BRAVO
              <br />
              GROUP
            </span>
          </Link>
          <a className={s.headerLink} href="#activites">
            Nos activités <span aria-hidden="true">↘</span>
          </a>
        </header>

        <section className={s.hero} aria-labelledby="hero-title">
          <div className={s.heroBackground} aria-hidden="true">
            <WebGL staticModel />
          </div>
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>
              <span className={s.statusDot} />
              Un groupe, trois expertises
            </p>
            <h1 id="hero-title">
              Des solutions concrètes pour <span>faire avancer</span> vos
              activités.
            </h1>
            <p className={s.intro}>
              Bravo Group développe des services utiles aux organisations et
              aux personnes, de la gestion quotidienne à la mise en relation.
            </p>
            <Button className={s.heroCta} href="#activites" arrow>
              Découvrir nos activités
            </Button>
          </div>
          <a className={s.scrollLink} href="#activites">
            <span>Explorer le groupe</span>
            <span aria-hidden="true">↓</span>
          </a>
        </section>
      </div>

      <section
        className={s.activities}
        id="activites"
        aria-labelledby="activities-title"
      >
        <div className={s.sectionHeading}>
          <div>
            <p className={s.sectionEyebrow}>Le groupe</p>
            <h2 id="activities-title">Trois activités. Un même élan.</h2>
          </div>
          <p className={s.sectionIntro}>
            Des expertises complémentaires, chacune dédiée à un besoin
            essentiel.
          </p>
        </div>
        <FeatureCards />
      </section>

      <footer className={s.footer}>
        <Link
          className={s.footerBrand}
          href="/"
          aria-label="Bravo Group, accueil"
        >
          BRAVO GROUP
        </Link>
        <p>Des activités au service de vos ambitions.</p>
        <span>© {new Date().getFullYear()} Bravo Group</span>
      </footer>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'home',
    },
  }
}
