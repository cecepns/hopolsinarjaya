import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Penyedia Jasa WiFi", 
  description = "Layanan internet dan WiFi dengan koneksi stabil untuk rumah, kost, ruko, dan bisnis di kawasan BSB City, Ruko Jade Square Blk. A No.12B, Kota Semarang 50212.",
  keywords = "penyedia jasa wifi, internet rumahan, wifi bisnis, wifi bsb city, internet semarang, paket internet",
  image = "/og-image.jpg",
  url = window.location.href
}) => {
  const siteTitle = "Penyedia Jasa WiFi";
  const fullTitle = title === siteTitle ? title : `${title} - ${siteTitle}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Indonesian" />
      <meta name="author" content="Penyedia Jasa WiFi" />
    </Helmet>
  );
};

export default SEO;