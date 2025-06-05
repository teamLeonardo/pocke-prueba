import { Helmet } from 'react-helmet-async';

interface PageMetadataProps {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const PageMetadata = ({
  title,
  description = 'Tu Pokédex personal - Captura y gestiona tus Pokémon favoritos',
  keywords = ['pokemon', 'pokedex', 'pokemon go', 'juego', 'entrenador'],
  image = '/pokeball.png',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website'
}: PageMetadataProps) => {
  const fullTitle = `${title} | Pokédex`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Pokédex" />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@pokedex" />
      <meta name="twitter:creator" content="@pokedex" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Pokédex" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default PageMetadata; 