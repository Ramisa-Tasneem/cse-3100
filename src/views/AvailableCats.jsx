import { useEffect, useState } from 'react';

const availableCats = [
  { name: 'Whiskers', age: '2', breed: 'Persian' },
  { name: 'Mittens', age: '2', breed: 'Siamese' },
  { name: 'Shadow', age: '1', breed: 'Bengal' },
  { name: 'Pumpkin', age: '3', breed: 'Sphynx' },
  { name: 'Luna', age: '4', breed: 'Birman' },
  { name: 'Simba', age: '2', breed: 'Abyssinian' },
  { name: 'Neon', age: '6', breed: 'Peterbald' },
];

export default function AvailableCats() {
  const [cats, setCats] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');

  // Fetch cat images from the API and combine with cat data
  useEffect(() => {
    const fetchCatImages = async () => {
      try {
        const responses = await Promise.all(
          availableCats.map(() => 
            fetch('https://api.thecatapi.com/v1/images/search')
              .then((res) => res.json())
          )
        );
        const catsWithImages = availableCats.map((cat, index) => ({
          ...cat,
          image: responses[index][0].url,
        }));

        setCats(catsWithImages);
      } catch (error) {
        console.error('Error fetching cat images:', error);
      }
    };

    fetchCatImages();
  }, []);

  const breeds = ['All', 'Sphynx', 'Peterbald', 'Birman', 'Abyssinian', 'Persian', 'Bengal', 'Siamese'];
  
  // Filter cats based on name search and breed selection
  const filteredCats = cats.filter(cat => {
    const nameMatch = cat.name.toLowerCase().includes(searchName.toLowerCase());
    const breedMatch = selectedBreed === 'All' || selectedBreed === '' || cat.breed === selectedBreed;
    return nameMatch && breedMatch;
  });

  return (
    <section className="text-center mt-4">
      <h2>Available Cats</h2>
      <p>Meet our adorable cats looking for their forever home!</p>

      <div className="filters mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <select
          className="form-select"
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
        >
          <option value="">Select Breed</option>
          {breeds.map(breed => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
      </div>

      <div className="mt-2 row g-4 cats-container" id="cats-container">
        {filteredCats.map((cat, i) => (
          <div key={i} className="col-md-4">
            <div className="cat-card">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="img-fluid mb-2" 
                style={{ borderRadius: '8px', height: '200px', objectFit: 'cover' }} 
              />
              <div className="cat-info">
                <h3 className="h5 mb-1">{cat.name}</h3>
                <p className="mb-0">Age: {cat.age}</p>
                <p className="mb-0">Breed: {cat.breed}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
