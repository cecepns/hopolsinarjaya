import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import SEO from "../components/Common/SEO";
import {
  ArrowRight,
  CircleCheck as CheckCircle,
  Users,
  Award,
  Zap,
} from "lucide-react";
import { bannersAPI, productsAPI, settingsAPI, getImageUrl } from "../utils/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFlip } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import AboutImage from "../assets/about.jpg";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    AOS.init({ duration: 1000 });

    let isMounted = true;

    const fetchData = async () => {
      try {
        const [bannersRes, servicesRes, productsRes, settingsRes] = await Promise.all([
          bannersAPI.getAll(),
          productsAPI.getAll(1, 6, '', 3),
          productsAPI.getAll(1, 4, '', 4),
          settingsAPI.get(),
        ]);

        if (isMounted) {
          setBanners(bannersRes.data.data || []);
          setFeaturedServices(servicesRes.data.data || []);
          setFeaturedProducts(productsRes.data.data || []);
          setSettings(settingsRes.data.data || {});
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    { icon: Users, label: "Proyek Selesai", value: "500+" },
    { icon: Award, label: "Tahun Pengalaman", value: "3+" },
    { icon: Zap, label: "Tim Profesional", value: "50+" },
    { icon: CheckCircle, label: "Kepuasan Klien", value: "98%" },
  ];

  const homeAboutTitle =
    settings.home_about_title || "PT. Hopol Sinar Jaya";
  const homeAboutDescription =
    settings.home_about_description ||
    "Perusahaan penyedia jasa konstruksi dengan berpengalaman. Melayani pengaspalan jalan, pengecoran beton, perbaikan dak & talang dengan kualitas terjamin dan hasil yang efisien.";
  const homeAboutImage = settings.home_about_image;

  return (
    <>
      <SEO
        title="PT. Hopol Sinar Jaya - Jasa Pengaspalan & Pengecoran Beton"
        description="Jasa pengaspalan jalan, pengecoran beton, perbaikan dak & talang dengan berpengalaman. Kualitas terjamin, hasil efisien dan profesional."
      />

      {/* Hero Banner Section */}
      <section className="relative h-44 lg:h-[650px] overflow-hidden">
        {loading ? (
          <div className="w-full h-full bg-primary-600 flex items-center justify-center">
            <div className="text-white text-xl">Memuat banner...</div>
          </div>
        ) : banners && banners.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFlip]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            className="h-full w-full"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className="relative w-full h-full">
                  <img
                    src={
                      getImageUrl(banner.image) ||
                      "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg"
                    }
                    alt={banner.title || "Banner"}
                    className="w-full h-full object-contain"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div> */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                      <div className="max-w-4xl">
                        {!!banner.title && (
                          <h1
                            className="text-2xl lg:text-6xl font-bold mb-6 leading-tight text-white"
                            data-aos="fade-up"
                          >
                            {banner.title || "Solusi Industri"}{" "}
                            <span className="text-secondary-400">
                              {banner.subtitle || "Terpercaya"}
                            </span>
                          </h1>
                        )}
                        {banner.description && (
                          <p
                            className="text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed"
                            data-aos="fade-up"
                            data-aos-delay="200"
                          >
                            {banner.description}
                          </p>
                        )}
                        {banner.link && (
                          <div
                            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                            data-aos="fade-up"
                            data-aos-delay="400"
                          >
                            <Link
                              to={banner.link}
                              className="btn-secondary inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg"
                            >
                              <span>{banner.buttonText || "Lihat Layanan"}</span>
                              <ArrowRight size={20} />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="relative bg-gradient-to-r from-primary-500 to-secondary-400 text-white overflow-hidden h-full">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative container mx-auto px-4 h-full flex items-center">
              <div className="max-w-4xl">
                <h1
                  className="text-2xl lg:text-6xl font-bold mb-6 leading-tight"
                  data-aos="fade-up"
                >
                  Jasa Pengaspalan{" "}
                  <span className="text-yellow-400">Profesional</span>
                </h1>
                <p
                  className="text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Perusahaan penyedia jasa konstruksi dengan berpengalaman. Melayani pengaspalan jalan, pengecoran beton, dan perbaikan konstruksi dengan kualitas terjamin.
                </p>
                <div
                  className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <Link
                    to="/services"
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg rounded-lg transition-colors"
                  >
                    <span>Lihat Layanan Kami</span>
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-outline bg-transparent border-white text-white hover:bg-white hover:text-primary-900 inline-flex items-center justify-center px-8 py-4 text-lg"
                  >
                    Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <stat.icon size={32} />
                </div>
                <div className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-6">
              Produk Unggulan
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Temukan berbagai produk berkualitas tinggi seperti aspal cair emulsion, aspal bakar, membran aspal SBS, resin, katalis, dan serat fiber untuk kebutuhan konstruksi Anda.
            </p>
          </div>

          {!loading && featuredProducts.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(product.image) || "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg"}
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description?.replace(/<[^>]*>/g, "").slice(0, 80)}...
                    </p>
                    {/* <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-red-600">
                        {product.price ? `Rp ${product.price.toLocaleString('id-ID')}` : 'Hubungi Kami'}
                      </span>
                    </div> */}
                    <Link
                      to={`/services/${product.slug}`}
                      className="text-sm text-red-600 hover:text-red-700 font-medium inline-flex items-center space-x-1 group"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12" data-aos="fade-up">
            <Link
              to="/services"
              className="bg-red-600 hover:bg-red-700 text-white inline-flex items-center space-x-2 px-8 py-4 text-lg rounded-lg transition-colors"
            >
              <span>Lihat Semua Produk</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-white py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Layanan <span className="text-red-600">Unggulan</span>
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Temukan berbagai layanan pengaspal berkualitas tinggi yang telah dipercaya
              oleh ratusan klien di seluruh Indonesia.
            </p>
          </div>

          {!loading && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {featuredServices.map((service, index) => (
                <div
                  key={service.id}
                  className="card hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="relative overflow-hidden">
                    <img
                    src={
                      getImageUrl(service.image) ||
                      "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg"
                    }
                      alt={service.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="md:text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-base text-gray-600 mb-4 line-clamp-3">
                      {service.description
                        ?.replace(/<[^>]*>/g, "")
                        .slice(0, 120)}
                      ...
                    </p>
                    <Link
                      to={`/services/${service.slug}`}
                      className="text-xs md:text-base text-red-600 hover:text-red-700 font-medium inline-flex items-center space-x-2 group"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12" data-aos="fade-up">
            <Link
              to="/services"
              className="bg-red-600 hover:bg-red-700 text-white inline-flex items-center space-x-2 px-8 py-4 text-lg rounded-lg transition-colors"
            >
              <span>Lihat Semua Layanan</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-6">
                {homeAboutTitle.split(" ").slice(0, -1).join(" ") || homeAboutTitle}{" "}
                <span className="text-red-600">
                  {homeAboutTitle.split(" ").slice(-1)[0] || ""}
                </span>
              </h2>
              <div className="space-y-4 mb-6">
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {homeAboutDescription}
                </p>
              </div>
              <Link
                to="/about"
                className="bg-red-600 hover:bg-red-700 text-white inline-flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors"
              >
                <span>Selengkapnya</span>
                <ArrowRight size={18} />
              </Link>
            </div>
            <div data-aos="fade-left">
              <div className="w-full h-96 md:h-[600px]">
                <img
                  src={getImageUrl(homeAboutImage) || AboutImage}
                  alt="Tentang PT. Hopol Sinar Jaya"
                  className="w-full h-full object-cover rounded-2xl shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divisions Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Our <span className="text-primary-600">Divisions</span>
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Kami melayani berbagai kebutuhan industri melalui divisi-divisi
              terpercaya kami.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="card hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <Zap size={32} />
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-4">
                  Divisi Belden
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  PT Denko Wahana Sakti merupakan Distributor berbagai jenis
                  kabel dengan brand &quot;Belden&quot; yang merupakan brand
                  terkemuka di pasar kabel saat ini.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Kami menjual Kabel UTP Belden, rs485, rj45 dan rs232 Belden,
                  Coaxial rg8 dan rg11, fiber optic belden, Patch Cord, Patch
                  Panel, modular cat6 dan Face Plate dengan kantor di Jakarta,
                  Surabaya dan Semarang.
                </p>
              </div>
            </div>

            <div
              className="card hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 text-secondary-600 rounded-full mb-4">
                  <Award size={32} />
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-4">
                  Divisi Jasa Konstruksi
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kami juga menyediakan berbagai layanan konstruksi seperti
                  pengaspalan jalan, pengecoran beton, perbaikan dak & talang,
                  konstruksi gedung, dan berbagai solusi infrastruktur lainnya
                  dengan kualitas terjamin dan harga kompetitif.
                </p>
              </div>
            </div>
            
            <div
              className="card hover:shadow-xl transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Users size={32} />
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-4">
                  Divisi Dalton Tools
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Kami adalah distributor hand tool, Ladder, jack equipment,
                  dust bin, mesin las igbt, genset tiger, kunci pas, welding
                  machine, tang, mesin las inverter, kunci ring, mesin las,
                  dongkrak botol, water pump, generator, genset, tong sampah,
                  dongkrak buaya dan tangga.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-2xl lg:text-4xl font-bold mb-6"
            data-aos="fade-up"
          >
            Butuh Material Konstruksi Berkualitas?
          </h2>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto text-primary-100"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Temukan berbagai produk konstruksi berkualitas seperti aspal, resin, dan material lainnya. Konsultasikan kebutuhan material proyek Anda dengan tim kami.
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Link
              to="/contact"
              className="btn-secondary bg-secondary-600 hover:bg-secondary-700 inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg"
            >
              <span>Hubungi Kami</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/services"
              className="bg-transparent border-white text-white hover:bg-white hover:text-red-600 inline-flex items-center justify-center px-8 py-4 text-lg rounded-lg transition-colors"
            >
              Lihat Layanan Kami
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
