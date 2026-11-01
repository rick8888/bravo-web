import { Button } from 'components/button'
import s from './feature-cards.module.scss'

const activities = [
  {
    name: 'Gestion des équipes',
    title: 'RH',
    description:
      'Simplifiez la gestion de vos équipes, des dossiers du personnel au suivi des ressources humaines.',
    href: 'https://rh.bravo-group.com',
  },
  {
    name: 'Stock & logistique',
    title: 'Stock',
    description:
      'Pilotez vos stocks et votre logistique avec une meilleure visibilité sur les opérations.',
    href: 'https://stock.bravo-groupe.com',
  },
  {
    name: 'Services connectés',
    title: 'Uduma Service Connect',
    description:
      'Mettez en relation les demandeurs et les porteurs de services, simplement.',
    href: 'https://uduma.bravo-groupe.com',
  },
]

export const FeatureCards = () => {
  return (
    <div className={s.features}>
      <div className={s.cards}>
        {activities.map(({ name, title, description, href }, index) => (
          <article className={s.card} key={title}>
            <div className={s.cardTop}>
              <span className={s.number}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={s.name}>{name}</span>
            </div>
            <div className={s.content}>
              <h3 className={s.cardTitle}>{title}</h3>
              <p className={s.description}>{description}</p>
              <Button href={href} arrow className={s.cta}>
                Accéder à la plateforme
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
