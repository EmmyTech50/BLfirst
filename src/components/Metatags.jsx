import { Helmet } from "react-helmet"

const Metatags = ( { 
    title,
    desc,
    keywords,
    ogTitle,
    ogDesc,
    ogImage,
    twitterTitle,
    twitterDesc,
    twitterImage

}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:title" content={twitterTitle} />
        <meta name="twitter:description" content={twitterDesc} />
        <meta name="twitter:image" content={twitterImage}/>
    </Helmet>
  )
}

export default Metatags