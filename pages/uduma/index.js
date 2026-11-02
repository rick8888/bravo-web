import { Layout } from 'layouts/default'
import Link from 'next/link'
import s from './uduma.module.scss'

const downloads = [
  {
    id: 'apk',
    label: 'Télécharger l’application Android (APK)',
    href: 'https://uduma-api.bravo-groupe.com/download/apk',
    description: 'Téléchargement pour Android',
  },
  {
    id: 'ipa',
    label: 'Télécharger l’application iOS (IPA)',
    href: 'https://uduma-api.bravo-groupe.com/download/ipa',
    description: 'Téléchargement pour iOS',
  },
]

export default function Uduma() {
  return (
    <Layout
      minimal
      theme="light"
      seo={{
        title: 'Uduma — La mise en relation de services',
        description:
          'Uduma met en relation les personnes qui recherchent un service et celles qui le proposent.',
      }}
      className={s.page}
    >
      <header className={s.header}>
        <Link className={s.brand} href="/" aria-label="Bravo Group, accueil">
          <span className={s.brandMark} aria-hidden="true">
            U
          </span>
          <span>UDUMA</span>
        </Link>
        <Link className={s.backLink} href="/">
          Bravo Group <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <div>
        <section className={s.hero} aria-labelledby="uduma-title">
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>
              <span className={s.statusDot} aria-hidden="true" />
              Un service de Bravo Group
            </p>
            <h1 id="uduma-title">
              Le bon service,
              <br />
              <span>la bonne rencontre.</span>
            </h1>
            <p className={s.intro}>
              Uduma met en relation les personnes qui recherchent un service
              et celles qui le proposent.
            </p>
            <a className={s.heroLink} href="#telechargements">
              Découvrir l’application <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className={s.visual} aria-label="Illustration de mise en relation">
            <div className={s.visualOrb} aria-hidden="true" />
            <div className={s.visualLabel}>Uduma</div>
            <div className={`${s.personCard} ${s.requester}`}>
              <span className={s.personIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20v-1.5a7 7 0 0 1 14 0V20H5Z" />
                </svg>
              </span>
              <span className={s.personText}>
                <strong>Demandeur</strong>
                <small>Recherche un service</small>
              </span>
            </div>
            <div className={s.connection} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={`${s.personCard} ${s.provider}`}>
              <span className={s.personIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              </span>
              <span className={s.personText}>
                <strong>Porteur de service</strong>
                <small>Propose un service</small>
              </span>
            </div>
            <p className={s.visualCaption}>
              Une mise en relation entre deux besoins.
            </p>
          </div>
        </section>

        <section className={s.purpose} aria-labelledby="purpose-title">
          <div className={s.sectionHeading}>
            <p className={s.sectionEyebrow}>Le principe</p>
            <h2 id="purpose-title">Deux profils. Une mise en relation.</h2>
            <p>
              Uduma connecte les demandeurs de services avec les personnes qui
              les proposent.
            </p>
          </div>
          <div className={s.audienceGrid}>
            <article className={s.audienceCard}>
              <span className={s.audienceNumber}>01</span>
              <h3>Vous recherchez un service ?</h3>
              <p>
                Uduma s’adresse aux personnes qui souhaitent entrer en contact
                avec un porteur de service.
              </p>
            </article>
            <article className={s.audienceCard}>
              <span className={s.audienceNumber}>02</span>
              <h3>Vous proposez un service ?</h3>
              <p>
                Uduma met également en relation les porteurs de service avec
                les personnes qui en font la demande.
              </p>
            </article>
          </div>
        </section>

        <section
          className={s.downloads}
          id="telechargements"
          aria-labelledby="downloads-title"
        >
          <div className={s.downloadCopy}>
            <p className={s.sectionEyebrow}>Uduma sur mobile</p>
            <h2 id="downloads-title">Emportez Uduma avec vous.</h2>
            <p>
              Choisissez votre plateforme pour accéder au téléchargement de
              l’application.
            </p>
          </div>
          <div className={s.downloadActions}>
            {downloads.map((download) => (
              <a
                className={s.downloadButton}
                href={download.href}
                key={download.id}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className={s.downloadIcon} aria-hidden="true">
                  {download.id === 'apk' ? (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M5 16V6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5V16" />
                      <path d="M3 16h18l-1.5 4h-15L3 16Zm9-9v7m-3-3 3 3 3-3" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 3.5v17m-4-3 4 3 4-3M5 7.5h14M7 4.5h10" />
                    </svg>
                  )}
                </span>
                <span className={s.downloadText}>
                  <strong>{download.label}</strong>
                  <small>{download.description}</small>
                </span>
                <span className={s.downloadArrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <footer className={s.footer}>
        <Link className={s.footerBrand} href="/">
          BRAVO GROUP
        </Link>
        <p>Uduma — mise en relation de services.</p>
        <Link className={s.footerLink} href="/">
          Retour à Bravo Group <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </Layout>
  )
}
