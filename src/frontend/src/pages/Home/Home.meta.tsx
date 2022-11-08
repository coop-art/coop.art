import * as PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

type HomeMetaProps = {
  meta?: string
}

export const HomeMeta = ({ meta }: HomeMetaProps) => {
  const title = `CoopArt`
  const description = `Welcome to CoopArt`

  return (
    <div />
    // <Helmet>
    //   <title>{title}</title>
    //   <meta name="title" content={title} />
    //   <meta property="og:title" content={title} />
    //   <meta name="description" content={description} />
    //   <meta property="og:description" content={description} />
    // </Helmet>
  )
}

HomeMeta.propTypes = {
  meta: PropTypes.string,
}

HomeMeta.defaultProps = {
  meta: '',
}
