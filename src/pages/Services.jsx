import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import SEO from '../components/Common/SEO';
import Loading from '../components/Common/Loading';
import Pagination from '../components/Common/Pagination';
import { Search, ListFilter as Filter, X } from 'lucide-react';
import { productsAPI, categoriesAPI, getImageUrl } from '../utils/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const fetchSubcategories = useCallback(async (categoryId) => {
    try {
      const response = await categoriesAPI.getSubcategories(categoryId);
      setSubcategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubcategories([]);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productsAPI.getAll(
        currentPage, 
        10, 
        searchTerm, 
        selectedCategory, 
        selectedSubcategory
      );
      setServices(response.data.data || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory, selectedSubcategory]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory);
    } else {
      setSubcategories([]);
      setSelectedSubcategory('');
    }
  }, [selectedCategory, fetchSubcategories]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory('');
    setCurrentPage(1);
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSearchInput('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setCurrentPage(1);
  };

  if (loading && currentPage === 1) {
    return <Loading />;
  }

  return (
    <>
      <SEO 
        title="Produk Material Konstruksi - Aspal, Resin & Lainnya"
        description="Katalog lengkap produk material konstruksi PT. Hopol Sinar Jaya: aspal cair emulsion, aspal bakar, membran SBS, resin, katalis, serat fiber dengan kualitas terjamin."
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Produk Material Konstruksi
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Katalog lengkap produk material konstruksi berkualitas: aspal cair emulsion, 
              aspal bakar, membran SBS, resin, katalis, dan serat fiber untuk kebutuhan proyek Anda.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" data-aos="fade-up">
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari layanan..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Cari
                </button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedSubcategory}
                  onChange={(e) => handleSubcategoryChange(e.target.value)}
                  disabled={!selectedCategory}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Semua Subkategori</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>

                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {services.length} layanan ditemukan
                  </span>
                </div>

                {(searchTerm || selectedCategory || selectedSubcategory) && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Hapus Filter</span>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Services Grid */}
          {loading ? (
            <Loading />
          ) : services.length === 0 ? (
            <div className="text-center py-12" data-aos="fade-up">
              <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tidak ada layanan ditemukan
              </h3>
              <p className="text-gray-600 mb-4">
                Coba ubah kata kunci pencarian atau filter yang digunakan.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    data-aos="fade-up"
                  >
                    <div className="relative h-48 bg-gray-200">
                      {service.image ? (
                        <img
                          src={getImageUrl(service.image)}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <div className="text-center">
                            <div className="bg-gray-200 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                              <span className="text-2xl">🚧</span>
                            </div>
                            <p className="text-gray-500">Gambar tidak tersedia</p>
                          </div>
                        </div>
                      )}
                      {service.featured && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Unggulan
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: service.description }}>
                      </p>
                      
                      {/* <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-red-600">
                          {service.price ? `Rp ${service.price.toLocaleString('id-ID')}` : 'Hubungi Kami'}
                        </span>
                      </div> */}
                      
                      <Link
                        to={`/services/${service.slug}`}
                        className="block w-full text-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center" data-aos="fade-up">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Services;
