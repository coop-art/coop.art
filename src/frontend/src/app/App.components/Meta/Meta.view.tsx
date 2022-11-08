import { Helmet } from 'react-helmet'

type MetaProps = {
  title?: string
  description?: string
}

export const Meta = ({ title, description }: MetaProps) => {
  const safeTitle = title
  const safeDescription = description

  return (
    <div />
    // <Helmet>
    //   <title>{safeTitle}</title>
    //   <meta name="title" content={safeTitle} />
    //   <meta property="og:title" content={safeTitle} />
    //   <meta name="description" content={safeDescription} />
    //   <meta property="og:description" content={safeDescription} />
    // </Helmet>
  )
}
